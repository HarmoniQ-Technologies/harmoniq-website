/* ============================================================
   HarmoniQ Technologies — Site Search (CMD+K)
   ============================================================ */

(function () {
  'use strict';

  // ── Search Index ─────────────────────────────────────────────
  // Each entry: { title, description, url, category, keywords }
  const SEARCH_INDEX = [
    // ── Pages ──────────────────────────────────────────────────
    {
      title: 'Home',
      description: 'Power optimization technology that pays for itself — 10-25% energy savings for industrial facilities.',
      url: 'index.html',
      category: 'Pages',
      keywords: 'home homepage main landing electricity waste savings power optimization patented hardware heat industrial energy'
    },
    {
      title: 'Product',
      description: 'The HarmoniQ Product Suite — three hardware devices and a real-time software platform.',
      url: 'how-it-works.html',
      category: 'Pages',
      keywords: 'product how it works technology hardware devices alpha booster filter software platform power quality reactive energy harmonics',
      boost: 8
    },
    {
      title: 'Industries',
      description: 'Power optimization for every sector — manufacturing, healthcare, mining, oil & gas, and 11 more.',
      url: 'industries.html',
      category: 'Pages',
      keywords: 'industries sectors all manufacturing healthcare mining oil gas cold storage hotels airports ports steel pharma universities logistics food beverage commercial real estate water utilities'
    },
    {
      title: 'Savings Calculator',
      description: 'Calculate your potential financial savings, equipment life extension, and carbon reduction.',
      url: 'savings-calculator.html',
      category: 'Pages',
      keywords: 'roi calculator savings return on investment monthly bill annual spend facility size industry power factor carbon co2 emissions equipment life extension financial price pricing cost how much',
      boost: 10
    },
    {
      title: 'About Us',
      description: 'Our story, leadership team, and principles — 4,250+ units deployed, 15+ countries.',
      url: 'about.html',
      category: 'Pages',
      keywords: 'about us company team leadership founders story mission oleg oscar edward principles 4250 units 15 countries'
    },
    {
      title: 'Insights & Blog',
      description: 'Energy intelligence articles for industrial leaders — power quality, efficiency, and ESG.',
      url: 'blog.html',
      category: 'Pages',
      keywords: 'blog insights articles news resources energy intelligence industrial leaders publications'
    },
    {
      title: 'FAQ',
      description: 'Your questions answered — technology, installation, savings, and commercial terms.',
      url: 'faq.html',
      category: 'Pages',
      keywords: 'faq questions answers help frequently asked support'
    },
    {
      title: 'Contact Us',
      description: 'Call +44 20 3494 4044 or email enquiries@harmoniqtechnologies.com. Book a free demo or site assessment.',
      url: 'contact.html',
      category: 'Pages',
      keywords: 'contact us email phone demo engineer assessment enquiry get in touch talk reach out call telephone +44 enquiries harmoniqtechnologies',
      boost: 8
    },
    {
      title: 'Partners',
      description: 'Partner with HarmoniQ Technologies — channel partners, integrators, and resellers.',
      url: 'partners.html',
      category: 'Pages',
      keywords: 'partners partnership channel integrators resellers distributors'
    },
    {
      title: 'Patents & Intellectual Property',
      description: 'HarmoniQ holds multiple patents covering our power optimization technology.',
      url: 'patents.html',
      category: 'Pages',
      keywords: 'patents intellectual property IP protected technology granted europe middle east'
    },
    {
      title: 'Privacy Policy',
      description: 'HarmoniQ Technologies privacy policy and data handling practices.',
      url: 'privacy.html',
      category: 'Pages',
      keywords: 'privacy policy data gdpr cookies personal information'
    },
    {
      title: 'Terms of Use',
      description: 'HarmoniQ Technologies terms of use and legal information.',
      url: 'terms.html',
      category: 'Pages',
      keywords: 'terms of use legal conditions agreement'
    },

    // ── Sectors ────────────────────────────────────────────────
    {
      title: 'Manufacturing — Sector Insight',
      description: 'How hidden electrical inefficiencies cost manufacturing plants hundreds of thousands a year.',
      url: 'sectors/manufacturing.html',
      category: 'Sectors',
      keywords: 'manufacturing plant motor vfd cnc welder compressor drive heavy industry factory production line'
    },
    {
      title: 'Hotels & Hospitality — Sector Insight',
      description: 'HVAC, laundry, kitchens, and lifts running around the clock — power optimization for hotels.',
      url: 'sectors/hotels-hospitality.html',
      category: 'Sectors',
      keywords: 'hotels hospitality hvac laundry kitchen lifts resort accommodation tourism'
    },
    {
      title: 'Mining & Extraction — Sector Insight',
      description: 'High-inertia motors running 24/7 in mining — ideal conditions for power quality optimization.',
      url: 'sectors/mining-extraction.html',
      category: 'Sectors',
      keywords: 'mining extraction quarrying crusher conveyor mineral processing heavy motor inertia'
    },
    {
      title: 'Water & Utilities — Sector Insight',
      description: 'Pump and aeration loads with predictable, high-volume consumption in water treatment.',
      url: 'sectors/water-utilities.html',
      category: 'Sectors',
      keywords: 'water utilities treatment pump aeration sewage desalination infrastructure'
    },
    {
      title: 'Oil & Gas Operations — Sector Insight',
      description: 'Pump stations and compressors with extreme motor loads in oil and gas facilities.',
      url: 'sectors/oil-gas.html',
      category: 'Sectors',
      keywords: 'oil gas petroleum refinery pump station compressor upstream downstream midstream'
    },
    {
      title: 'Airports — Sector Insight',
      description: 'Baggage handling, terminal HVAC, and ground power systems at airports.',
      url: 'sectors/airports.html',
      category: 'Sectors',
      keywords: 'airports aviation terminal baggage handling ground power hvac airside landside'
    },
    {
      title: 'Ports & Shipping — Sector Insight',
      description: 'Crane drives, refrigerated container banks, and dock equipment at ports.',
      url: 'sectors/ports-shipping.html',
      category: 'Sectors',
      keywords: 'ports shipping maritime crane container reefer dock quay logistics terminal'
    },
    {
      title: 'Commercial Real Estate — Sector Insight',
      description: 'Offices, shopping centres, and mixed-use developments with heavy HVAC loads.',
      url: 'sectors/commercial-real-estate.html',
      category: 'Sectors',
      keywords: 'commercial real estate office shopping centre mall mixed-use development building management hvac'
    },
    {
      title: 'Cold Storage & Logistics — Sector Insight',
      description: 'Refrigeration compressors and conveyor systems running non-stop in cold storage.',
      url: 'sectors/cold-storage-logistics.html',
      category: 'Sectors',
      keywords: 'cold storage refrigeration freezer warehouse distribution compressor temperature controlled chilled frozen'
    },
    {
      title: 'Healthcare — Sector Insight',
      description: 'HVAC, imaging equipment, and critical power quality requirements in healthcare facilities.',
      url: 'sectors/healthcare.html',
      category: 'Sectors',
      keywords: 'healthcare hospital clinic medical imaging mri ct scanner hvac critical power nhs'
    },
    {
      title: 'Food & Beverage — Sector Insight',
      description: 'Processing lines, refrigeration, and packaging drives running 24/7.',
      url: 'sectors/food-beverage.html',
      category: 'Sectors',
      keywords: 'food beverage processing packaging refrigeration production line dairy bakery brewery bottling'
    },
    {
      title: 'Pharmaceuticals — Sector Insight',
      description: 'Cleanroom HVAC and manufacturing loads with strict power quality demands.',
      url: 'sectors/pharmaceuticals.html',
      category: 'Sectors',
      keywords: 'pharmaceuticals pharma cleanroom gmp manufacturing drug production quality compliance hvac'
    },
    {
      title: 'Universities & Campuses — Sector Insight',
      description: 'Labs, server infrastructure, and estate-wide HVAC across large campus sites.',
      url: 'sectors/universities-campuses.html',
      category: 'Sectors',
      keywords: 'universities campuses education labs research server data centre hvac estate management'
    },
    {
      title: 'Logistics & Warehousing — Sector Insight',
      description: 'Conveyors, dock equipment, and refrigerated distribution centres.',
      url: 'sectors/logistics-warehousing.html',
      category: 'Sectors',
      keywords: 'logistics warehousing distribution centre conveyor dock sorting fulfilment supply chain'
    },
    {
      title: 'Steel & Metals — Sector Insight',
      description: 'Electric arc furnaces and rolling mills with the heaviest motor loads in industry.',
      url: 'sectors/steel-metals.html',
      category: 'Sectors',
      keywords: 'steel metals iron aluminium smelting electric arc furnace rolling mill foundry heavy industry'
    },

    // ── Articles ───────────────────────────────────────────────
    {
      title: 'The Hidden Cost on Every Industrial Electricity Bill',
      description: 'How reactive power, harmonics, and power factor penalties inflate your electricity bill by 10-25%.',
      url: 'articles/hidden-cost.html',
      category: 'Articles',
      keywords: 'hidden cost electricity bill reactive power kva billing power factor penalty demand charge utility cost savings industrial overhead surcharge'
    },
    {
      title: 'The IEEE Arrhenius Rule: Why Every 10°C Matters',
      description: 'How excess heat from poor power quality halves equipment insulation life — and what it costs you.',
      url: 'articles/arrhenius-rule.html',
      category: 'Articles',
      keywords: 'arrhenius rule temperature heat insulation equipment life motor transformer cable degradation 10 degrees celsius thermal aging maintenance replacement'
    },
    {
      title: 'Power Factor Penalties: What Your Utility Isn\'t Telling You',
      description: 'Five penalty models utilities use to charge for low power factor — and how to eliminate them.',
      url: 'articles/pf-penalties.html',
      category: 'Articles',
      keywords: 'power factor penalties utility billing kva multiplier kvar charge reactive energy surcharge threshold country comparison eliminate correction'
    },
    {
      title: 'Scope 2 Emissions: The Fastest Lever Most Companies Overlook',
      description: 'Why improving power quality is the quickest, cheapest way to reduce Scope 2 carbon emissions.',
      url: 'articles/scope2-emissions.html',
      category: 'Articles',
      keywords: 'scope 2 emissions carbon footprint esg sustainability csrd reporting greenhouse gas reduction decarbonisation net zero climate energy efficiency'
    },
    {
      title: 'Active vs Passive Power Factor Correction',
      description: 'Comparing capacitor banks, active filters, and HarmoniQ — which approach actually solves the problem.',
      url: 'articles/active-vs-passive.html',
      category: 'Articles',
      keywords: 'active passive power factor correction capacitor bank active filter harmonic filter comparison pfc technology waveform distortion thd'
    },
    {
      title: 'How Utilities Calculate kWh and kW Demand',
      description: 'Technical report on utility metering — demand intervals, sliding windows, and how your demand charge is set.',
      url: 'articles/utility-kwh-calculation-report.html',
      category: 'Articles',
      keywords: 'utility kwh calculation kw demand metering interval sliding window block demand charge meter measurement billing methodology technical report'
    },
    {
      title: 'The Solar Blind Spot: How Clean Energy Creates Dirty Power',
      description: 'PV inverters inject 3-15% THD that degrades power quality, damages equipment, and erodes solar ROI. How to solve it.',
      url: 'articles/solar-pv-power-quality.html',
      category: 'Articles',
      keywords: 'solar pv photovoltaic renewable energy harmonics thd inverter pwm clean energy green distortion capacitor bank resonance active filter partial load rooftop sustainability esg'
    },
    {
      title: 'Weather Normalisation: Proving Energy Savings Are Real',
      description: 'Weather normalisation, regression analysis, and the international frameworks (IPMVP, ASHRAE Guideline 14, ISO 50015) used to verify real savings.',
      url: 'articles/proving-energy-savings.html',
      category: 'Articles',
      keywords: 'measurement verification m&v mv ipmvp ashrae guideline 14 iso 50015 50001 weather normalisation regression baseline savings proof verify credible cvrmse nmbe statistical confidence'
    },
    {
      title: 'Why Capacitor Banks Don\'t Solve the Full Problem',
      description: 'Capacitor banks correct displacement power factor at fundamental frequency. They do not address harmonics, voltage instability, phase imbalance, or resonance risk.',
      url: 'articles/capacitor-banks.html',
      category: 'Articles',
      keywords: 'capacitor bank pfc power factor correction passive active harmonics resonance detuning reactor displacement true power factor ieee 1036 iec 60831 1459 519 capacitor failure'
    },
    {
      title: 'Harmonics: The Silent Equipment Killer',
      description: 'Modern industrial networks carry hundreds of hertz of harmonic currents on top of the fundamental. What they are, where they come from, and how to eliminate them.',
      url: 'articles/harmonics.html',
      category: 'Articles',
      keywords: 'harmonics thd total harmonic distortion vfd variable speed drive rectifier ups power quality ieee 519 iec 61000 c57.110 eddy current skin effect negative sequence triplen k factor transformer derating active filter'
    },
    {
      title: 'Understanding HarmoniQ: The Physics of Clean Current',
      description: 'A technical reference explaining the three types of current distortion — reactive power, harmonics, and phase imbalance — and how HarmoniQ corrects all three.',
      url: 'articles/understanding-harmoniq.html',
      category: 'Articles',
      keywords: 'technical reference deep dive physics clean current reactive power harmonic distortion phase imbalance power factor thd control loop superposition narrowband tuning three components booster alpha filter how it works',
      boost: 10
    },
    {
      title: 'The Electrification of Everything: Why Global Power Demand Is About to Surge',
      description: 'EVs, heat pumps, data centres, and green hydrogen are driving a 75% increase in global electricity demand. What this means for industrial power quality.',
      url: 'articles/electrification-of-everything.html',
      category: 'Articles',
      keywords: 'electrification electric vehicle ev heat pump data centre green hydrogen demand growth 2050 global trend macro energy transition decarbonisation'
    },
    {
      title: 'Global Electricity Prices: What Industrial Operators Pay Around the World',
      description: 'From $0.02/kWh in Kuwait to $0.25/kWh in Germany — a comprehensive analysis of industrial electricity costs across 40+ countries.',
      url: 'articles/global-electricity-prices.html',
      category: 'Articles',
      keywords: 'global electricity prices industrial rates cost kwh comparison countries international tariff energy cost kuwait germany uk france italy usa china japan'
    },
    {
      title: 'Unlocking Grid Capacity Without Building New Infrastructure',
      description: 'Most industrial facilities waste 15–30% of their grid connection capacity on reactive power and harmonics. Here is how to get it back.',
      url: 'articles/unlocking-grid-capacity.html',
      category: 'Articles',
      keywords: 'grid capacity transformer upgrade reactive power harmonic load capacity release kva connection utility infrastructure constraint deferred capex expansion'
    },
    {
      title: 'The True Cost of an Industrial Motor',
      description: 'The purchase price is just 3% of a motor lifetime cost. The other 97% is electricity — and poor power quality inflates it significantly.',
      url: 'articles/true-cost-industrial-motor.html',
      category: 'Articles',
      keywords: 'industrial motor total cost ownership tco electricity 97 percent lifetime purchase price energy cost motor efficiency ie3 ie4 premium'
    },
    {
      title: 'The ESG Case for Equipment Life Extension',
      description: 'Extending motor and transformer life by 2–4x through power quality optimisation avoids hundreds of tonnes of embodied carbon per facility.',
      url: 'articles/esg-equipment-life.html',
      category: 'Articles',
      keywords: 'esg sustainability equipment life extension embodied carbon scope 3 avoided emissions circular economy motor transformer lifespan csrd reporting sbti'
    },
    {
      title: 'Energy Efficiency vs Power Quality Optimisation',
      description: 'Most energy strategies focus on reducing consumption but ignore the 5–30% wasted through poor power quality. Why you need both disciplines.',
      url: 'articles/efficiency-vs-power-quality.html',
      category: 'Articles',
      keywords: 'energy efficiency power quality optimisation kwh kva distinction discipline audit eems iso 50001 energy management two disciplines both'
    },
    {
      title: "Europe's Industrial Energy Crisis: The Case for Power Quality Investment",
      description: 'With the highest industrial electricity prices globally, European manufacturers face a unique imperative to optimise every kilowatt.',
      url: 'articles/europe-industrial-energy.html',
      category: 'Articles',
      keywords: 'europe european industrial energy crisis germany france uk italy spain netherlands manufacturing decarbonisation eu taxonomy csrd emissions pricing'
    },
    {
      title: "The Middle East's Industrial Power Challenge: Beyond Cheap Electricity",
      description: 'Subsidy reform, 50°C ambient temperatures, and Vision 2030 industrialisation are transforming the Middle East power quality landscape.',
      url: 'articles/middle-east-industrial-energy.html',
      category: 'Articles',
      keywords: 'middle east saudi arabia uae qatar kuwait bahrain oman egypt gcc vision 2030 subsidy reform ambient temperature industrialisation tariff'
    },

    // ── Features & Topics ──────────────────────────────────────
    {
      title: 'Energy Savings (10-25%)',
      description: 'HarmoniQ reduces electricity consumption by 10-25% through electromagnetic waveform optimization.',
      url: 'index.html#measured-impact',
      category: 'Features',
      keywords: 'energy savings 10 25 percent reduction electricity consumption kwh lower bills cost reduction'
    },
    {
      title: 'Equipment Life Extension',
      description: 'Reduce operating temperatures by up to 20°C, doubling or tripling the lifespan of motors and transformers.',
      url: 'index.html#measured-impact',
      category: 'Features',
      keywords: 'equipment life extension motor transformer cable lifespan temperature reduction maintenance capex protection asset longevity'
    },
    {
      title: 'Power Factor Correction',
      description: 'Achieve near-unity power factor (0.99+), eliminating reactive power penalties from your bill.',
      url: 'index.html#measured-impact',
      category: 'Features',
      keywords: 'power factor correction unity 0.99 reactive power kvar penalty elimination billing improvement'
    },
    {
      title: 'Scope 2 Carbon Reduction',
      description: 'Lower your Scope 2 emissions by reducing wasted energy — measurable, reportable, and audit-ready.',
      url: 'index.html#measured-impact',
      category: 'Features',
      keywords: 'scope 2 carbon emissions reduction esg csrd sustainability reporting audit decarbonisation greenhouse gas co2'
    },
    {
      title: 'Harmonic Mitigation',
      description: 'HarmoniQ\'s waveform injection neutralizes current harmonics, reducing THD and protecting sensitive equipment.',
      url: 'how-it-works.html',
      category: 'Features',
      keywords: 'harmonics thd total harmonic distortion mitigation reduction waveform distortion current voltage clean power quality'
    },
    {
      title: 'Industries We Serve',
      description: 'Manufacturing, cold storage, mining, healthcare, data centres, commercial real estate, and more.',
      url: 'industries.html',
      category: 'Features',
      keywords: 'industries sectors manufacturing cold storage refrigeration mining quarrying healthcare hospital data centre commercial real estate hotel retail food processing water treatment oil gas chemical pharmaceutical textile cement steel'
    },
    {
      title: 'The HarmoniQ Pilot Protocol',
      description: 'Our four-step process: Site Assessment → Pilot Installation → Commercial Model → Fleet Rollout. Zero disruption, verified savings before you commit.',
      url: 'index.html#protocol',
      category: 'Features',
      keywords: 'harmoniq pilot protocol process how we work steps site assessment pilot installation fleet rollout methodology journey onboarding deployment',
      boost: 8
    },
    {
      title: 'Free Site Assessment',
      description: 'Book a free, no-obligation site assessment to find out how much your facility could save.',
      url: 'contact.html#demo',
      category: 'Features',
      keywords: 'free site assessment demo book consultation survey evaluation no obligation engineer visit'
    },
    {
      title: 'Rental Model — No Upfront Cost',
      description: 'HarmoniQ is available on a rental basis — savings typically exceed the rental fee from month one.',
      url: 'faq.html#commercial',
      category: 'Features',
      keywords: 'rental model lease no upfront cost opex zero capex monthly fee subscription pay from savings commercial terms pricing'
    },
    {
      title: 'Installation Process',
      description: 'Non-invasive installation with no production downtime — typically completed in one day.',
      url: 'faq.html#installation',
      category: 'Features',
      keywords: 'installation process non-invasive no downtime one day quick setup retrofit plug and play commissioning'
    },
    {
      title: 'Proven Energy Savings (10–25%)',
      description: 'Verified savings across 4,250+ deployed units, measured against metered baselines.',
      url: 'savings-calculator.html',
      category: 'Features',
      keywords: 'savings proven verified metered baseline results energy reduction roi return investment'
    },

    // ── FAQ Items (deep-linked to individual questions) ────────
    {
      title: 'What exactly does HarmoniQ do?',
      description: 'HarmoniQ cleans electrical current by eliminating harmonic distortion, reactive current, and phase imbalance at the source.',
      url: 'faq.html#faq-what-exactly-does-harmoniq-do',
      category: 'FAQ',
      keywords: 'what does harmoniq do how work technology explain overview summary clean current harmonic reactive'
    },
    {
      title: 'How is HarmoniQ different from capacitor banks?',
      description: 'Unlike capacitor banks, HarmoniQ addresses all power quality issues simultaneously — not just power factor.',
      url: 'faq.html#faq-how-is-harmoniq-different-from-a',
      category: 'FAQ',
      keywords: 'different capacitor bank comparison advantage unique better why choose alternative competition resonance'
    },
    {
      title: 'Is the technology patented?',
      description: 'Yes — HarmoniQ\'s Electrical Current Balancing System is protected by granted patents.',
      url: 'faq.html#faq-is-the-technology-patented',
      category: 'FAQ',
      keywords: 'patented technology patent protected intellectual property ip granted'
    },
    {
      title: 'What equipment types does HarmoniQ work with?',
      description: 'Compatible with all sub-600V equipment — motors, VSDs, UPS, HVAC, lighting, IT infrastructure, chargers.',
      url: 'faq.html#faq-what-equipment-types-does-harmoniq-work',
      category: 'FAQ',
      keywords: 'compatible equipment systems motors vfd vsd transformers compressors hvac lighting industrial works with ups server chargers'
    },
    {
      title: 'Is the equipment certified?',
      description: 'ETL Listed, CE marked, FCC compliant, EMC tested, Type 4X rated. Meets IEEE 519-2022, IEC 61000, ISO 50015.',
      url: 'faq.html#faq-is-the-equipment-certified',
      category: 'FAQ',
      keywords: 'certified certifications etl ce fcc emc intertek ul approval compliance ieee 519 iec 61000 iso 50015 standards'
    },
    {
      title: 'What happens if the HarmoniQ system fails?',
      description: 'HarmoniQ is shunt-connected — not in the power path. If offline, your facility operates normally.',
      url: 'faq.html#faq-what-happens-if-the-harmoniq-system',
      category: 'FAQ',
      keywords: 'fails failure breakdown offline safety risk redundancy shunt parallel'
    },
    {
      title: 'How does reducing heat extend equipment life?',
      description: 'IEEE Arrhenius Law — every 10°C reduction doubles insulation life. HarmoniQ cuts temps by up to 20°C, extending life 2-4x.',
      url: 'faq.html#faq-how-does-reducing-heat-extend-equipment',
      category: 'FAQ',
      keywords: 'heat reduction temperature cooling thermal i2r losses equipment life extension arrhenius motor transformer insulation'
    },
    {
      title: 'How is it installed? Does it require downtime?',
      description: 'Installed in parallel on spare breakers — no rewiring, no downtime. Takes 1 day to 2 weeks depending on site size.',
      url: 'faq.html#faq-how-is-it-installed-does-it',
      category: 'FAQ',
      keywords: 'installation install downtime interruption parallel breaker wiring process setup commissioning day'
    },
    {
      title: 'How long does installation take from agreement to go-live?',
      description: 'Most installations complete in 1-2 weeks after site assessment. Simple sites in one day.',
      url: 'faq.html#faq-how-long-does-installation-take-from',
      category: 'FAQ',
      keywords: 'installation time duration how long days weeks timeline go live deployment'
    },
    {
      title: 'Does it work with my existing energy management system?',
      description: 'Yes — integrates with BMS, SCADA, energy management via Modbus, BACnet, and MQTT.',
      url: 'faq.html#faq-does-it-work-with-my-existing',
      category: 'FAQ',
      keywords: 'integration bms scada ems energy management modbus bacnet mqtt existing system protocols'
    },
    {
      title: 'What maintenance does HarmoniQ require?',
      description: 'Minimal — no mechanical components, annual inspection included in rental, remote monitoring via software platform.',
      url: 'faq.html#faq-what-maintenance-does-harmoniq-require',
      category: 'FAQ',
      keywords: 'maintenance required service upkeep moving parts reliable lifespan maintenance-free inspection remote monitoring'
    },
    {
      title: 'How are the 10–25% savings calculated?',
      description: 'Measured against a pre-installation baseline using industry-standard power analysers — kWh, PF, demand, penalties.',
      url: 'faq.html#faq-how-are-the-1025-savings-calculated',
      category: 'FAQ',
      keywords: 'savings calculated measured verified metering data baseline proof evidence billing comparison before after methodology analyser'
    },
    {
      title: 'How quickly will I see results?',
      description: 'Power quality improvements are immediate and measurable on installation day. Financial savings on your next utility bill.',
      url: 'faq.html#faq-how-quickly-will-i-see-results',
      category: 'FAQ',
      keywords: 'how quick fast results immediate see savings timeline payback'
    },
    {
      title: 'Can you guarantee the savings?',
      description: 'Free on-site demonstration before any commitment. Rental contracts include performance benchmarks.',
      url: 'faq.html#faq-can-you-guarantee-the-savings',
      category: 'FAQ',
      keywords: 'guaranteed savings performance guarantee money back promise commitment assurance demo free trial'
    },
    {
      title: 'Does HarmoniQ help with ESG / carbon reporting?',
      description: 'Yes — reduces Scope 2 emissions, with automatic CO₂ reporting formatted for ESG disclosures and ISO 50001.',
      url: 'faq.html#faq-does-harmoniq-help-with-esg-carbon',
      category: 'FAQ',
      keywords: 'esg reporting csrd scope 2 emissions carbon co2 sustainability compliance data measurable audit iso 50001 green'
    },
    {
      title: 'What are the commercial options — rental vs purchase?',
      description: 'Two models: rental (monthly fee covered by savings, cashflow-positive day one) or outright purchase.',
      url: 'faq.html#faq-what-are-the-commercial-options-rental',
      category: 'FAQ',
      keywords: 'rental purchase buy lease commercial model pricing cost price fee monthly capex opex finance terms how much'
    },
    {
      title: 'Is there a minimum site size?',
      description: 'Works best for facilities spending $500k+ per year on electricity. Smaller sites see real savings but weaker unit economics.',
      url: 'faq.html#faq-is-there-a-minimum-site-size',
      category: 'FAQ',
      keywords: 'minimum site size kva requirements qualifying criteria threshold small large facility bill amount suitable'
    },
    {
      title: 'Do you work internationally?',
      description: 'Yes — 120+ sites across Europe, Middle East, and North America in 15+ countries. 50Hz and 60Hz supported.',
      url: 'faq.html#faq-do-you-work-internationally',
      category: 'FAQ',
      keywords: 'international available countries uk europe middle east asia americas global worldwide locations 50hz 60hz'
    },

    // ── Team ───────────────────────────────────────────────────
    {
      title: 'Leadership Team',
      description: 'Meet the founders — Oleg (CEO), Oscar (COO), and Edward (CTO) — with backgrounds from Siemens, McKinsey, and Imperial College.',
      url: 'about.html#leadership',
      category: 'Pages',
      keywords: 'team leadership founders ceo coo cto oleg oscar edward management board executives people who runs'
    },

    // ── Products (individual hardware devices) ─────────────────
    {
      title: 'HarmoniQ Filter',
      description: 'Software-controlled active filter that tracks and cancels up to 51 harmonic orders in real time.',
      url: 'how-it-works.html#hardware',
      category: 'Products',
      keywords: 'harmoniq filter active harmonic filter afm thd 51 orders harmonic cancellation self-tuning ieee 519 load changes software controlled tier 1',
      boost: 6
    },
    {
      title: 'HarmoniQ Alpha',
      description: 'Real-time impedance matching and line conditioning — phase balancing, voltage stabilisation, circulating current elimination.',
      url: 'how-it-works.html#hardware',
      category: 'Products',
      keywords: 'harmoniq alpha harmoniq 600 impedance matching line conditioning phase balancing voltage stabilisation circulating current neutral current tier 2 hybrid resonant',
      boost: 6
    },
    {
      title: 'HarmoniQ Booster',
      description: 'Solid-state power factor correction to 0.99+ — replaces conventional capacitor banks with zero resonance risk.',
      url: 'how-it-works.html#hardware',
      category: 'Products',
      keywords: 'harmoniq booster power factor correction pfc solid state capacitor bank replacement unity 0.99 reactive power voltage stabilisation tier 3 no resonance',
      boost: 6
    }
  ];

  // ── Category Icons (SVG) ─────────────────────────────────────
  const CATEGORY_ICONS = {
    Pages: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    Products: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    Articles: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    Features: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    FAQ: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    Sectors: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    Contact: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 010 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>'
  };

  // ── Resolve relative URLs ───────────────────────────────────
  function resolveUrl(url) {
    // Detect if we're in a subdirectory (e.g., articles/ or sectors/)
    const path = window.location.pathname;
    const inSubdir = path.includes('/articles/') || path.includes('/sectors/');
    if (inSubdir && !url.startsWith('http') && !url.startsWith('/')) {
      return '../' + url;
    }
    return url;
  }

  // ── Levenshtein distance (bounded to max 2) ──────────────────
  function editDistance(a, b, max) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > max) return max + 1;
    const la = a.length, lb = b.length;
    if (la === 0) return lb;
    if (lb === 0) return la;
    let prev = new Array(lb + 1);
    let curr = new Array(lb + 1);
    for (let j = 0; j <= lb; j++) prev[j] = j;
    for (let i = 1; i <= la; i++) {
      curr[0] = i;
      let rowMin = curr[0];
      for (let j = 1; j <= lb; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(
          prev[j] + 1,       // deletion
          curr[j - 1] + 1,   // insertion
          prev[j - 1] + cost // substitution
        );
        if (curr[j] < rowMin) rowMin = curr[j];
      }
      if (rowMin > max) return max + 1;
      [prev, curr] = [curr, prev];
    }
    return prev[lb];
  }

  // Tokenize a haystack into words for fuzzy matching
  function tokenize(text) {
    return text.toLowerCase().match(/[a-z0-9]+/g) || [];
  }

  // Check if a query term matches a haystack word — exact, prefix, or typo-tolerant
  function termMatches(term, haystack, haystackWords) {
    // Exact substring match (fast path)
    if (haystack.includes(term)) return { matched: true, kind: 'exact' };
    // For short terms (< 4 chars), don't attempt fuzzy matching — too noisy
    if (term.length < 4) return { matched: false };
    // Prefix match against any word (e.g. "manufactu" → "manufacturing")
    for (const word of haystackWords) {
      if (word.length >= term.length && word.startsWith(term)) {
        return { matched: true, kind: 'prefix' };
      }
    }
    // Typo tolerance: edit distance ≤ 1 for terms ≥ 5 chars, ≤ 2 for terms ≥ 8 chars
    const maxDist = term.length >= 8 ? 2 : 1;
    for (const word of haystackWords) {
      if (Math.abs(word.length - term.length) > maxDist) continue;
      if (editDistance(term, word, maxDist) <= maxDist) {
        return { matched: true, kind: 'typo' };
      }
    }
    return { matched: false };
  }

  // ── Search with fuzzy matching, prefix, and typo tolerance ──
  function searchEntries(query) {
    if (!query || query.trim().length === 0) return [];

    const terms = query.toLowerCase().match(/[a-z0-9]+/g) || [];
    if (terms.length === 0) return [];

    const scored = [];

    for (const entry of SEARCH_INDEX) {
      const titleLower = entry.title.toLowerCase();
      const descLower = entry.description.toLowerCase();
      const kwLower = entry.keywords.toLowerCase();
      const haystack = titleLower + ' ' + descLower + ' ' + kwLower;
      const haystackWords = tokenize(haystack);

      let score = 0;
      let allMatch = true;
      let matchKinds = [];

      for (const term of terms) {
        const match = termMatches(term, haystack, haystackWords);
        if (!match.matched) { allMatch = false; break; }
        matchKinds.push(match.kind);

        // Penalty for fuzzy/prefix matches so exact wins
        const kindPenalty = match.kind === 'exact' ? 1 : match.kind === 'prefix' ? 0.7 : 0.4;

        // Title match is highest priority
        if (titleLower.includes(term) || tokenize(titleLower).some(w => w.startsWith(term) || editDistance(term, w, 1) <= 1)) {
          score += 12 * kindPenalty;
        }
        // Description match
        if (descLower.includes(term)) {
          score += 5 * kindPenalty;
        }
        // Keyword match
        if (kwLower.includes(term)) {
          score += 3 * kindPenalty;
        }
        // Exact word-boundary bonus (only for exact matches)
        if (match.kind === 'exact') {
          const wordBoundary = new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
          if (wordBoundary.test(haystack)) score += 2;
        }
      }

      if (!allMatch || score <= 0) continue;

      // Popularity boost for primary pages
      if (entry.boost) score += entry.boost;

      // Bonus for full-phrase match in title
      if (titleLower.includes(query.toLowerCase())) score += 8;

      scored.push({ entry, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.entry);
  }

  // ── Highlight matching text ──────────────────────────────────
  function highlight(text, query) {
    if (!query) return text;
    const terms = query.split(/\s+/).filter(t => t.length > 1);
    if (terms.length === 0) return text;
    const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp('(' + escaped.join('|') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // ── Build Modal HTML ─────────────────────────────────────────
  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'searchOverlay';
    overlay.innerHTML = `
      <div class="search-modal" id="searchModal">
        <div class="search-input-wrap">
          <svg class="search-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" class="search-input" id="searchInput" placeholder="Search pages, articles, FAQs..." autocomplete="off" spellcheck="false" />
          <button type="button" class="search-close-btn" id="searchCloseBtn" aria-label="Close search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
        <div class="search-results" id="searchResults">
          <div class="search-empty-state" id="searchEmpty">
            <div class="search-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p>Start typing to search the site</p>
            <div class="search-hints">
              <span>Try:</span>
              <button type="button" class="search-hint-btn" data-query="pricing">pricing</button>
              <button type="button" class="search-hint-btn" data-query="demo">book demo</button>
              <button type="button" class="search-hint-btn" data-query="savings calculator">calculator</button>
              <button type="button" class="search-hint-btn" data-query="installation time">installation</button>
              <button type="button" class="search-hint-btn" data-query="industries">industries</button>
            </div>
          </div>
          <div class="search-no-results" id="searchNoResults" style="display:none">
            <p>No results found</p>
            <span class="search-no-results-hint">Try different keywords, or jump straight to:</span>
            <div class="search-hints" style="margin-top: 14px;">
              <button type="button" class="search-hint-btn" data-query="savings calculator">calculator</button>
              <button type="button" class="search-hint-btn" data-query="contact">contact</button>
              <button type="button" class="search-hint-btn" data-query="faq">FAQ</button>
              <button type="button" class="search-hint-btn" data-query="industries">industries</button>
            </div>
          </div>
          <div class="search-results-list" id="searchResultsList"></div>
        </div>
        <div class="search-footer">
          <div class="search-footer-keys">
            <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> Navigate</span>
            <span><kbd>&crarr;</kbd> Open</span>
            <span><kbd>esc</kbd> Close</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  // ── Render Results ───────────────────────────────────────────
  function renderResults(results, query) {
    const list = document.getElementById('searchResultsList');
    const empty = document.getElementById('searchEmpty');
    const noResults = document.getElementById('searchNoResults');

    if (!query || query.trim().length === 0) {
      list.innerHTML = '';
      empty.style.display = '';
      noResults.style.display = 'none';
      activeIndex = -1;
      return;
    }

    empty.style.display = 'none';

    if (results.length === 0) {
      list.innerHTML = '';
      noResults.style.display = '';
      activeIndex = -1;
      return;
    }

    noResults.style.display = 'none';

    // Group by category
    const groups = {};
    const categoryOrder = ['Pages', 'Products', 'Sectors', 'Features', 'Articles', 'FAQ', 'Contact'];
    for (const r of results) {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    }

    let html = '';
    let itemIndex = 0;

    for (const cat of categoryOrder) {
      if (!groups[cat]) continue;
      const icon = CATEGORY_ICONS[cat] || '';
      html += `<div class="search-group"><div class="search-group-label">${icon} ${cat}</div>`;
      for (const r of groups[cat]) {
        html += `
          <a href="${resolveUrl(r.url)}" class="search-result-item" data-index="${itemIndex}">
            <div class="search-result-title">${highlight(r.title, query)}</div>
            <div class="search-result-desc">${highlight(r.description, query)}</div>
          </a>`;
        itemIndex++;
      }
      html += '</div>';
    }

    list.innerHTML = html;
    activeIndex = 0;
    updateActive();
  }

  // ── Keyboard Navigation ──────────────────────────────────────
  let activeIndex = -1;

  function getItems() {
    return document.querySelectorAll('.search-result-item');
  }

  function updateActive() {
    const items = getItems();
    items.forEach((el, i) => {
      el.classList.toggle('active', i === activeIndex);
    });
    // Scroll active into view
    const active = items[activeIndex];
    if (active) {
      active.scrollIntoView({ block: 'nearest' });
    }
  }

  // ── Open / Close ─────────────────────────────────────────────
  let overlay = null;
  let isOpen = false;

  function open() {
    if (isOpen) return;
    if (!overlay) overlay = createModal();

    overlay.classList.add('open');
    isOpen = true;
    document.body.style.overflow = 'hidden';

    const input = document.getElementById('searchInput');
    // Small delay so focus works on mobile
    setTimeout(() => input.focus(), 50);

    // Bind events
    input.addEventListener('input', onInput);

    // Delegate hint-button clicks (covers both initial and no-results states)
    overlay.addEventListener('click', (e) => {
      const btn = e.target.closest('.search-hint-btn');
      if (btn) {
        input.value = btn.dataset.query;
        input.dispatchEvent(new Event('input'));
        input.focus();
      }
    });

    // Close button
    const closeBtn = document.getElementById('searchCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  function close() {
    if (!isOpen || !overlay) return;
    overlay.classList.remove('open');
    isOpen = false;
    document.body.style.overflow = '';

    const input = document.getElementById('searchInput');
    input.value = '';
    renderResults([], '');
  }

  let debounceTimer = null;

  function onInput(e) {
    const query = e.target.value.trim();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const results = searchEntries(query);
      renderResults(results, query);
    }, 80);
  }

  // ── Global Key Handlers ──────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    // CMD+K or CTRL+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        close();
      } else {
        open();
      }
      return;
    }

    // "/" to open (when not focused on an input)
    if (e.key === '/' && !isOpen) {
      const tag = document.activeElement?.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault();
        open();
        return;
      }
    }

    if (!isOpen) return;

    // ESC to close
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    const items = getItems();
    if (items.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActive();
      return;
    }

    // Arrow up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActive();
      return;
    }

    // Enter to navigate
    if (e.key === 'Enter') {
      e.preventDefault();
      const active = items[activeIndex];
      if (active) {
        window.location.href = active.href;
      }
    }
  });

  // ── Click outside to close ───────────────────────────────────
  document.addEventListener('click', (e) => {
    if (!isOpen) return;
    const modal = document.getElementById('searchModal');
    if (modal && !modal.contains(e.target) && !e.target.closest('.nav-search-btn')) {
      close();
    }
  });

  // ── Expose open/close for the nav button ─────────────────────
  window.HarmoniQSearch = { open, close };

  // ── Add search button to nav ────────────────────────────────
  function injectNavButton() {
    const navActions = document.querySelector('.nav-actions');
    const mobileNavEl = document.getElementById('mobileNav');

    if (navActions) {
      const btn = document.createElement('button');
      btn.className = 'nav-search-btn';
      btn.setAttribute('aria-label', 'Search');
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span class="nav-search-label">Search</span>
      `;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        open();
      });

      // Insert before the phone link
      const phone = navActions.querySelector('.nav-phone');
      if (phone) {
        navActions.insertBefore(btn, phone);
      } else {
        navActions.prepend(btn);
      }
    }

    // Add search link to mobile nav
    if (mobileNavEl) {
      const mobileBtn = document.createElement('a');
      mobileBtn.href = '#';
      mobileBtn.className = 'mobile-search-link';
      mobileBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Search';
      mobileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Close mobile nav first
        mobileNavEl.classList.remove('open');
        const toggle = document.getElementById('navToggle');
        if (toggle) toggle.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => open(), 200);
      });
      mobileNavEl.insertBefore(mobileBtn, mobileNavEl.firstChild);
    }
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavButton);
  } else {
    injectNavButton();
  }

})();
