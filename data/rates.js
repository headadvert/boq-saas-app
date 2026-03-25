window.BOQ_DATA = {
  company: {
    name: "Al Qaswaa Al Sharqia Trading Est",
    contactPerson: "Imran Khoje",
    position: "Business Development Manager",
    phone1: "+966511759092",
    phone2: "+966573524746",
    email: "info@qaswasharqia.com",
    cr: "7043569552",
    vat: "302125297400003",
    experienceNote: "Supported by a commercial and execution-focused team that can assist with procurement coordination, contractor engagement, project delivery support, and construction execution alignment."
  },
  countries: {
    saudi: { label: "Saudi Arabia", standard: "SBC", currency: "SAR", benchmark: { residential: 7000, apartments: 8500, commercial: 9000, mixed_use: 9500, industrial: 8000, hospitality: 12000, healthcare: 11500 }, prelimPct: 0.1, profitPct: 0.1, contingencyPct: 0.05 },
    uae: { label: "UAE", standard: "Dubai Municipality", currency: "AED", benchmark: { residential: 5200, apartments: 5500, commercial: 6100, mixed_use: 6400, industrial: 4000, hospitality: 7000, healthcare: 7200 }, prelimPct: 0.12, profitPct: 0.1, contingencyPct: 0.05 },
    uk: { label: "UK", standard: "NRM", currency: "GBP", benchmark: { residential: 3200, apartments: 3800, commercial: 4300, mixed_use: 4200, industrial: 2500, hospitality: 4500, healthcare: 5000 }, prelimPct: 0.12, profitPct: 0.095, contingencyPct: 0.05 },
    usa: { label: "USA", standard: "CSI MasterFormat", currency: "USD", benchmark: { residential: 2400, apartments: 2800, commercial: 3000, mixed_use: 3200, industrial: 1700, hospitality: 3800, healthcare: 4200 }, prelimPct: 0.11, profitPct: 0.095, contingencyPct: 0.05 },
    india: { label: "India", standard: "CPWD / IS Codes", currency: "INR", benchmark: { residential: 24000, apartments: 28000, commercial: 32000, mixed_use: 34000, industrial: 18000, hospitality: 36000, healthcare: 42000 }, prelimPct: 0.1, profitPct: 0.09, contingencyPct: 0.05 },
    australia: { label: "Australia", standard: "Australian Standards", currency: "AUD", benchmark: { residential: 3200, apartments: 3800, commercial: 4800, mixed_use: 4600, industrial: 2600, hospitality: 5200, healthcare: 6200 }, prelimPct: 0.125, profitPct: 0.105, contingencyPct: 0.05 }
  },
  projectTypes: {
    residential: { label: "Residential (Villas)", note: "Villa logic prioritizes higher finishes, openings, and external works with moderate MEP density.", roomTemplate: [{ name: "Living Room", qty: 1, length: 6, width: 5, height: 3.2 }, { name: "Bedroom", qty: 3, length: 4.5, width: 4, height: 3.2 }, { name: "Kitchen", qty: 1, length: 4, width: 3.5, height: 3.2 }, { name: "Bathroom", qty: 3, length: 2.4, width: 2, height: 3 }, { name: "Corridor", qty: 1, length: 6, width: 2, height: 3.2 }], scopeWeights: { preconstruction: 0.04, substructure: 0.08, superstructure: 0.13, masonry: 0.08, finishes: 0.16, openings: 0.07, facade: 0.05, external: 0.07, mep: 0.11, industrial: 0.005, solar: 0.03, fitout: 0.065, preliminaries: 0.055, commercial: 0.06 }, quantityFactors: { concrete: 0.31, steel: 42, blocks: 14, tiles: 1.08, cable: 8, pipe: 3.4, duct: 0.45 } },
    apartments: { label: "Apartments (Low / High Rise)", note: "Apartment logic raises structure, facade, and vertical MEP intensity while keeping room repetition efficient.", roomTemplate: [{ name: "Apartment Unit", qty: 4, length: 10, width: 8, height: 3.1 }, { name: "Corridor", qty: 1, length: 18, width: 2.2, height: 3.1 }, { name: "Service Room", qty: 1, length: 4, width: 3, height: 3.1 }], scopeWeights: { preconstruction: 0.035, substructure: 0.09, superstructure: 0.17, masonry: 0.08, finishes: 0.12, openings: 0.05, facade: 0.07, external: 0.04, mep: 0.14, industrial: 0.005, solar: 0.02, fitout: 0.045, preliminaries: 0.05, commercial: 0.055 }, quantityFactors: { concrete: 0.39, steel: 55, blocks: 17, tiles: 1.01, cable: 9, pipe: 3.7, duct: 0.52 } },
    commercial: { label: "Commercial (Offices, Retail)", note: "Commercial logic increases MEP, facade, and fit-out flexibility with lower masonry dependency.", roomTemplate: [{ name: "Open Office", qty: 2, length: 12, width: 9, height: 3.6 }, { name: "Meeting Room", qty: 4, length: 5, width: 4, height: 3.4 }, { name: "Retail Zone", qty: 1, length: 14, width: 10, height: 4 }], scopeWeights: { preconstruction: 0.035, substructure: 0.08, superstructure: 0.15, masonry: 0.05, finishes: 0.09, openings: 0.05, facade: 0.09, external: 0.04, mep: 0.18, industrial: 0.01, solar: 0.02, fitout: 0.065, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.34, steel: 50, blocks: 10, tiles: 0.78, cable: 12, pipe: 2.8, duct: 0.72 } },
    mixed_use: { label: "Mixed-Use Developments", note: "Mixed-use logic blends residential, commercial, podium, and public circulation cost layers.", roomTemplate: [{ name: "Retail Unit", qty: 2, length: 10, width: 8, height: 4 }, { name: "Residential Unit", qty: 4, length: 9, width: 8, height: 3.2 }, { name: "Lobby", qty: 1, length: 10, width: 6, height: 4 }], scopeWeights: { preconstruction: 0.04, substructure: 0.09, superstructure: 0.16, masonry: 0.06, finishes: 0.11, openings: 0.05, facade: 0.08, external: 0.05, mep: 0.17, industrial: 0.01, solar: 0.02, fitout: 0.055, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.4, steel: 58, blocks: 14, tiles: 0.94, cable: 11, pipe: 3.3, duct: 0.64 } },
    industrial: { label: "Industrial (Warehouses, Factories)", note: "Industrial logic prioritizes steel, slab loading, process areas, yards, and specialist infrastructure.", roomTemplate: [{ name: "Warehouse Bay", qty: 1, length: 30, width: 20, height: 8 }, { name: "Office Block", qty: 1, length: 12, width: 8, height: 3.6 }, { name: "Service Room", qty: 2, length: 5, width: 4, height: 3.6 }], scopeWeights: { preconstruction: 0.05, substructure: 0.11, superstructure: 0.12, masonry: 0.03, finishes: 0.04, openings: 0.04, facade: 0.05, external: 0.09, mep: 0.11, industrial: 0.19, solar: 0.03, fitout: 0.015, preliminaries: 0.065, commercial: 0.075 }, quantityFactors: { concrete: 0.26, steel: 70, blocks: 6, tiles: 0.24, cable: 7, pipe: 2.2, duct: 0.22 } },
    hospitality: { label: "Hospitality (Hotels)", note: "Hospitality logic prioritizes guestrooms, premium finishes, hot water systems, and public areas.", roomTemplate: [{ name: "Guest Room", qty: 8, length: 6, width: 4.5, height: 3.2 }, { name: "Corridor", qty: 1, length: 24, width: 2.2, height: 3.2 }, { name: "Service Area", qty: 2, length: 5, width: 4, height: 3.2 }], scopeWeights: { preconstruction: 0.035, substructure: 0.08, superstructure: 0.14, masonry: 0.06, finishes: 0.16, openings: 0.05, facade: 0.07, external: 0.04, mep: 0.17, industrial: 0.005, solar: 0.02, fitout: 0.075, preliminaries: 0.05, commercial: 0.065 }, quantityFactors: { concrete: 0.35, steel: 52, blocks: 15, tiles: 1.12, cable: 10, pipe: 4.5, duct: 0.75 } },
    healthcare: { label: "Healthcare (Clinics, Hospitals)", note: "Healthcare logic raises MEP, specialist rooms, filtration, medical gas, and compliance allowances.", roomTemplate: [{ name: "Consultation Room", qty: 6, length: 5, width: 4, height: 3.4 }, { name: "Treatment Room", qty: 4, length: 6, width: 5, height: 3.4 }, { name: "Nurse Station", qty: 1, length: 7, width: 5, height: 3.4 }], scopeWeights: { preconstruction: 0.04, substructure: 0.08, superstructure: 0.14, masonry: 0.05, finishes: 0.11, openings: 0.05, facade: 0.06, external: 0.04, mep: 0.22, industrial: 0.01, solar: 0.01, fitout: 0.08, preliminaries: 0.055, commercial: 0.065 }, quantityFactors: { concrete: 0.37, steel: 54, blocks: 13, tiles: 0.96, cable: 13, pipe: 4.2, duct: 0.88 } }
  },
  finishFactors: { economy: 0.88, standard: 1, premium: 1.18 },
  scopeLibrary: {
    preconstruction: { name: "Pre-construction", unit: "item", qtyMode: "lump", baseQty: 1, description: "Site clearance, surveying, excavation, backfilling" },
    substructure: { name: "Substructure", unit: "m3", qtyMode: "area", baseQty: 0.18, description: "Foundations, footings, waterproofing, retaining works" },
    superstructure: { name: "Superstructure", unit: "m3", qtyMode: "area", baseQty: 0.22, description: "RCC or steel frame, slabs, columns, beams, formwork" },
    masonry: { name: "Masonry", unit: "m2", qtyMode: "area", baseQty: 1.35, description: "Blockwork, brickwork, and internal partitions" },
    finishes: { name: "Finishes", unit: "m2", qtyMode: "area", baseQty: 2.1, description: "Plaster, paint, tiling, marble, screeds, decorative finishes" },
    openings: { name: "Doors & Windows", unit: "nr", qtyMode: "area", baseQty: 0.07, description: "Aluminum, glass, joinery, doors, hardware" },
    facade: { name: "Facade", unit: "m2", qtyMode: "area", baseQty: 0.48, description: "Curtain wall, cladding, insulation, external envelope" },
    external: { name: "External Works", unit: "m2", qtyMode: "area", baseQty: 0.42, description: "Roads, drainage, paving, utility tie-ins, landscaping" },
    mep: { name: "MEP", unit: "m2", qtyMode: "area", baseQty: 1, description: "Electrical, plumbing, HVAC, firefighting, ELV, testing" },
    industrial: { name: "Industrial Systems", unit: "item", qtyMode: "lump", baseQty: 1, description: "PEB, heavy foundations, process slabs, specialist systems" },
    solar: { name: "Solar Systems", unit: "kWp", qtyMode: "area", baseQty: 0.02, description: "Panels, inverters, supports, cabling, solar works" },
    fitout: { name: "Interior Fit-out", unit: "m2", qtyMode: "area", baseQty: 0.7, description: "Ceilings, partitions, flooring, specialist fit-out" },
    preliminaries: { name: "Preliminaries", unit: "%", qtyMode: "percentage", baseQty: 1, description: "Site setup, temporary works, HSE, mobilization, QAQC" },
    commercial: { name: "Commercial", unit: "%", qtyMode: "percentage", baseQty: 1, description: "Overheads, profit margin, contingency, risk allowance" }
  },
  accessCodes: {
    "ALQ-UNLOCK-365": { label: "Annual Access", unlimited: true },
    "QASWA-PRO-2026": { label: "Professional Access", unlimited: true }
  }
};
