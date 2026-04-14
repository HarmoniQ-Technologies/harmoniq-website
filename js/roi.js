/* ============================================================
   HarmoniQ Technologies — Savings Calculator (v3)
   Based on ISO 50015 field data from 4,250+ deployed units

   Savings model — 5 mechanisms:
   1. I²R loss reduction from power factor correction
   2. I²R + eddy current loss reduction from harmonic elimination
   3. Line conditioning: impedance matching, phase balancing,
      circulating current elimination (HarmoniQ 600)
   4. PF penalty elimination (where utility charges apply)
   5. Demand charge reduction (lower peak kVA)

   Philosophy: slightly conservative — underpromise, over-deliver.
   Field results typically 10-25%; this model targets 8-20%.
   ============================================================ */

// Average industrial electricity rates by country (USD/kWh, 2025)
const RATES = {
  // Europe
  'Germany': 0.17, 'France': 0.11, 'UK': 0.13, 'Italy': 0.18, 'Spain': 0.12,
  'Netherlands': 0.13, 'Belgium': 0.12, 'Poland': 0.11, 'Sweden': 0.07,
  'Norway': 0.05, 'Denmark': 0.10, 'Finland': 0.08, 'Austria': 0.11,
  'Switzerland': 0.12, 'Ireland': 0.20, 'Portugal': 0.11, 'Greece': 0.12,
  'Czech Republic': 0.12, 'Romania': 0.09, 'Hungary': 0.10, 'Turkey': 0.08,
  // Middle East & Africa
  'UAE': 0.065, 'Saudi Arabia': 0.048, 'Qatar': 0.030, 'Kuwait': 0.020,
  'Bahrain': 0.035, 'Oman': 0.045, 'Israel': 0.10, 'Egypt': 0.035,
  'South Africa': 0.07, 'Nigeria': 0.09, 'Kenya': 0.11, 'Morocco': 0.10,
  // Americas
  'USA': 0.08, 'Canada': 0.07, 'Mexico': 0.09, 'Brazil': 0.10,
  'Colombia': 0.08, 'Chile': 0.09, 'Argentina': 0.06,
  // Asia-Pacific
  'Australia': 0.12, 'New Zealand': 0.11, 'Japan': 0.14, 'South Korea': 0.12,
  'China': 0.08, 'India': 0.08, 'Singapore': 0.12, 'Malaysia': 0.06,
  'Thailand': 0.08, 'Vietnam': 0.07, 'Philippines': 0.10, 'Indonesia': 0.07,
  // Fallback
  'Other': 0.10,
};

// Typical PF by industry — represents a realistic HarmoniQ prospect
// Based on Eaton PFC Guide, Controllix industry tables, and IEEE field survey data
// These represent facilities with known power quality issues (not best-in-class)
// Reference: IEEE 1459-2010, NEMA MG 1-2016, Eaton SA02607001E
const INDUSTRY_PF = {
  'manufacturing':  0.76,   // Eaton: metalworking 0.65-0.70, general 0.70-0.85
  'food_beverage':  0.80,   // Eaton: brewery 0.75-0.80
  'cold_storage':   0.78,   // Compressor-heavy, older reciprocating: 0.72-0.80
  'commercial':     0.81,   // Eaton: office 0.80-0.90
  'healthcare':     0.78,   // Eaton: hospital 0.75-0.80
  'hotels':         0.82,   // Field data: 0.78-0.88 range
  'mining':         0.73,   // Eaton: coal mine 0.65-0.80
  'oil_gas':        0.76,   // Eaton: refinery 0.78-0.85, pumping 0.40-0.60
  'data_centres':   0.90,   // Modern PSUs have PFC; UPS degrades overall
  'steel':          0.76,   // Eaton: steel works 0.65-0.80 (AC loads: stamping/rolling)
  'pharma':         0.82,   // Clean room HVAC heavy, similar to chemical
  'water':          0.79,   // Pump-dominated, distributed stations
  'airports':       0.78,   // 400Hz GPU + large HVAC + baggage handling
  'ports':          0.77,   // Crane VFDs, shore power, reefer connections
  'logistics':      0.84,   // Conveyor VFDs + forklift chargers
  'universities':   0.84,   // Mixed campus: labs, HVAC, dining
  'other':          0.80,
};

// Typical THD-I by industry (%)
// Reference: IEEE 519-2022, Fluke field surveys, Eaton harmonics data
// Midpoint of documented ranges for each sector
const INDUSTRY_THD = {
  'manufacturing':  20,   // VFDs + welding: 15-30%
  'food_beverage':  15,   // Compressor VFDs, mixers: 10-20%
  'cold_storage':   18,   // VFD compressors: 12-25%
  'commercial':     14,   // HVAC VFDs, LED, SMPS: 10-20%
  'healthcare':     18,   // MRI/CT, UPS, medical electronics: 15-25%
  'hotels':         14,   // HVAC VFDs, kitchen, elevators: 10-18%
  'mining':         22,   // Large VFDs, thyristor drives: 15-30%
  'oil_gas':        18,   // Pump/compressor VFDs, rectifiers: 12-25%
  'data_centres':   18,   // Legacy UPS 25-30%, modern 2-5%, blended
  'steel':          22,   // Rolling mill drives, induction furnaces (AC loads): 20-35%
  'pharma':         14,   // HVAC VFDs, UPS, clean room FFUs: 10-20%
  'water':          15,   // Pump VFDs, blowers, UV systems: 10-20%
  'airports':       16,   // 400Hz GPU, HVAC VFDs, baggage: 12-22%
  'ports':          24,   // Crane regenerative drives: 18-35%
  'logistics':      14,   // Conveyor VFDs, charger rectifiers: 10-20%
  'universities':   13,   // Lab equipment, HVAC, computing: 10-18%
  'other':          15,
};

// System electrical loss fraction by industry
// Total I²R losses across all copper in the facility: motor stator/rotor windings,
// transformer copper losses, distribution conductors, skin & proximity effects
// Reference: IEEE C57.110-2018 (transformer losses), IEC 60034-2-1 (motor losses),
// NEMA MG 1-2016 §12.58 (motor efficiency), IEEE 519-2022 (harmonic loss effects)
// Conservative end of real-world range (actual losses often higher)
const INDUSTRY_LOSS_FRACTION = {
  'manufacturing':  0.065,  // DOE: motor 60-90% of load, 5-8% system losses
  'food_beverage':  0.055,  // Moderate motor loads, refrigeration cycling
  'cold_storage':   0.065,  // High compressor current, longer cable runs
  'commercial':     0.040,  // EPRI: 3-5%, shorter runs, less motor loading
  'healthcare':     0.055,  // Complex distribution, isolation transformers, UPS
  'hotels':         0.045,  // Distributed across floors, HVAC + laundry
  'mining':         0.090,  // Very long cable runs, 6-12% per DOE/IEEE
  'oil_gas':        0.070,  // Distributed sites, long feeders, many pumps
  'data_centres':   0.040,  // Short runs but UPS + PDU transformer losses
  'steel':          0.075,  // Heavy current, transformer derating from harmonics
  'pharma':         0.050,  // Modern distribution, multiple isolation transformers
  'water':          0.060,  // Distributed pump stations, long feeders
  'airports':       0.060,  // Large campus distribution, multiple substations
  'ports':          0.065,  // Long cable runs across port, crane transformers
  'logistics':      0.040,  // Large open floors, moderate runs
  'universities':   0.045,  // Distributed campus, mix old/new buildings
  'other':          0.055,
};

// Line conditioning savings potential by industry (% of total energy spend)
// Represents: impedance matching (20,000 samples/sec), circulating current elimination,
// phase current balancing, voltage stabilisation, and neutral current reduction
// via HarmoniQ 600 HarmoniQ Alpha units at individual load level
// Higher for motor-heavy industries with longer cable runs and more phase imbalance
// Conservative: field results typically 1-2% higher than these values
const INDUSTRY_LINE_CONDITIONING = {
  'manufacturing':  0.030,  // Phase imbalance from mixed loads, impedance matching
  'food_beverage':  0.025,  // Compressor impedance matching, mixed single/3-phase
  'cold_storage':   0.030,  // Compressor bank balancing, long warehouse runs
  'commercial':     0.020,  // More balanced loads, smaller motors
  'healthcare':     0.025,  // Phase balancing between wings/departments
  'hotels':         0.020,  // Distributed floor loads, elevator motors
  'mining':         0.038,  // Large single loads, very long runs amplify effect
  'oil_gas':        0.030,  // Remote pump stations, compressor matching
  'data_centres':   0.015,  // Well-engineered, less phase imbalance
  'steel':          0.032,  // Rolling mill motor matching, heavy phase loads
  'pharma':         0.025,  // AHU motor matching, clean room zone balancing
  'water':          0.028,  // Pump motor matching, distributed station balancing
  'airports':       0.025,  // Terminal wing balancing, baggage motor matching
  'ports':          0.032,  // Crane feed balancing, reefer bank balancing
  'logistics':      0.022,  // Conveyor zone balancing, charger bank balancing
  'universities':   0.022,  // Building-level matching across campus
  'other':          0.025,
};

// PF penalty by country (% of bill when PF < threshold)
const PF_PENALTY_RATES = {
  'Germany': 0.0, 'France': 0.04, 'UK': 0.02, 'Italy': 0.05, 'Spain': 0.05,
  'Netherlands': 0.02, 'Belgium': 0.03, 'Poland': 0.04, 'Sweden': 0.0,
  'Norway': 0.0, 'Denmark': 0.0, 'Finland': 0.0, 'Austria': 0.03,
  'Switzerland': 0.02, 'Ireland': 0.03, 'Portugal': 0.04, 'Greece': 0.05,
  'Czech Republic': 0.04, 'Romania': 0.04, 'Hungary': 0.04, 'Turkey': 0.05,
  'UAE': 0.05, 'Saudi Arabia': 0.06, 'Qatar': 0.05, 'Kuwait': 0.04,
  'Bahrain': 0.05, 'Oman': 0.05, 'Israel': 0.04, 'Egypt': 0.06,
  'South Africa': 0.05, 'Nigeria': 0.04, 'Kenya': 0.04, 'Morocco': 0.05,
  'USA': 0.03, 'Canada': 0.03, 'Mexico': 0.04, 'Brazil': 0.06,
  'Colombia': 0.04, 'Chile': 0.04, 'Argentina': 0.05,
  'Australia': 0.04, 'New Zealand': 0.03, 'Japan': 0.03, 'South Korea': 0.04,
  'China': 0.05, 'India': 0.06, 'Singapore': 0.03, 'Malaysia': 0.04,
  'Thailand': 0.04, 'Vietnam': 0.04, 'Philippines': 0.05, 'Indonesia': 0.05,
  'Other': 0.03,
};

// Grid emission factors by country (kg CO₂ per kWh)
// Reference: IEA Emission Factors 2023/2024
const CO2_FACTORS = {
  // Europe
  'Germany': 0.385, 'France': 0.056, 'UK': 0.210, 'Italy': 0.330, 'Spain': 0.160,
  'Netherlands': 0.340, 'Belgium': 0.165, 'Poland': 0.660, 'Sweden': 0.030,
  'Norway': 0.026, 'Denmark': 0.120, 'Finland': 0.085, 'Austria': 0.130,
  'Switzerland': 0.030, 'Ireland': 0.296, 'Portugal': 0.170, 'Greece': 0.350,
  'Czech Republic': 0.430, 'Romania': 0.280, 'Hungary': 0.230, 'Turkey': 0.440,
  // Middle East & Africa
  'UAE': 0.410, 'Saudi Arabia': 0.550, 'Qatar': 0.490, 'Kuwait': 0.580,
  'Bahrain': 0.500, 'Oman': 0.480, 'Israel': 0.460, 'Egypt': 0.450,
  'South Africa': 0.900, 'Nigeria': 0.380, 'Kenya': 0.120, 'Morocco': 0.610,
  // Americas
  'USA': 0.390, 'Canada': 0.130, 'Mexico': 0.420, 'Brazil': 0.075,
  'Colombia': 0.140, 'Chile': 0.330, 'Argentina': 0.310,
  // Asia-Pacific
  'Australia': 0.580, 'New Zealand': 0.100, 'Japan': 0.470, 'South Korea': 0.420,
  'China': 0.540, 'India': 0.710, 'Singapore': 0.400, 'Malaysia': 0.560,
  'Thailand': 0.470, 'Vietnam': 0.460, 'Philippines': 0.510, 'Indonesia': 0.630,
  // Fallback
  'Other': 0.400,
};

function getEffectivePF() {
  const pfVal = document.getElementById('roi-pf').value;
  if (pfVal === 'unknown') {
    const industry = document.getElementById('roi-industry').value;
    return INDUSTRY_PF[industry] || 0.85;
  }
  return parseFloat(pfVal);
}

function getEffectiveTHD() {
  const industry = document.getElementById('roi-industry').value;
  return INDUSTRY_THD[industry] || 15;
}

function getSystemLossFraction() {
  const industry = document.getElementById('roi-industry').value;
  return INDUSTRY_LOSS_FRACTION[industry] || 0.10;
}

function getLineConditioningSavings() {
  const industry = document.getElementById('roi-industry').value;
  return INDUSTRY_LINE_CONDITIONING[industry] || 0.025;
}

function calculate() {
  const inputMode    = document.getElementById('roi-input-mode').value;
  const country      = document.getElementById('roi-country').value;
  const industry     = document.getElementById('roi-industry').value;
  const rate         = RATES[country] || 0.10;
  const currentPF    = getEffectivePF();
  const targetPF     = 0.98;
  const thdI         = getEffectiveTHD();
  const lossFraction = getSystemLossFraction();
  const lineCondRate = getLineConditioningSavings();

  // Determine annual spend
  let annualSpend = 0;
  if (inputMode === 'annual') {
    annualSpend = parseFloat(document.getElementById('roi-spend').value) || 0;
  } else if (inputMode === 'monthly') {
    annualSpend = (parseFloat(document.getElementById('roi-monthly').value) || 0) * 12;
  } else if (inputMode === 'kw') {
    const kw = parseFloat(document.getElementById('roi-kw').value) || 0;
    annualSpend = kw * 8760 * 0.60 * rate;
  }

  if (annualSpend <= 0) {
    clearResults();
    return;
  }

  // Estimate facility kW from spend
  const estKW = annualSpend / (8760 * 0.60 * rate);

  // ── 1. Energy savings from I²R loss reduction (HarmoniQ Booster — PF correction) ──
  // Current ratio: I_new/I_old = PF_old/PF_new
  // Loss reduction = 1 - (PF_old/PF_new)²
  // Applied to system loss fraction (all copper losses in facility)
  const lossReductionPF = 1 - Math.pow(currentPF / targetPF, 2);
  const energySavingsPF = annualSpend * lossReductionPF * lossFraction;

  // ── 2. Energy savings from harmonic elimination (HarmoniQ Filter) ──
  // Reference: IEEE 519-2022 (Harmonic Control), IEEE C57.110-2018 (harmonic loss factors)
  // Harmonic RMS: I_total = I_fund × √(1 + THD²)
  // But harmonic losses are worse than basic I²R because:
  //   - Eddy current losses scale with h² per IEEE C57.110 (5th = 25×, 7th = 49×)
  //   - Skin effect increases conductor resistance at harmonic frequencies (+10-20%)
  //   - Negative-sequence harmonics (5th, 11th) cause ~6× rotor heating per IEC 60034
  // Effective multiplier ≈ 2.5× (conservative — actual h²-weighted is higher)
  const thdDecimal = thdI / 100;
  const harmonicLossFactor = Math.pow(thdDecimal, 2) * 2.5;
  const energySavingsHarmonic = annualSpend * harmonicLossFactor * lossFraction;

  // ── 3. Line conditioning savings (HarmoniQ 600 HarmoniQ Alpha) ──
  // Impedance matching at 20,000 samples/sec, phase current balancing,
  // circulating current elimination, neutral current reduction,
  // noise extraction pushing waste into 3rd harmonic for removal
  // This is a direct kW reduction at each load — not modelled by I²R alone
  // Conservative estimate based on industry type and motor density
  const energySavingsLineCond = annualSpend * lineCondRate;

  // ── 4. Total energy saving (all three hardware tiers) ──
  const totalEnergySaving = energySavingsPF + energySavingsHarmonic + energySavingsLineCond;

  // ── 5. PF penalty elimination ──
  let pfPenaltySaving = 0;
  const penaltyRate = PF_PENALTY_RATES[country] || 0.03;
  if (currentPF < 0.90) {
    const penaltyScale = Math.min(1, (0.90 - currentPF) / 0.20);
    pfPenaltySaving = annualSpend * penaltyRate * penaltyScale;
  }

  // ── 6. Demand charge reduction ──
  // Lower PF + harmonics + balanced phases → lower peak kVA → lower demand charges
  // Demand typically 20-30% of industrial bill
  const demandFractionOfBill = 0.22;
  const kvaReduction = 1 - (currentPF / targetPF);
  const demandSaving = annualSpend * demandFractionOfBill * kvaReduction;

  // ── TOTAL ENERGY $ SAVINGS (what we quote) ──
  const totalEnergySavings = totalEnergySaving + pfPenaltySaving + demandSaving;
  const totalSavingsRate = totalEnergySavings / annualSpend;

  // ── 7. Equipment life extension (Arrhenius) — shown separately ──
  // Reference: IEEE 117 (Thermal Evaluation), NEMA MG 1-2016 §12.58,
  // IEC 60085 (Thermal Classification), Arrhenius equation for insulation aging
  // Total current reduction from all three mechanisms
  const currentRatioAfterPF = currentPF / targetPF;
  const currentRatioAfterTHD = 1 / Math.sqrt(1 + Math.pow(thdDecimal, 2));
  // Line conditioning reduces current by an additional ~2-4% (conservative)
  const lineCondCurrentReduction = lineCondRate * 0.6;
  const totalCurrentReduction = 1 - (currentRatioAfterPF * currentRatioAfterTHD * (1 - lineCondCurrentReduction));

  // ΔT from I²R reduction applied to winding temperature rise
  const windingTempRise = 80; // °C above ambient for Class F motors
  const iRatio = 1 - totalCurrentReduction;
  const deltaT = (1 - Math.pow(iRatio, 2)) * windingTempRise * lossFraction / 0.10;
  const deltaTClamped = Math.min(Math.max(deltaT, 0), 15);

  // Arrhenius: life multiplier = 2^(ΔT/10)
  const lifeMultiplier = Math.pow(2, deltaTClamped / 10);
  const lifeExtensionPct = lifeMultiplier - 1;

  // Equipment value ≈ $800/kW, 20-year life → annual depreciation savings
  const estEquipValue = estKW * 800;
  const annualDepreciation = estEquipValue / 20;
  const equipLifeSaving = annualDepreciation * lifeExtensionPct;

  // ── 8. Carbon footprint reduction ──
  // Reference: IEA grid emission factors (2023/2024)
  // Only real energy savings (I²R + harmonic + line conditioning), not billing savings
  const co2Factor = CO2_FACTORS[country] || 0.400;
  const kwhSaved = totalEnergySaving / rate;
  const co2Tonnes = (kwhSaved * co2Factor) / 1000;
  const equivalentTrees = Math.round(co2Tonnes * 1000 / 22); // EPA: 1 mature tree ≈ 22 kg CO₂/yr
  const carbonCredits = co2Tonnes; // 1 carbon credit = 1 tonne CO₂e (Verra VCS / Gold Standard)

  // ── Format & display ──
  const fmtUSD = (v) => '$' + Math.round(v).toLocaleString();
  const fmtPct = (v) => (v * 100).toFixed(1) + '%';

  // Financial savings panel
  setResult('roi-result-savings-rate',    fmtPct(totalSavingsRate));
  setResult('roi-result-energy-saving',   fmtUSD(energySavingsPF + energySavingsHarmonic));
  setResult('roi-result-linecond-saving', fmtUSD(energySavingsLineCond));
  setResult('roi-result-pf-saving',       currentPF < 0.90 ? fmtUSD(pfPenaltySaving) : '—');
  setResult('roi-result-demand-saving',   fmtUSD(demandSaving));
  setResult('roi-result-total',           fmtUSD(totalEnergySavings));

  const headline = document.getElementById('roi-headline-value');
  if (headline) {
    headline.textContent = fmtUSD(totalEnergySavings);
    headline.style.animation = 'none';
    requestAnimationFrame(() => { headline.style.animation = ''; });
  }

  // Equipment life panel
  setResult('roi-result-delta-t',     '\u2212' + deltaTClamped.toFixed(1) + '\u00B0C');
  setResult('roi-result-life-ext',    lifeMultiplier.toFixed(1) + 'x');
  setResult('roi-result-extra-years', '+' + (20 * lifeExtensionPct).toFixed(1) + ' years');
  setResult('roi-result-equip-total', fmtUSD(estEquipValue));
  setResult('roi-result-equip-value', fmtUSD(equipLifeSaving) + '/yr');

  const headlineEquip = document.getElementById('roi-headline-equip');
  if (headlineEquip) {
    headlineEquip.textContent = lifeMultiplier.toFixed(1) + 'x longer life';
    headlineEquip.style.animation = 'none';
    requestAnimationFrame(() => { headlineEquip.style.animation = ''; });
  }

  // Carbon footprint panel
  setResult('roi-result-kwh-saved',       Math.round(kwhSaved).toLocaleString() + ' kWh');
  setResult('roi-result-emission-factor', co2Factor.toFixed(3) + ' kg/kWh');
  setResult('roi-result-co2',             co2Tonnes.toFixed(1) + ' tonnes');
  setResult('roi-result-credits',         carbonCredits.toFixed(1) + ' credits');
  setResult('roi-result-trees',           equivalentTrees.toLocaleString() + ' trees');

  const headlineCO2 = document.getElementById('roi-headline-co2');
  if (headlineCO2) {
    headlineCO2.textContent = co2Tonnes.toFixed(1) + ' t CO\u2082/yr';
    headlineCO2.style.animation = 'none';
    requestAnimationFrame(() => { headlineCO2.style.animation = ''; });
  }

  // Cross-reference summary values
  setResult('roi-xref-financial', fmtUSD(totalEnergySavings) + '/yr');
  setResult('roi-xref-equipment', lifeMultiplier.toFixed(1) + 'x life');
  setResult('roi-xref-carbon', co2Tonnes.toFixed(1) + ' t CO\u2082/yr');

  // Animate whichever panel is currently active
  document.querySelectorAll('.roi-panel').forEach(p => {
    if (p.style.display !== 'none') {
      p.style.animation = 'none';
      requestAnimationFrame(() => { p.style.animation = 'fadeUp 0.4s ease forwards'; });
    }
  });

}

function clearResults() {
  const ids = [
    'roi-result-savings-rate', 'roi-result-energy-saving', 'roi-result-linecond-saving',
    'roi-result-pf-saving', 'roi-result-demand-saving', 'roi-result-total', 'roi-headline-value',
    'roi-result-delta-t', 'roi-result-life-ext', 'roi-result-extra-years',
    'roi-result-equip-total', 'roi-result-equip-value', 'roi-headline-equip',
    'roi-result-kwh-saved', 'roi-result-emission-factor', 'roi-result-co2',
    'roi-result-credits', 'roi-result-trees', 'roi-headline-co2',
    'roi-xref-financial', 'roi-xref-equipment', 'roi-xref-carbon',
  ];
  ids.forEach(id => setResult(id, '—'));
}

function setResult(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function updateInputMode() {
  const mode = document.getElementById('roi-input-mode').value;
  document.getElementById('field-annual').style.display  = mode === 'annual'  ? '' : 'none';
  document.getElementById('field-monthly').style.display = mode === 'monthly' ? '' : 'none';
  document.getElementById('field-kw').style.display      = mode === 'kw'      ? '' : 'none';
  calculate();
}

function updatePFHint() {
  const pfVal = document.getElementById('roi-pf').value;
  const hint = document.getElementById('pf-industry-hint');
  if (hint) {
    if (pfVal === 'unknown') {
      const industry = document.getElementById('roi-industry').value;
      const estPF = INDUSTRY_PF[industry] || 0.85;
      hint.style.display = '';
      hint.textContent = 'Estimating your power factor as ' + estPF.toFixed(2) + ', typical for facilities in your selected industry.';
    } else {
      hint.style.display = 'none';
    }
  }
  calculate();
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = ['roi-spend', 'roi-monthly', 'roi-kw', 'roi-country', 'roi-pf', 'roi-industry', 'roi-input-mode'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    }
  });

  document.getElementById('roi-input-mode').addEventListener('change', updateInputMode);
  document.getElementById('roi-pf').addEventListener('change', updatePFHint);
  document.getElementById('roi-industry').addEventListener('change', updatePFHint);

  // Panel toggle
  function switchPanel(panelName) {
    document.querySelectorAll('.roi-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.panel === panelName);
    });
    document.querySelectorAll('.roi-panel').forEach(p => p.style.display = 'none');
    const target = document.getElementById('panel-' + panelName);
    if (target) {
      target.style.display = '';
      target.style.animation = 'none';
      requestAnimationFrame(() => { target.style.animation = 'fadeUp 0.4s ease forwards'; });
    }
    // Show cross-refs for the other two panels
    document.querySelectorAll('.roi-cross-ref').forEach(ref => {
      ref.style.display = ref.dataset.panel === panelName ? 'none' : '';
    });
  }

  document.querySelectorAll('.roi-pill').forEach(pill => {
    pill.addEventListener('click', () => switchPanel(pill.dataset.panel));
  });

  // Cross-reference click → switch to that panel
  document.querySelectorAll('.roi-cross-ref').forEach(ref => {
    ref.addEventListener('click', () => switchPanel(ref.dataset.panel));
  });

  // Scroll prompt: tap to scroll to results
  const scrollPrompt = document.getElementById('roiScrollPrompt');
  if (scrollPrompt) {
    scrollPrompt.addEventListener('click', () => {
      const results = document.querySelector('.roi-pill-toggle');
      if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      scrollPrompt.style.display = 'none';
    });
  }

  updateInputMode();
  updatePFHint();
  calculate();
});
