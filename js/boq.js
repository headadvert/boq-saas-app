(function () {
  function getCountry(countryKey) { return BOQ_DATA.countries[countryKey] || BOQ_DATA.countries.saudi; }
  function getProjectType(projectTypeKey) { return BOQ_DATA.projectTypes[projectTypeKey] || BOQ_DATA.projectTypes.residential; }
  function getArea(input) {
    const footprint = input.rooms * input.length * input.width;
    const superArea = footprint * input.floors;
    const basementArea = footprint * input.basement * 0.9;
    return (superArea + basementArea) * (input.efficiency / 100);
  }
  function getDescription(scopeKey, countryKey, projectTypeKey) {
    const scope = BOQ_DATA.scopeLibrary[scopeKey];
    return scope.descriptions[projectTypeKey] || scope.descriptions[countryKey] || scope.descriptions.default;
  }
  function generateBoq(input, selectedScopes) {
    const country = getCountry(input.country);
    const projectType = getProjectType(input.projectType);
    const area = getArea(input) * projectType.areaFactor;
    const finishFactor = BOQ_DATA.finishFactors[input.finishLevel] || 1;
    const complexityFactor = Number(input.complexity || 1);
    const enabledScopes = selectedScopes.length ? selectedScopes : Object.keys(BOQ_DATA.scopeLibrary);
    const items = [];
    let directCost = 0;
    let itemNumber = 1;
    enabledScopes.forEach(function (scopeKey) {
      const scope = BOQ_DATA.scopeLibrary[scopeKey];
      const weight = projectType.scopeWeights[scopeKey] || 0.04;
      const scopeAdjustment = (projectType.scopeAdjustments && projectType.scopeAdjustments[scopeKey]) || 1;
      let quantity = scope.qtyFormula === "area" ? area * scope.baseQty * scopeAdjustment : 1 * scopeAdjustment;
      let rate = scope.qtyFormula === "commercial" ? directCost * scope.baseRateFactor * scopeAdjustment : (country.baseRate * weight * complexityFactor * finishFactor * projectType.finishFactor) / Math.max(quantity, 1);
      let amount = scope.qtyFormula === "commercial" ? directCost * scope.baseRateFactor * scopeAdjustment : quantity * rate;
      if (scopeKey !== "commercial") { directCost += amount; }
      items.push({ itemNumber: itemNumber++, scopeKey: scopeKey, scopeName: scope.name, description: getDescription(scopeKey, input.country, input.projectType), unit: scope.unit, quantity: quantity, rate: rate, amount: amount });
    });
    const materialCost = directCost * 0.52;
    const laborCost = directCost * 0.24;
    const equipmentCost = directCost * 0.09;
    const overheads = directCost * 0.07;
    const profit = directCost * 0.08;
    const contingency = directCost * 0.05;
    const solarAllowance = enabledScopes.indexOf("solar") >= 0 ? directCost * 0.015 : 0;
    const totalCost = directCost + overheads + profit + contingency + solarAllowance;
    const qf = projectType.quantityFactors;
    const takeoff = { cement: Math.round(area * qf.concrete * 7.2), steel: Math.round(area * qf.steel), blocks: Math.round(area * qf.blocks), tiles: Math.round(area * qf.tiles) };
    const roiYears = enabledScopes.indexOf("solar") >= 0 ? Math.max(3, Math.round((directCost * 0.015) / Math.max(area * 14, 1))) : null;
    return { mode: input.mode, country: country, projectType: projectType, area: area, items: items, directCost: directCost, totalCost: totalCost, materialCost: materialCost, laborCost: laborCost, equipmentCost: equipmentCost, overheads: overheads, profit: profit, contingency: contingency, solarAllowance: solarAllowance, takeoff: takeoff, roiYears: roiYears, costPerSqm: totalCost / Math.max(area, 1), notes: ["Standard applied: " + country.standard, "Output terminology: " + country.terminology, "Project type logic: " + projectType.complexityNote, "Commercial allowances include overhead, profit, and contingency."] };
  }
  window.BOQEngine = { getArea, generateBoq };
})();
