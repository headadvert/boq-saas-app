(function () {
  function getCostSummary(result) {
    const currency = result.country.currency;
    const summary = [
      { label: "Direct Construction Cost", value: BOQUtils.formatCurrency(result.directCost, currency) },
      { label: "Material Cost", value: BOQUtils.formatCurrency(result.materialCost, currency) },
      { label: "Labor Cost", value: BOQUtils.formatCurrency(result.laborCost, currency) },
      { label: "Equipment Cost", value: BOQUtils.formatCurrency(result.equipmentCost, currency) },
      { label: "Overheads", value: BOQUtils.formatCurrency(result.overheads, currency) },
      { label: "Profit Margin", value: BOQUtils.formatCurrency(result.profit, currency) },
      { label: "Contingency", value: BOQUtils.formatCurrency(result.contingency, currency) },
      { label: "Cost per m2", value: BOQUtils.formatCurrency(result.costPerSqm, currency) },
      { label: "Estimated Total", value: BOQUtils.formatCurrency(result.totalCost, currency), emphasis: true }
    ];
    if (result.solarAllowance > 0) { summary.splice(7, 0, { label: "Solar Allowance", value: BOQUtils.formatCurrency(result.solarAllowance, currency) }); }
    return summary;
  }
  window.BOQCost = { getCostSummary };
})();
