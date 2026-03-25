(function () {
  function getRoomArea(room) {
    return Number(room.qty || 0) * Number(room.length || 0) * Number(room.width || 0);
  }
  function getProgramArea(rooms) {
    return rooms.reduce(function (sum, room) { return sum + getRoomArea(room); }, 0);
  }
  function getGrossArea(input, rooms) {
    const programArea = getProgramArea(rooms);
    const grossBeforeBasement = programArea * Number(input.floors || 0);
    const basementArea = programArea * Number(input.basement || 0) * 0.85;
    return (grossBeforeBasement + basementArea) / Math.max((Number(input.efficiency || 1) / 100), 0.55);
  }
  function quantityForScope(scope, grossArea, projectType) {
    if (scope.qtyMode === "area") { return grossArea * scope.baseQty; }
    if (scope.qtyMode === "percentage") { return 1; }
    return scope.baseQty;
  }
  function generateBoq(input, rooms, selectedScopes) {
    const country = BOQ_DATA.countries[input.country];
    const projectType = BOQ_DATA.projectTypes[input.projectType];
    const finishFactor = BOQ_DATA.finishFactors[input.finishLevel] || 1;
    const complexityFactor = Number(input.complexity || 1);
    const programArea = getProgramArea(rooms);
    const grossArea = getGrossArea(input, rooms);
    const benchmarkRate = BOQ_DATA.benchmarkRates[input.country][projectType.benchmarkKey];
    const benchmarkDirectCost = grossArea * benchmarkRate * finishFactor * complexityFactor;
    const activeScopes = selectedScopes.length ? selectedScopes : Object.keys(BOQ_DATA.scopeLibrary);
    const items = [];
    let subtotal = 0;
    activeScopes.forEach(function (scopeKey, index) {
      const scope = BOQ_DATA.scopeLibrary[scopeKey];
      const weight = projectType.scopeWeights[scopeKey] || 0;
      const quantity = quantityForScope(scope, grossArea, projectType);
      let amount;
      if (scopeKey === "preliminaries") {
        amount = benchmarkDirectCost * country.prelimPct;
      } else if (scopeKey === "commercial") {
        amount = benchmarkDirectCost * (country.profitPct + country.contingencyPct);
      } else {
        amount = benchmarkDirectCost * weight;
        subtotal += amount;
      }
      const rate = quantity > 0 ? amount / quantity : amount;
      items.push({ itemNumber: index + 1, scopeKey: scopeKey, scopeName: scope.name, description: scope.descriptions[input.projectType] || scope.descriptions[input.country] || scope.descriptions.default, unit: scope.unit, quantity: quantity, rate: rate, amount: amount });
    });
    const preliminaries = benchmarkDirectCost * country.prelimPct;
    const profit = benchmarkDirectCost * country.profitPct;
    const contingency = benchmarkDirectCost * country.contingencyPct;
    const totalCost = subtotal + preliminaries + profit + contingency;
    const materialCost = subtotal * 0.56;
    const laborCost = subtotal * 0.25;
    const equipmentCost = subtotal * 0.11;
    const qf = projectType.quantityFactors;
    const takeoff = { cement: Math.round(grossArea * qf.concrete * 7.1), steel: Math.round(grossArea * qf.steel), blocks: Math.round(grossArea * qf.blocks), tiles: Math.round(grossArea * qf.tiles) };
    const roiYears = activeScopes.indexOf("solar") >= 0 ? Math.max(3, Math.round((benchmarkDirectCost * 0.02) / Math.max(grossArea * 18, 1))) : null;
    return {
      mode: input.mode,
      country: country,
      projectType: projectType,
      programArea: programArea,
      area: grossArea,
      items: items,
      subtotal: subtotal,
      totalCost: totalCost,
      materialCost: materialCost,
      laborCost: laborCost,
      equipmentCost: equipmentCost,
      preliminaries: preliminaries,
      profit: profit,
      contingency: contingency,
      takeoff: takeoff,
      roiYears: roiYears,
      costPerSqm: totalCost / Math.max(grossArea, 1),
      benchmarkRate: benchmarkRate,
      benchmarkSource: BOQ_DATA.sources[input.country],
      notes: [
        "Selected standard: " + country.standard,
        "Benchmark direct cost basis: " + BOQUtils.formatCurrency(benchmarkRate, country.currency) + " per m2 before room and complexity adjustments.",
        "Project-type logic: " + projectType.typeNote,
        "Room schedule drives program area before grossing-up.",
        "Commercial allowances include preliminaries, profit, and contingency."
      ]
    };
  }
  window.BOQEngine = { getRoomArea, getProgramArea, getGrossArea, generateBoq };
})();
