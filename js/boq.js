(function () {
  function getRoomArea(room) { return Number(room.qty || 0) * Number(room.length || 0) * Number(room.width || 0); }
  function getFloorArea(floor) { return floor.rooms.reduce(function (sum, room) { return sum + getRoomArea(room); }, 0); }
  function getProgramArea(floors) { return floors.reduce(function (sum, floor) { return sum + getFloorArea(floor); }, 0); }
  function getGrossArea(input, floors) {
    const programArea = getProgramArea(floors);
    const floorsFactor = Math.max(Number(input.floors || 1), 1);
    const basementArea = programArea * Number(input.basement || 0) * 0.4;
    return ((programArea * floorsFactor) + basementArea) / Math.max(Number(input.efficiency || 82) / 100, 0.55);
  }
  function getQuantity(scope, grossArea) {
    if (scope.qtyMode === "area") { return grossArea * scope.baseQty; }
    if (scope.qtyMode === "percentage") { return 1; }
    return scope.baseQty;
  }
  function generateBoq(input, floors, selectedScopes) {
    const country = BOQ_DATA.countries[input.country];
    const type = BOQ_DATA.projectTypes[input.projectType];
    const grossArea = getGrossArea(input, floors);
    const programArea = getProgramArea(floors);
    const benchmarkRate = country.benchmark[input.projectType];
    const finishFactor = BOQ_DATA.finishFactors[input.finishLevel] || 1;
    const complexityFactor = Number(input.complexity || 1);
    const baseTradeCost = grossArea * benchmarkRate * finishFactor * complexityFactor;
    const items = [];
    let tradeSubtotal = 0;
    selectedScopes.forEach(function (scopeKey, index) {
      const scope = BOQ_DATA.scopeLibrary[scopeKey];
      const weight = type.scopeWeights[scopeKey] || 0;
      let amount = baseTradeCost * weight;
      if (scopeKey === "preliminaries") { amount = baseTradeCost * country.prelimPct; }
      if (scopeKey === "commercial") { amount = baseTradeCost * (country.profitPct + country.contingencyPct); }
      if (scopeKey !== "preliminaries" && scopeKey !== "commercial") { tradeSubtotal += amount; }
      const quantity = getQuantity(scope, grossArea);
      const rate = quantity > 0 ? amount / quantity : amount;
      items.push({ itemNumber: index + 1, scopeKey: scopeKey, scopeName: scope.name, description: scope.description, unit: scope.unit, quantity: quantity, rate: rate, amount: amount });
    });
    const preliminaries = selectedScopes.indexOf("preliminaries") >= 0 ? baseTradeCost * country.prelimPct : 0;
    const profit = selectedScopes.indexOf("commercial") >= 0 ? baseTradeCost * country.profitPct : 0;
    const contingency = selectedScopes.indexOf("commercial") >= 0 ? baseTradeCost * country.contingencyPct : 0;
    const totalCost = tradeSubtotal + preliminaries + profit + contingency;
    const qf = type.quantityFactors;
    const takeoff = [
      { name: "Cement Bags", qty: Math.round(grossArea * qf.concrete * 7.2), unit: "bags", scope: "substructure / superstructure" },
      { name: "Reinforcement Steel", qty: Math.round(grossArea * qf.steel), unit: "kg", scope: "substructure / superstructure" },
      { name: "Blocks", qty: Math.round(grossArea * qf.blocks), unit: "nos", scope: "masonry" },
      { name: "Tiles and Floor Finish", qty: Math.round(grossArea * qf.tiles), unit: "m2", scope: "finishes" },
      { name: "Electrical Cabling", qty: Math.round(grossArea * qf.cable), unit: "m", scope: "MEP" },
      { name: "Piping Network", qty: Math.round(grossArea * qf.pipe), unit: "m", scope: "MEP" },
      { name: "HVAC Ducting", qty: Math.round(grossArea * qf.duct), unit: "m2", scope: "MEP" }
    ].filter(function (item) {
      if (item.scope === "masonry") { return selectedScopes.indexOf("masonry") >= 0; }
      if (item.scope === "finishes") { return selectedScopes.indexOf("finishes") >= 0; }
      if (item.scope === "MEP") { return selectedScopes.indexOf("mep") >= 0; }
      return true;
    });
    return {
      mode: input.mode,
      country: country,
      projectType: type,
      grossArea: grossArea,
      programArea: programArea,
      items: items,
      tradeSubtotal: tradeSubtotal,
      preliminaries: preliminaries,
      profit: profit,
      contingency: contingency,
      totalCost: totalCost,
      benchmarkRate: benchmarkRate,
      costPerSqm: totalCost / Math.max(grossArea, 1),
      takeoff: takeoff,
      notes: [
        "Project type: " + type.label,
        "Country standard: " + country.standard,
        "Floor-wise room schedule used as the manual planning base.",
        "Deselected scopes are excluded from quantities, rates, and material takeoff.",
        "Benchmark rate basis: " + BOQUtils.formatCurrency(benchmarkRate, country.currency) + " per m2 before adjustments."
      ]
    };
  }
  window.BOQEngine = { getRoomArea, getFloorArea, getProgramArea, getGrossArea, generateBoq };
})();
