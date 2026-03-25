(function () {
  function exportReport(payload) {
    const win = window.open("", "_blank", "width=1080,height=780");
    if (!win) { return; }
    const currency = payload.result.country.currency;
    const tableRows = payload.result.items.map(function (item) {
      return "<tr><td>" + item.itemNumber + "</td><td>" + item.scopeName + "<br><small>" + item.description + "</small></td><td>" + item.unit + "</td><td>" + BOQUtils.formatNumber(item.quantity, 2) + "</td><td>" + BOQUtils.formatCurrency(item.rate, currency) + "</td><td>" + BOQUtils.formatCurrency(item.amount, currency) + "</td></tr>";
    }).join("");
    const summaryRows = BOQCost.getCostSummary(payload.result).map(function (row) { return "<tr" + (row.emphasis ? " style='font-weight:700;color:#0B1F3A;'" : "") + "><td>" + row.label + "</td><td style='text-align:right;'>" + row.value + "</td></tr>"; }).join("");
    win.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>BOQ Report</title><style>body{font-family:Roboto,Arial,sans-serif;margin:32px;color:#0B1F3A;}h1,h2,h3{font-family:Inter,Arial,sans-serif;margin:0 0 10px;}table{width:100%;border-collapse:collapse;font-size:12px;}th,td{border:1px solid #d9e1ea;padding:10px;vertical-align:top;}th{background:#0B1F3A;color:#fff;}small{color:#526375;} .hero{border:2px solid #0B1F3A;padding:24px;margin-bottom:24px;} .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0 24px;} .meta div{background:#f7f9fc;border:1px solid #d9e1ea;padding:12px;} .cta{margin-top:28px;background:#0B1F3A;color:#fff;padding:24px;} .cta p{margin:6px 0;} .summary{margin-top:20px;width:420px;margin-left:auto;}</style></head><body>");
    win.document.write("<div class='hero'><h1>BOQ Pro Construction Estimate</h1><p>Project summary, BOQ table, and commercial cost profile</p><h2>" + payload.projectName + "</h2></div>");
    win.document.write("<div class='meta'><div><strong>Mode</strong><br>" + payload.mode.toUpperCase() + "</div><div><strong>Project Type</strong><br>" + payload.result.projectType.label + "</div><div><strong>Country Standard</strong><br>" + payload.result.country.standard + "</div><div><strong>Gross Floor Area</strong><br>" + BOQUtils.formatNumber(payload.result.area, 0) + " m2</div></div>");
    win.document.write("<h3>BOQ Table</h3><table><thead><tr><th>#</th><th>Description</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>" + tableRows + "</tbody></table>");
    win.document.write("<table class='summary'>" + summaryRows + "</table>");
    win.document.write("<div class='cta'><h3>Looking to build this project?</h3><p>We do not just estimate - we deliver.</p><p>Al Qaswaa Al Sharqia Trading EST</p><p>+966 51 175 9092</p><p>+966 57 352 4746</p><p>info@qaswasharqia.com</p><p>qaswasharqia@gmail.com</p><p>Send us this BOQ file for execution support.</p></div>");
    win.document.write("</body></html>");
    win.document.close();
    setTimeout(function () { win.print(); }, 500);
  }
  window.BOQPdf = { exportReport };
})();
