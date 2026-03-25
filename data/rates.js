window.BOQ_DATA = {
  sources: {
    saudi: "Turner & Townsend KSAMI 2025 construction cost performance",
    uae: "Turner & Townsend UAEMI 2025 construction cost performance",
    uk: "Turner & Townsend GCMI 2025 UK and methodology pages",
    usa: "Turner & Townsend USMI 2025 and LVMI 2025 benchmarking",
    india: "Calibrated CPWD or IS benchmark model using 2025 market-aligned residential and institutional ranges",
    australia: "Calibrated ANZ 2025 benchmark model using Turner & Townsend ANZ market intelligence and inflation outlook"
  },
  countries: {
    saudi: { label: "Saudi Arabia", standard: "SBC", currency: "SAR", symbol: "SAR", prelimPct: 0.1, profitPct: 0.1, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 3112 },
    uae: { label: "UAE", standard: "Dubai Municipality", currency: "AED", symbol: "AED", prelimPct: 0.12, profitPct: 0.1, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 1899 },
    uk: { label: "UK", standard: "NRM", currency: "GBP", symbol: "GBP", prelimPct: 0.12, profitPct: 0.095, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 5385 },
    usa: { label: "USA", standard: "CSI MasterFormat", currency: "USD", symbol: "USD", prelimPct: 0.11, profitPct: 0.095, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 3200 },
    india: { label: "India", standard: "CPWD / IS Codes", currency: "INR", symbol: "INR", prelimPct: 0.1, profitPct: 0.09, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 325 },
    australia: { label: "Australia", standard: "Australian Standards", currency: "AUD", symbol: "AUD", prelimPct: 0.125, profitPct: 0.105, contingencyPct: 0.05, benchmarkAverageUsdPerSqm: 2600 }
  },
  projectTypes: {
    residential: { label: "Residential (Villas)", benchmarkKey: "villa", scopeWeights: { preconstruction: 0.035, substructure: 0.08, superstructure: 0.13, masonry: 0.08, finishes: 0.16, openings: 0.07, facade: 0.05, external: 0.07, mep: 0.11, industrial: 0.005, solar: 0.03, fitout: 0.065, preliminaries: 0.055, commercial: 0.06 }, quantityFactors: { concrete: 0.31, steel: 42, blocks: 14, tiles: 1.08 }, typeNote: "Villa logic applies stronger finishes and openings allowances with lower industrial systems intensity." },
    apartments: { label: "Apartments (Low / High Rise)", benchmarkKey: "apartments", scopeWeights: { preconstruction: 0.035, substructure: 0.09, superstructure: 0.17, masonry: 0.08, finishes: 0.12, openings: 0.05, facade: 0.07, external: 0.04, mep: 0.14, industrial: 0.005, solar: 0.02, fitout: 0.045, preliminaries: 0.05, commercial: 0.055 }, quantityFactors: { concrete: 0.39, steel: 55, blocks: 17, tiles: 1.01 }, typeNote: "Apartment logic raises structure, facade, and vertical MEP intensity while moderating external works per square meter." },
    commercial: { label: "Commercial (Offices, Retail)", benchmarkKey: "commercial", scopeWeights: { preconstruction: 0.035, substructure: 0.08, superstructure: 0.15, masonry: 0.05, finishes: 0.09, openings: 0.05, facade: 0.09, external: 0.04, mep: 0.18, industrial: 0.01, solar: 0.02, fitout: 0.065, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.34, steel: 50, blocks: 10, tiles: 0.78 }, typeNote: "Commercial logic lifts HVAC, fire alarm, electrical and facade values with leaner masonry density." },
    mixed_use: { label: "Mixed-Use Developments", benchmarkKey: "mixed_use", scopeWeights: { preconstruction: 0.04, substructure: 0.09, superstructure: 0.16, masonry: 0.06, finishes: 0.11, openings: 0.05, facade: 0.08, external: 0.05, mep: 0.17, industrial: 0.01, solar: 0.02, fitout: 0.055, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.4, steel: 58, blocks: 14, tiles: 0.94 }, typeNote: "Mixed-use logic blends commercial podium, residential stacks, and public circulation cost layers." },
    industrial: { label: "Industrial (Warehouses, Factories)", benchmarkKey: "industrial", scopeWeights: { preconstruction: 0.05, substructure: 0.11, superstructure: 0.12, masonry: 0.03, finishes: 0.04, openings: 0.04, facade: 0.05, external: 0.09, mep: 0.11, industrial: 0.19, solar: 0.03, fitout: 0.015, preliminaries: 0.065, commercial: 0.075 }, quantityFactors: { concrete: 0.26, steel: 70, blocks: 6, tiles: 0.24 }, typeNote: "Industrial logic emphasizes steel, slab loading, yards, utility reticulation, and process-ready infrastructure." },
    hospitality: { label: "Hospitality (Hotels)", benchmarkKey: "hospitality", scopeWeights: { preconstruction: 0.035, substructure: 0.08, superstructure: 0.14, masonry: 0.06, finishes: 0.16, openings: 0.05, facade: 0.07, external: 0.04, mep: 0.17, industrial: 0.005, solar: 0.02, fitout: 0.075, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.35, steel: 52, blocks: 15, tiles: 1.12 }, typeNote: "Hospitality logic prioritizes guestrooms, public-area finishes, hot water, HVAC, and life-safety systems." },
    healthcare: { label: "Healthcare (Clinics, Hospitals)", benchmarkKey: "healthcare", scopeWeights: { preconstruction: 0.04, substructure: 0.08, superstructure: 0.14, masonry: 0.05, finishes: 0.11, openings: 0.05, facade: 0.06, external: 0.04, mep: 0.22, industrial: 0.01, solar: 0.01, fitout: 0.08, preliminaries: 0.055, commercial: 0.065 }, quantityFactors: { concrete: 0.37, steel: 54, blocks: 13, tiles: 0.96 }, typeNote: "Healthcare logic raises MEP, specialist rooms, filtration, medical gas, resilient finishes, and compliance allowances." }
  },
  benchmarkRates: {
    saudi: { villa: 7000, apartments: 8500, commercial: 9000, mixed_use: 9500, industrial: 8000, hospitality: 12000, healthcare: 11500 },
    uae: { villa: 5200, apartments: 5500, commercial: 6100, mixed_use: 6400, industrial: 4000, hospitality: 7000, healthcare: 7200 },
    uk: { villa: 3200, apartments: 3800, commercial: 4300, mixed_use: 4200, industrial: 2500, hospitality: 4500, healthcare: 5000 },
    usa: { villa: 2400, apartments: 2800, commercial: 3000, mixed_use: 3200, industrial: 1700, hospitality: 3800, healthcare: 4200 },
    india: { villa: 24000, apartments: 28000, commercial: 32000, mixed_use: 34000, industrial: 18000, hospitality: 36000, healthcare: 42000 },
    australia: { villa: 3200, apartments: 3800, commercial: 4800, mixed_use: 4600, industrial: 2600, hospitality: 5200, healthcare: 6200 }
  },
  finishFactors: { economy: 0.88, standard: 1, premium: 1.18 },
  roomTemplates: [
    { name: "Living Room", length: 6, width: 5, height: 3.2, qty: 1 },
    { name: "Bedroom", length: 4.5, width: 4, height: 3.2, qty: 3 },
    { name: "Kitchen", length: 4.2, width: 3.5, height: 3.2, qty: 1 },
    { name: "Bathroom", length: 2.4, width: 2, height: 3, qty: 3 },
    { name: "Corridor", length: 8, width: 2.2, height: 3.2, qty: 1 }
  ],
  scopeLibrary: {
    preconstruction: { name: "Pre-construction", unit: "item", qtyMode: "lump", baseQty: 1, descriptions: { default: "Site clearance, surveying, excavation, and backfilling" } },
    substructure: { name: "Substructure", unit: "m3", qtyMode: "area", baseQty: 0.18, descriptions: { default: "Foundations, footings, retaining walls, and waterproofing" } },
    superstructure: { name: "Superstructure", unit: "m3", qtyMode: "area", baseQty: 0.22, descriptions: { default: "RCC or steel frame, slabs, beams, columns, and formwork" } },
    masonry: { name: "Masonry", unit: "m2", qtyMode: "area", baseQty: 1.35, descriptions: { default: "Blockwork, brickwork, and internal partitions" } },
    finishes: { name: "Finishes", unit: "m2", qtyMode: "area", baseQty: 2.1, descriptions: { default: "Plaster, paint, tiling, marble, screeds, and decorative finishes" } },
    openings: { name: "Doors & Windows", unit: "nr", qtyMode: "area", baseQty: 0.07, descriptions: { default: "Aluminum, glass, timber joinery, doors, and hardware" } },
    facade: { name: "Facade", unit: "m2", qtyMode: "area", baseQty: 0.48, descriptions: { default: "Curtain wall, cladding, insulation, and external envelope systems" } },
    external: { name: "External Works", unit: "m2", qtyMode: "area", baseQty: 0.42, descriptions: { default: "Roads, drainage, paving, utility tie-ins, and landscaping" } },
    mep: { name: "MEP", unit: "m2", qtyMode: "area", baseQty: 1, descriptions: { default: "Electrical, plumbing, HVAC, firefighting, ELV, and testing" } },
    industrial: { name: "Industrial Systems", unit: "item", qtyMode: "lump", baseQty: 1, descriptions: { default: "PEB structures, heavy foundations, process slabs, and specialist services" } },
    solar: { name: "Solar Systems", unit: "kWp", qtyMode: "area", baseQty: 0.02, descriptions: { default: "Panels, inverters, supports, cabling, and energy systems" } },
    fitout: { name: "Interior Fit-out", unit: "m2", qtyMode: "area", baseQty: 0.7, descriptions: { default: "Ceilings, partitions, specialist flooring, and internal fit-out" } },
    preliminaries: { name: "Preliminaries", unit: "%", qtyMode: "percentage", baseQty: 1, descriptions: { default: "Mobilization, site setup, temporary works, safety, and QA/QC" } },
    commercial: { name: "Commercial", unit: "%", qtyMode: "percentage", baseQty: 1, descriptions: { default: "Overheads, profit margin, risk, and contingency" } }
  },
  accessCodes: {
    "ALQ-UNLOCK-365": { label: "Annual Access", unlimited: true },
    "QASWA-PRO-2026": { label: "Professional Access", unlimited: true }
  },
  company: {
    name: "Al Qaswaa Al Sharqia Trading EST",
    phone1: "+966 51 175 9092",
    phone2: "+966 57 352 4746",
    email1: "info@qaswasharqia.com",
    email2: "qaswasharqia@gmail.com"
  }
};
