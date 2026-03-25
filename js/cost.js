(function () {
  function getCostSummary(result) {
    const currency = result.country.currency;
    return [
      { label: "Trade Package Subtotal", value: BOQUtils.formatCurrency(result.tradeSubtotal, currency) },
      { label: "Preliminaries", value: BOQUtils.formatCurrency(result.preliminaries, currency) },
      { label: "Profit Margin", value: BOQUtils.formatCurrency(result.profit, currency) },
      { label: "Contingency", value: BOQUtils.formatCurrency(result.contingency, currency) },
      { label: "Benchmark Rate / m2", value: BOQUtils.formatCurrency(result.benchmarkRate, currency) },
      { label: "Cost / m2", value: BOQUtils.formatCurrency(result.costPerSqm, currency) },
      { label: "Estimated Total", value: BOQUtils.formatCurrency(result.totalCost, currency), emphasis: true }
    ];
  }
  window.BOQCost = { getCostSummary };
})();
