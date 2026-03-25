(function () {
  function exportReport(payload) {
    const company = BOQ_DATA.company;
    const result = payload.result;
    const win = window.open("", "_blank", "width=1100,height=780");
    if (!win) { return; }
    const rows = result.items.map(function (item) {
      return "<tr><td>" + item.itemNumber + "</td><td>" + item.scopeName + "</td><td>" + item.description + "</td><td>" + item.unit + "</td><td>" + BOQUtils.formatNumber(item.quantity, 2) + "</td><td>" + BOQUtils.formatCurrency(item.rate, result.country.currency) + "</td><td>" + BOQUtils.formatCurrency(item.amount, result.country.currency) + "</td></tr>";
    }).join("");
    const summaryRows = BOQCost.getCostSummary(result).map(function (row) {
      return "<tr" + (row.emphasis ? " style='font-weight:700;color:#0B1F3A;'" : "") + "><td>" + row.label + "</td><td style='text-align:right'>" + row.value + "</td></tr>";
    }).join("");
    const takeoffRows = result.takeoff.map(function (item) {
      return "<tr><td>" + item.scope + "</td><td>" + item.name + "</td><td>" + BOQUtils.formatNumber(item.qty, 0) + " " + item.unit + "</td></tr>";
    }).join("");
    win.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>BOQ Pro PDF</title><style>body{font-family:Roboto,Arial,sans-serif;color:#0B1F3A;margin:28px;}h1,h2,h3{font-family:Inter,Arial,sans-serif;margin:0 0 10px;}table{width:100%;border-collapse:collapse;font-size:12px;}th,td{border:1px solid #d6deea;padding:9px;vertical-align:top;}th{background:#0B1F3A;color:#fff;} .hero,.cta,.block{border:1px solid #d6deea;padding:20px;margin-bottom:20px;} .hero{border-top:4px solid #F59E0B;} .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0 20px;} .meta div{background:#f6f8fb;border:1px solid #d6deea;padding:12px;} .summary{width:420px;margin-left:auto;} .cta{background:#0B1F3A;color:#fff;border-color:#0B1F3A;} .cta p,.cta strong{color:#fff;} .small{font-size:11px;color:#5c6b80;}</style></head><body>");
    win.document.write("<div class='hero'><h1>Measured Bill of Quantities and Commercial Summary</h1><p>Project: <strong>" + payload.projectName + "</strong></p><p class='small'>Prepared in " + payload.mode.toUpperCase() + " mode under " + result.country.standard + " using a floor-wise schedule model.</p></div>");
    win.document.write("<div class='meta'><div><strong>Project Type</strong><br>" + result.projectType.label + "</div><div><strong>Country</strong><br>" + result.country.label + "</div><div><strong>Gross Floor Area</strong><br>" + BOQUtils.formatNumber(result.grossArea, 0) + " m2</div><div><strong>Program Area</strong><br>" + BOQUtils.formatNumber(result.programArea, 0) + " m2</div></div>");
    win.document.write("<div class='block'><h3>Measured Bill of Quantities</h3><table><thead><tr><th>#</th><th>Trade</th><th>Description</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>" + rows + "</tbody></table></div>");
    win.document.write("<div class='block'><h3>Commercial Summary</h3><table class='summary'>" + summaryRows + "</table></div>");
    win.document.write("<div class='block'><h3>Detailed Material Takeoff</h3><table><thead><tr><th>Scope</th><th>Material</th><th>Quantity</th></tr></thead><tbody>" + takeoffRows + "</tbody></table></div>");
    win.document.write("<div class='cta'><h3>Looking to build this project?</h3><p>We do not just estimate. We can help build this project for you through commercial support, procurement coordination, contractor engagement, and execution-focused delivery assistance.</p><p>" + company.experienceNote + "</p><p><strong>Company:</strong> " + company.name + "</p><p><strong>Contact Person:</strong> " + company.contactPerson + "</p><p><strong>Position:</strong> " + company.position + "</p><p><strong>Phone:</strong> " + company.phone1 + " / " + company.phone2 + "</p><p><strong>Email:</strong> " + company.email + "</p><p><strong>CR Number:</strong> " + company.cr + "</p><p><strong>VAT:</strong> " + company.vat + "</p></div>");
    win.document.write("</body></html>");
    win.document.close();
    setTimeout(function () { win.print(); }, 500);
  }
  window.BOQPdf = { exportReport };
})();
