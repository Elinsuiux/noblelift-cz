(() => {
  document.querySelectorAll("[data-rent-switch], [data-tab-switch]").forEach((root) => {
    const tabs = root.querySelectorAll("[data-tab]");
    const panels = root.querySelectorAll("[data-panel]");
    const nudges = root.querySelectorAll("[data-nudge-for]");

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
        const next = `#${key}`;
        if (location.hash !== next) {
          if (historyMode === "push") history.pushState({ rentTab: key }, "", next);
          else history.replaceState({ rentTab: key }, "", next);
        }
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showTab(tab.dataset.tab, { historyMode: "push" }));
    });

    root.querySelectorAll("[data-tab-jump]").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.tabJump, { historyMode: "push" }));
    });

    window.addEventListener("hashchange", () => {
      const hash = location.hash.replace("#", "");
      const fromHash = [...tabs].find((tab) => tab.dataset.tab === hash);
      if (fromHash) showTab(hash);
    });

    const hash = location.hash.replace("#", "");
    const fromHash = [...tabs].find((tab) => tab.dataset.tab === hash);
    if (fromHash) showTab(hash);
    else {
      const active = [...tabs].find((tab) => tab.classList.contains("is-active"));
      if (active) showTab(active.dataset.tab);
    }
  });

  const here = location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".h-dropdown-menu--pronajem a[href], #mobile-menu-3 a[href]").forEach((link) => {
    const path = link.pathname.replace(/\/index\.html$/, "/");
    if (path === here) link.classList.add("is-current");
  });
})();
