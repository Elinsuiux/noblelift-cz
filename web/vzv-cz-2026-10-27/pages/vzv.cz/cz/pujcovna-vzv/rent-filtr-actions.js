(function () {
  var row = document.getElementById("filtr-cancel");
  if (!row || row.getAttribute("data-filtr-actions") === "1") return;
  row.setAttribute("data-filtr-actions", "1");

  function closePanel() {
    var panel = document.getElementById("offcanvasFiltr");
    if (!panel) return;
    if (window.bootstrap && bootstrap.Offcanvas) {
      var instance = bootstrap.Offcanvas.getInstance(panel) || bootstrap.Offcanvas.getOrCreateInstance(panel);
      instance.hide();
      return;
    }
    panel.classList.remove("show");
  }

  var closeRow = document.createElement("div");
  closeRow.className = "filtr-close-row";
  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "filtr-close";
  closeBtn.setAttribute("aria-label", "Zavřít filtr");
  closeBtn.textContent = "\u00d7";
  closeBtn.addEventListener("click", closePanel);
  closeRow.appendChild(closeBtn);

  var actions = document.createElement("div");
  actions.className = "filtr-actions";

  var reset = document.createElement("button");
  reset.type = "button";
  reset.className = "btn filtr-btn filtr-btn-reset";
  reset.textContent = "Zrušit filtr";
  reset.addEventListener("click", function (event) {
    event.preventDefault();
    var old = document.getElementById("reset-filtr");
    if (old) old.click();
    closePanel();
  });

  var apply = document.createElement("button");
  apply.type = "button";
  apply.className = "btn filtr-btn filtr-btn-apply";
  apply.textContent = "Použít filtr";
  apply.addEventListener("click", function () {
    var searchBtn = document.getElementById("button-search");
    if (searchBtn) searchBtn.click();
    closePanel();
  });

  actions.appendChild(reset);
  actions.appendChild(apply);
  row.insertBefore(actions, row.firstChild);
  row.insertBefore(closeRow, actions);
})();
