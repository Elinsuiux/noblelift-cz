(() => {
  document.querySelectorAll("[data-rent-switch], [data-tab-switch]").forEach((root) => {
    const tabs = root.querySelectorAll("[data-tab]");
    const panels = root.querySelectorAll("[data-panel]");
    const nudges = root.querySelectorAll("[data-nudge-for]");
    const known = new Set([...tabs].map((tab) => tab.dataset.tab));

    function tabFromLocation() {
      const hash = location.hash.replace("#", "");
      if (known.has(hash)) return hash;
      return "pronajem";
    }

    function urlForTab(key) {
      const base = `${location.pathname}${location.search}`;
      return key === "pronajem" ? base : `${base}#${key}`;
    }

    function showTab(key, { historyMode = false } = {}) {
      tabs.forEach((tab) => {
        const on = tab.dataset.tab === key;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== key;
      });
      nudges.forEach((nudge) => {
        nudge.hidden = nudge.dataset.nudgeFor === key;
      });
      if (historyMode && key) {
        const nextUrl = urlForTab(key);
        const currentUrl = `${location.pathname}${location.search}${location.hash}`;
        if (currentUrl !== nextUrl) {
          if (historyMode === "push") history.pushState({ rentTab: key }, "", nextUrl);
          else history.replaceState({ rentTab: key }, "", nextUrl);
        }
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showTab(tab.dataset.tab, { historyMode: "push" }));
    });

    root.querySelectorAll("[data-tab-jump]").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.tabJump, { historyMode: "push" }));
    });

    window.addEventListener("hashchange", () => showTab(tabFromLocation()));
    window.addEventListener("popstate", () => showTab(tabFromLocation()));

    if (location.hash) showTab(tabFromLocation());
    else {
      const active = [...tabs].find((tab) => tab.classList.contains("is-active"));
      if (active) showTab(active.dataset.tab);
    }
  });

  document.querySelectorAll("[data-rent-layout]").forEach((root) => {
    const buttons = root.querySelectorAll(".rent-layout-switch [data-layout]");
    function setLayout(key) {
      root.dataset.layout = key;
      buttons.forEach((btn) => {
        const on = btn.dataset.layout === key;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
    }
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => setLayout(btn.dataset.layout));
    });
  });

})();
