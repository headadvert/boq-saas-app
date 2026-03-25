(function () {
  function initLandingAuth() {
    const modal = document.getElementById("authModal");
    const form = document.getElementById("signupForm");
    const closeButton = document.getElementById("closeAuthModal");
    if (!modal || !form) { return; }
    let selectedApp = "boq";
    function openModal(app) { selectedApp = app || "boq"; modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); }
    function closeModal() { modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); }
    document.querySelectorAll("[data-auth-trigger]").forEach(function (button) { button.addEventListener("click", function () { openModal(button.dataset.authTrigger); }); });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const user = { id: "user-" + Date.now(), name: document.getElementById("userName").value.trim(), email: document.getElementById("userEmail").value.trim(), company: document.getElementById("userCompany").value.trim(), phone: document.getElementById("userPhone").value.trim(), projectCount: 0, unlimitedAccess: false, createdAt: new Date().toISOString() };
      BOQUtils.storage.set("boq_user", user);
      localStorage.setItem("selected_app", selectedApp);
      window.location.href = "dashboard.html?type=" + encodeURIComponent(selectedApp);
    });
    if (closeButton) { closeButton.addEventListener("click", closeModal); }
    modal.addEventListener("click", function (event) { if (event.target === modal) { closeModal(); } });
  }
  window.BOQAuth = { initLandingAuth };
  document.addEventListener("DOMContentLoaded", initLandingAuth);
})();
