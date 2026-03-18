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
      title: 'How It Works',
      description: 'Learn how HarmoniQ\'s electromagnetic waveform injection technology optimizes your power system.',
      url: 'how-it-works.html',
      category: 'Pages',
      keywords: 'how it works technology waveform injection electromagnetic power quality reactive energy harmonics'
    },
    {
      title: 'Savings Calculator',
      description: 'Calculate how much your facility could save with HarmoniQ — by bill, spend, or facility size.',
      url: 'savings-calculator.html',
      category: 'Pages',
      keywords: 'roi calculator savings return on investment monthly bill annual spend facility size industry power factor payback'
    },
    {
      title: 'Case Studies',
      description: 'Real results from industrial facilities using HarmoniQ technology.',
      url: 'case-studies.html',
      category: 'Pages',
      keywords: 'case studies results proof evidence examples testimonials real world facilities customers'
    },
    {
      title: 'About Us',
      description: 'Our story, leadership team, principles, and investor information — 120+ sites, 15+ countries.',
      url: 'about.html',
      category: 'Pages',
      keywords: 'about us company team leadership founders story mission oleg oscar edward principles investors 120 sites 15 countries'
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
      description: 'Get in touch — book a free demo, talk to an engineer, or request a site assessment.',
      url: 'contact.html',
      category: 'Pages',
      keywords: 'contact us email phone demo engineer assessment enquiry get in touch talk'
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
      url: 'index.html#industries',
      category: 'Features',
      keywords: 'industries sectors manufacturing cold storage refrigeration mining quarrying healthcare hospital data centre commercial real estate hotel retail food processing water treatment oil gas chemical pharmaceutical textile cement steel'
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
      title: 'Payback Period (12-18 Months)',
      description: 'Typical payback within 12-18 months when purchasing the unit outright.',
      url: 'faq.html#commercial',
      category: 'Features',
      keywords: 'payback period 12 18 months return investment roi break even purchase buy outright'
    },

    // ── FAQ Items ──────────────────────────────────────────────
    {
      title: 'What does HarmoniQ actually do?',
      description: 'HarmoniQ injects a corrective electromagnetic waveform that cancels reactive power, harmonics, and voltage instability in real time.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'what does harmoniq do how work technology explain overview summary'
    },
    {
      title: 'How is HarmoniQ different from capacitor banks?',
      description: 'Unlike capacitor banks, HarmoniQ addresses all power quality issues simultaneously — not just power factor.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'different capacitor bank comparison advantage unique better why choose alternative competition'
    },
    {
      title: 'Is the technology patented?',
      description: 'Yes — HarmoniQ\'s electromagnetic waveform injection technology is protected by granted patents across Europe and the Middle East.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'patented technology patent protected intellectual property ip granted'
    },
    {
      title: 'What equipment is compatible?',
      description: 'HarmoniQ works with all standard industrial electrical systems — motors, transformers, compressors, HVAC, lighting, and more.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'compatible equipment systems motors transformers compressors hvac lighting industrial works with'
    },
    {
      title: 'Does HarmoniQ reduce heat?',
      description: 'Yes — by reducing reactive current and harmonics, HarmoniQ lowers I²R losses and operating temperatures by up to 20°C.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'heat reduction temperature cooling thermal i2r losses lower degrees celsius equipment'
    },
    {
      title: 'How long does installation take?',
      description: 'Typically one day. No production shutdown required — HarmoniQ connects in parallel to your distribution board.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'installation time duration how long day quick fast easy parallel distribution board'
    },
    {
      title: 'Does HarmoniQ require maintenance?',
      description: 'Minimal. HarmoniQ has no moving parts and is designed for 15+ years of maintenance-free operation.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'maintenance required service upkeep moving parts reliable lifespan 15 years maintenance-free'
    },
    {
      title: 'How are savings calculated?',
      description: 'Savings are measured using before-and-after metering data, verified against utility bills over a 3-month baseline.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'savings calculated measured verified metering data baseline proof evidence billing comparison before after'
    },
    {
      title: 'Do you offer guaranteed savings?',
      description: 'Yes — HarmoniQ offers performance guarantees backed by metered data on qualifying sites.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'guaranteed savings performance guarantee money back promise commitment assurance qualifying'
    },
    {
      title: 'Can HarmoniQ help with ESG reporting?',
      description: 'Yes — reduced energy consumption directly lowers Scope 2 emissions, providing measurable data for ESG and CSRD reports.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'esg reporting csrd scope 2 emissions carbon sustainability compliance data measurable audit'
    },
    {
      title: 'What is the minimum site size?',
      description: 'HarmoniQ is most effective on sites drawing 100 kVA or more — typically facilities with monthly bills above $6,000.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'minimum site size kva requirements qualifying criteria threshold small large facility bill amount'
    },
    {
      title: 'Is HarmoniQ available internationally?',
      description: 'Yes — HarmoniQ operates in 15+ countries including UK, Europe, Middle East, and select markets in Asia and the Americas.',
      url: 'faq.html',
      category: 'FAQ',
      keywords: 'international available countries uk europe middle east asia americas global worldwide locations'
    },

    // ── Team ───────────────────────────────────────────────────
    {
      title: 'Leadership Team',
      description: 'Meet the founders — Oleg (CEO), Oscar (COO), and Edward (CTO) — with backgrounds from Siemens, McKinsey, and Imperial College.',
      url: 'about.html#leadership',
      category: 'Pages',
      keywords: 'team leadership founders ceo coo cto oleg oscar edward management board executives people who runs'
    },

    // ── Contact info ───────────────────────────────────────────
    {
      title: 'Phone: 020 3494 4044',
      description: 'Call us to discuss your energy optimization needs.',
      url: 'contact.html',
      category: 'Contact',
      keywords: 'phone telephone number call ring 020 3494 4044'
    },
    {
      title: 'Email: enquiries@harmoniqtechnology.com',
      description: 'Send us an email with your enquiry.',
      url: 'contact.html',
      category: 'Contact',
      keywords: 'email address enquiry enquiries harmoniqtechnology contact write send message'
    }
  ];

  // ── Category Icons (SVG) ─────────────────────────────────────
  const CATEGORY_ICONS = {
    Pages: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
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

  // ── Fuzzy Search ─────────────────────────────────────────────
  function searchEntries(query) {
    if (!query || query.trim().length === 0) return [];

    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const scored = [];

    for (const entry of SEARCH_INDEX) {
      const haystack = (entry.title + ' ' + entry.description + ' ' + entry.keywords).toLowerCase();
      let score = 0;
      let allMatch = true;

      for (const term of terms) {
        if (haystack.includes(term)) {
          // Title match is highest priority
          if (entry.title.toLowerCase().includes(term)) {
            score += 10;
          }
          // Description match
          if (entry.description.toLowerCase().includes(term)) {
            score += 5;
          }
          // Keyword match
          if (entry.keywords.toLowerCase().includes(term)) {
            score += 3;
          }
          // Exact word boundary match bonus
          const wordBoundary = new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
          if (wordBoundary.test(haystack)) {
            score += 2;
          }
        } else {
          allMatch = false;
        }
      }

      // All terms must match at least somewhere
      if (allMatch && score > 0) {
        scored.push({ entry, score });
      }
    }

    // Sort by score descending
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
          <kbd class="search-kbd-esc">ESC</kbd>
        </div>
        <div class="search-results" id="searchResults">
          <div class="search-empty-state" id="searchEmpty">
            <div class="search-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p>Start typing to search the site</p>
            <div class="search-hints">
              <span>Try: <button type="button" class="search-hint-btn" data-query="savings">savings</button></span>
              <span><button type="button" class="search-hint-btn" data-query="power factor">power factor</button></span>
              <span><button type="button" class="search-hint-btn" data-query="installation">installation</button></span>
              <span><button type="button" class="search-hint-btn" data-query="ESG">ESG</button></span>
            </div>
          </div>
          <div class="search-no-results" id="searchNoResults" style="display:none">
            <p>No results found</p>
            <span class="search-no-results-hint">Try different keywords or check your spelling</span>
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
    const categoryOrder = ['Pages', 'Sectors', 'Features', 'Articles', 'FAQ', 'Contact'];
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

    // Hint buttons
    overlay.querySelectorAll('.search-hint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.query;
        input.dispatchEvent(new Event('input'));
      });
    });
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
