(function () {
  function getCostSummary(result) {
    const currency = result.country.currency;
    const summary = [
      { label: "Trade Package Subtotal", value: BOQUtils.formatCurrency(result.subtotal, currency) },
      { label: "Material Cost", value: BOQUtils.formatCurrency(result.materialCost, currency) },
      { label: "Labor Cost", value: BOQUtils.formatCurrency(result.laborCost, currency) },
      { label: "Equipment Cost", value: BOQUtils.formatCurrency(result.equipmentCost, currency) },
      { label: "Preliminaries", value: BOQUtils.formatCurrency(result.preliminaries, currency) },
      { label: "Profit Margin", value: BOQUtils.formatCurrency(result.profit, currency) },
      { label: "Contingency", value: BOQUtils.formatCurrency(result.contingency, currency) },
      { label: "Benchmark Rate / m2", value: BOQUtils.formatCurrency(result.benchmarkRate, currency) },
      { label: "Estimated Total", value: BOQUtils.formatCurrency(result.totalCost, currency), emphasis: true }
    ];
    if (result.roiYears) {
      summary.splice(8, 0, { label: "Solar ROI", value: result.roiYears + " years" });
    }
    return summary;
  }
  window.BOQCost = { getCostSummary };
})();
