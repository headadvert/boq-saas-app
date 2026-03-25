(function () {
  function initApp() {
    if (!document.getElementById("projectForm")) { return; }
    const mode = BOQUtils.getMode();
    const state = {
      user: BOQUtils.storage.get("boq_user", null) || { name: "Guest User", email: "No email saved", projectCount: 0, unlimitedAccess: false },
      selectedScopes: Object.keys(BOQ_DATA.scopeLibrary),
      rooms: BOQ_DATA.roomTemplates.map(function (room, index) { return Object.assign({ id: Date.now() + index }, room); }),
      result: null,
      unlocked: false,
      activeStep: 0
    };

    const elements = {
      projectType: document.getElementById("projectType"),
      country: document.getElementById("country"),
      projectName: document.getElementById("projectName"),
      finishLevel: document.getElementById("finishLevel"),
      floors: document.getElementById("floors"),
      basement: document.getElementById("basement"),
      efficiency: document.getElementById("efficiency"),
      height: document.getElementById("height"),
      complexity: document.getElementById("complexity"),
      gfaOutput: document.getElementById("gfaOutput"),
      grossAreaOutput: document.getElementById("grossAreaOutput"),
      programAreaOutput: document.getElementById("programAreaOutput"),
      roomCountOutput: document.getElementById("roomCountOutput"),
      currentUserName: document.getElementById("currentUserName"),
      currentUserEmail: document.getElementById("currentUserEmail"),
      currentModeLabel: document.getElementById("currentModeLabel"),
      currentStandardLabel: document.getElementById("currentStandardLabel"),
      currencyOutput: document.getElementById("currencyOutput"),
      standardOutput: document.getElementById("standardOutput"),
      projectCountValue: document.getElementById("projectCountValue"),
      projectCountHint: document.getElementById("projectCountHint"),
      modeSidebarText: document.getElementById("modeSidebarText"),
      workspaceTitle: document.getElementById("workspaceTitle"),
      workspaceIntro: document.getElementById("workspaceIntro"),
      generateButton: document.getElementById("generateButton"),
      generateSecondaryButton: document.getElementById("generateSecondaryButton"),
      boqHeading: document.getElementById("boqHeading"),
      costHeading: document.getElementById("costHeading"),
      boqTableBody: document.getElementById("boqTableBody"),
      costSummary: document.getElementById("costSummary"),
      takeoffGrid: document.getElementById("takeoffGrid"),
      projectNotes: document.getElementById("projectNotes"),
      scopeGrid: document.getElementById("scopeGrid"),
      scopeNote: document.getElementById("scopeNote"),
      benchmarkSourceText: document.getElementById("benchmarkSourceText"),
      projectTypeNote: document.getElementById("projectTypeNote"),
      drawingFile: document.getElementById("drawingFile"),
      uploadFeedback: document.getElementById("uploadFeedback"),
      roomTableBody: document.getElementById("roomTableBody"),
      addRoomButton: document.getElementById("addRoomButton"),
      loadTemplateButton: document.getElementById("loadTemplateButton"),
      unlockButton: document.getElementById("unlockButton"),
      accessCode: document.getElementById("accessCode"),
      unlockMessage: document.getElementById("unlockMessage"),
      upgradeButton: document.getElementById("upgradeButton"),
      resetProjectButton: document.getElementById("resetProjectButton"),
      pdfButton: document.getElementById("pdfButton")
    };

    function populateSelect(select, collection, selectedKey) {
      select.innerHTML = Object.keys(collection).map(function (key) {
        return "<option value='" + key + "'" + (key === selectedKey ? " selected" : "") + ">" + collection[key].label + "</option>";
      }).join("");
    }

    function getInput() {
      return {
        mode: mode,
        projectType: elements.projectType.value,
        country: elements.country.value,
        projectName: elements.projectName.value.trim() || "Untitled Project",
        finishLevel: elements.finishLevel.value,
        floors: Number(elements.floors.value || 0),
        basement: Number(elements.basement.value || 0),
        efficiency: Number(elements.efficiency.value || 0),
        height: Number(elements.height.value || 0),
        complexity: Number(elements.complexity.value || 1)
      };
    }

    function renderSteps() {
      document.querySelectorAll("[data-step-panel]").forEach(function (panel) {
        panel.classList.toggle("active", Number(panel.dataset.stepPanel) === state.activeStep);
      });
      document.querySelectorAll("[data-step-link]").forEach(function (button) {
        button.classList.toggle("active", Number(button.dataset.stepLink) === state.activeStep);
      });
    }

    function goToStep(step) {
      state.activeStep = Math.max(0, Math.min(3, step));
      renderSteps();
    }

    function renderScopeGrid() {
      elements.scopeGrid.innerHTML = Object.keys(BOQ_DATA.scopeLibrary).map(function (scopeKey) {
        const scope = BOQ_DATA.scopeLibrary[scopeKey];
        const checked = state.selectedScopes.indexOf(scopeKey) >= 0 ? "checked" : "";
        return "<label class='scope-option'><input type='checkbox' value='" + scopeKey + "' " + checked + "><span><strong>" + scope.name + "</strong><small>" + scope.descriptions.default + "</small></span></label>";
      }).join("");
      elements.scopeGrid.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          state.selectedScopes = Array.from(elements.scopeGrid.querySelectorAll("input[type='checkbox']:checked")).map(function (item) { return item.value; });
          elements.scopeNote.textContent = state.selectedScopes.length + " scope packages selected";
        });
      });
    }

    function renderRooms() {
      elements.roomTableBody.innerHTML = state.rooms.map(function (room) {
        return "<tr data-room-id='" + room.id + "'>" +
          "<td><input data-field='name' value='" + room.name + "'></td>" +
          "<td><input data-field='qty' type='number' min='1' step='1' value='" + room.qty + "'></td>" +
          "<td><input data-field='length' type='number' min='0.5' step='0.1' value='" + room.length + "'></td>" +
          "<td><input data-field='width' type='number' min='0.5' step='0.1' value='" + room.width + "'></td>" +
          "<td><input data-field='height' type='number' min='2.4' step='0.1' value='" + room.height + "'></td>" +
          "<td class='room-area-cell'>" + BOQUtils.formatNumber(BOQEngine.getRoomArea(room), 2) + " m2</td>" +
          "<td><button class='icon-button' data-remove-room='" + room.id + "' type='button'>Remove</button></td>" +
          "</tr>";
      }).join("");

      elements.roomTableBody.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("input", function () {
          const row = input.closest("tr");
          const roomId = Number(row.dataset.roomId);
          const room = state.rooms.find(function (item) { return item.id === roomId; });
          if (!room) { return; }
          const field = input.dataset.field;
          room[field] = field === "name" ? input.value : Number(input.value || 0);
          updateMeta();
          renderRooms();
        });
      });

      elements.roomTableBody.querySelectorAll("[data-remove-room]").forEach(function (button) {
        button.addEventListener("click", function () {
          const roomId = Number(button.dataset.removeRoom);
          state.rooms = state.rooms.filter(function (item) { return item.id !== roomId; });
          if (!state.rooms.length) { addRoom(); }
          renderRooms();
          updateMeta();
        });
      });
    }

    function addRoom(template) {
      const source = template || { name: "New Space", qty: 1, length: 4, width: 4, height: 3.2 };
      state.rooms.push({ id: Date.now() + Math.floor(Math.random() * 1000), name: source.name, qty: source.qty, length: source.length, width: source.width, height: source.height });
      renderRooms();
      updateMeta();
    }

    function updateMeta() {
      const input = getInput();
      const programArea = BOQEngine.getProgramArea(state.rooms);
      const grossArea = BOQEngine.getGrossArea(input, state.rooms);
      const country = BOQ_DATA.countries[input.country];
      const projectType = BOQ_DATA.projectTypes[input.projectType];
      elements.gfaOutput.textContent = BOQUtils.formatNumber(grossArea, 0) + " m2";
      elements.grossAreaOutput.textContent = BOQUtils.formatNumber(grossArea, 0) + " m2";
      elements.programAreaOutput.textContent = BOQUtils.formatNumber(programArea, 0) + " m2";
      elements.roomCountOutput.textContent = BOQUtils.formatNumber(state.rooms.length, 0);
      elements.currencyOutput.textContent = country.currency;
      elements.standardOutput.textContent = country.standard;
      elements.currentStandardLabel.textContent = country.standard + " · " + country.currency;
      elements.benchmarkSourceText.textContent = BOQ_DATA.sources[input.country];
      elements.projectTypeNote.textContent = projectType.typeNote;
    }

    function renderUserState() {
      elements.currentUserName.textContent = state.user.name || "Guest User";
      elements.currentUserEmail.textContent = state.user.email || "No email saved";
      elements.currentModeLabel.textContent = mode.toUpperCase();
      elements.modeSidebarText.textContent = mode === "boq" ? "Bill of Quantities Workspace" : "Cost Planning Workspace";
      elements.workspaceTitle.textContent = mode === "boq" ? "BOQ Mode" : "Cost Mode";
      elements.workspaceIntro.textContent = mode === "boq"
        ? "Step through project setup, room schedule, benchmark selection, and detailed measured outputs."
        : "Step through project setup, room schedule, benchmark selection, and budget-focused commercial outputs.";
      elements.generateButton.textContent = mode === "boq" ? "Generate BOQ" : "Generate Cost Estimate";
      elements.generateSecondaryButton.textContent = mode === "boq" ? "Refresh BOQ" : "Refresh Cost Output";
      elements.boqHeading.textContent = mode === "boq" ? "Measured bill of quantities" : "Trade build-up behind cost estimate";
      elements.costHeading.textContent = mode === "boq" ? "Commercial summary" : "Budget summary";
    }

    function updateUsage() {
      const count = Number(state.user.projectCount || 0);
      const locked = !state.user.unlimitedAccess && !state.unlocked && count >= 10;
      elements.projectCountValue.textContent = state.user.unlimitedAccess || state.unlocked ? (count + " / Unlimited") : (count + " / 10");
      elements.projectCountHint.textContent = locked ? "Project limit reached" : "Free usage available";
      elements.generateButton.disabled = locked;
      elements.generateSecondaryButton.disabled = locked;
      if (locked) {
        elements.unlockMessage.textContent = "Free project limit reached. Upgrade via WhatsApp or unlock with access code.";
      }
    }

    function saveUser() {
      BOQUtils.storage.set("boq_user", state.user);
    }

    function renderSummary(result) {
      elements.boqTableBody.innerHTML = result.items.map(function (item) {
        return "<tr><td>" + item.itemNumber + "</td><td><strong>" + item.scopeName + "</strong><br><small>" + item.description + "</small></td><td>" + item.unit + "</td><td>" + BOQUtils.formatNumber(item.quantity, 2) + "</td><td>" + BOQUtils.formatCurrency(item.rate, result.country.currency) + "</td><td>" + BOQUtils.formatCurrency(item.amount, result.country.currency) + "</td></tr>";
      }).join("");
      elements.costSummary.innerHTML = BOQCost.getCostSummary(result).map(function (row) {
        return "<div class='summary-row" + (row.emphasis ? " total-row" : "") + "'><span>" + row.label + "</span><strong>" + row.value + "</strong></div>";
      }).join("");
      elements.takeoffGrid.innerHTML = [
        { label: "Cement Bags", value: result.takeoff.cement + " bags" },
        { label: "Reinforcement Steel", value: result.takeoff.steel + " kg" },
        { label: "Blocks", value: result.takeoff.blocks + " nos" },
        { label: "Tiles / Finish Area", value: result.takeoff.tiles + " m2" }
      ].map(function (item) {
        return "<div class='takeoff-item'><span>" + item.label + "</span><strong>" + item.value + "</strong></div>";
      }).join("");
      const notes = result.notes.slice();
      if (result.roiYears) { notes.push("Indicative solar payback period: " + result.roiYears + " years."); }
      elements.projectNotes.innerHTML = notes.map(function (note) { return "<p>" + note + "</p>"; }).join("");
    }

    function generate() {
      updateUsage();
      if (elements.generateButton.disabled) { return; }
      state.result = BOQEngine.generateBoq(getInput(), state.rooms, state.selectedScopes);
      state.user.projectCount = Number(state.user.projectCount || 0) + 1;
      saveUser();
      renderUserState();
      renderSummary(state.result);
      updateUsage();
      goToStep(3);
    }

    function resetProject() {
      elements.projectName.value = "";
      elements.finishLevel.value = "standard";
      elements.floors.value = 2;
      elements.basement.value = 0;
      elements.efficiency.value = 82;
      elements.height.value = 3.4;
      elements.complexity.value = 1;
      state.selectedScopes = Object.keys(BOQ_DATA.scopeLibrary);
      state.rooms = BOQ_DATA.roomTemplates.map(function (room, index) { return Object.assign({ id: Date.now() + index }, room); });
      renderScopeGrid();
      renderRooms();
      updateMeta();
      elements.boqTableBody.innerHTML = "";
      elements.costSummary.innerHTML = "";
      elements.takeoffGrid.innerHTML = "";
      elements.projectNotes.innerHTML = "";
      elements.uploadFeedback.textContent = "Use the schedule below for accurate space-by-space input, or upload a drawing to prefill sample spaces.";
      goToStep(0);
    }

    function handleUpload(file) {
      if (!file) { return; }
      const extraction = BOQCad.simulateExtraction(file.name, elements.projectType.value);
      state.rooms = BOQ_DATA.roomTemplates.map(function (room, index) { return Object.assign({ id: Date.now() + index }, room); });
      state.rooms.push({ id: Date.now() + 99, name: "Lobby / Service Area", qty: 1, length: extraction.fields.length * 1.5, width: extraction.fields.width * 0.7, height: extraction.fields.height });
      elements.floors.value = extraction.fields.floors;
      elements.basement.value = extraction.fields.basement;
      elements.height.value = extraction.fields.height;
      elements.uploadFeedback.textContent = extraction.message;
      renderRooms();
      updateMeta();
    }

    populateSelect(elements.projectType, BOQ_DATA.projectTypes, "residential");
    populateSelect(elements.country, BOQ_DATA.countries, "saudi");
    renderScopeGrid();
    renderRooms();
    renderUserState();
    updateMeta();
    updateUsage();
    renderSteps();

    document.querySelectorAll("[data-next-step]").forEach(function (button) {
      button.addEventListener("click", function () { goToStep(Number(button.dataset.nextStep)); });
    });
    document.querySelectorAll("[data-prev-step]").forEach(function (button) {
      button.addEventListener("click", function () { goToStep(Number(button.dataset.prevStep)); });
    });
    document.querySelectorAll("[data-step-link]").forEach(function (button) {
      button.addEventListener("click", function () { goToStep(Number(button.dataset.stepLink)); });
    });

    [elements.projectType, elements.country, elements.finishLevel, elements.floors, elements.basement, elements.efficiency, elements.height, elements.complexity].forEach(function (element) {
      element.addEventListener("input", updateMeta);
      element.addEventListener("change", updateMeta);
    });

    elements.projectType.addEventListener("change", function () {
      const preset = BOQCad.getPreset(elements.projectType.value);
      elements.floors.value = preset.floors;
      elements.basement.value = preset.basement;
      elements.height.value = preset.height;
      renderRooms();
      updateMeta();
    });

    elements.addRoomButton.addEventListener("click", function () { addRoom(); });
    elements.loadTemplateButton.addEventListener("click", function () {
      state.rooms = BOQ_DATA.roomTemplates.map(function (room, index) { return Object.assign({ id: Date.now() + index }, room); });
      renderRooms();
      updateMeta();
    });
    elements.drawingFile.addEventListener("change", function (event) { handleUpload(event.target.files[0]); });

    elements.unlockButton.addEventListener("click", function () {
      const code = elements.accessCode.value.trim();
      if (BOQ_DATA.accessCodes[code]) {
        state.unlocked = true;
        state.user.unlimitedAccess = true;
        saveUser();
        elements.unlockMessage.textContent = "Access unlocked: " + BOQ_DATA.accessCodes[code].label;
        updateUsage();
      } else {
        elements.unlockMessage.textContent = "Invalid access code.";
      }
    });

    elements.upgradeButton.addEventListener("click", function () {
      const message = encodeURIComponent("Hello, I want to upgrade BOQ Pro for unlimited project estimation access.");
      window.open("https://wa.me/966511759092?text=" + message, "_blank");
    });

    elements.generateButton.addEventListener("click", generate);
    elements.generateSecondaryButton.addEventListener("click", generate);
    elements.resetProjectButton.addEventListener("click", resetProject);
    elements.pdfButton.addEventListener("click", function () {
      if (!state.result) { generate(); }
      if (state.result) {
        BOQPdf.exportReport({ mode: mode, projectName: elements.projectName.value.trim() || "Untitled Project", result: state.result });
      }
    });
  }

  window.BOQApp = { initApp };
  document.addEventListener("DOMContentLoaded", initApp);
})();
