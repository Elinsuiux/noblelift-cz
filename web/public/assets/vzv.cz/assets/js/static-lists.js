(function () {
  var KEYS = {
    favourite: "vzv_favourites",
    compare: "vzv_compare",
    basket: "vzv_basket"
  };
  var PATHS = {
    kosik: "/pages/vzv.cz/cz/kosik/index.html",
    parkoviste: "/pages/vzv.cz/cz/parkoviste/index.html",
    porovnani: "/pages/vzv.cz/cz/porovnani-voziku/index.html",
    listing: "/pages/vzv.cz/cz/aktualne-skladem/voziky-skladem/index.html",
    eshop: "/pages/vzv.cz/cz/eshop/pridavna-zarizeni/index.html"
  };
  var CATALOG = [
    {
      id: "96239",
      title: "Čelní čtyřkolový JUNGHEINRICH EFG 425 - AKU, 2021",
      short: "56730 JUNGHEINRICH EFG 425",
      img: "https://www.vzv.cz/?img-webp=fotov/56730/56730-01.jpg&webp-width=500",
      url: "/pages/vzv.cz/cz/aktualne-skladem/voziky-skladem/jungheinrich-efg-425-56730/index.html",
      price: "394 000 Kč"
    },
    {
      id: "94232",
      title: "Čelní tříkolový JUNGHEINRICH EFG 218 k - AKU, 2018",
      short: "55952 JUNGHEINRICH EFG 218 k",
      img: "https://www.vzv.cz/?img-webp=fotov/55952/55952-01.jpg&webp-width=500",
      url: "/pages/vzv.cz/cz/aktualne-skladem/voziky-skladem/jungheinrich-efg-218-k-55952/index.html",
      price: "177 000 Kč"
    }
  ];
  var HANDLED = {
    "add-favourite": 1,
    "remove-favourite": 1,
    "remove-favourite-all": 1,
    "add-compare": 1,
    "remove-compare": 1,
    "remove-compare-all": 1,
    "add-basket": 1,
    "remove-basket": 1,
    "create-pdf-favourite": 1,
    "create-pdf-compare": 1,
    "add-inquiry-favorites": 1,
    "add-inquiry-compare": 1,
    "get-forklifts": 1
  };

  function readList(kind) {
    try {
      var raw = localStorage.getItem(KEYS[kind]);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function writeList(kind, list) {
    localStorage.setItem(KEYS[kind], JSON.stringify(list));
  }

  function findItem(list, id) {
    id = String(id);
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === id) return list[i];
    }
    return null;
  }

  function catalogItem(id) {
    return findItem(CATALOG, id);
  }

  function text(el) {
    return el ? String(el.textContent || "").replace(/\s+/g, " ").trim() : "";
  }

  function specLabel(svg) {
    var id = (svg && svg.id) || "";
    if (/nosnost/i.test(id)) return "Nosnost";
    if (/zdvih/i.test(id)) return "Zdvih";
    if (/mth/i.test(id)) return "Motohodiny";
    if (/rok/i.test(id)) return "Rok výroby";
    if (/vyska/i.test(id)) return "Výška";
    if (/delka|šířka|sirka/i.test(id)) return "Rozměry";
    return "";
  }

  function ownEl(root, el) {
    if (!el) return null;
    var nested = el.closest('[id^="item-"]');
    if (nested && nested !== root) return null;
    return el;
  }

  function firstOwn(root, selector) {
    var els = root.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      if (ownEl(root, els[i])) return els[i];
    }
    return null;
  }

  function collectItem(id) {
    id = String(id);
    var root = document.getElementById("item-" + id) || document.body;
    var existing;
    ["favourite", "compare", "basket"].forEach(function (kind) {
      if (!existing) existing = findItem(readList(kind), id);
    });
    var fromCatalog = catalogItem(id);
    var imgEl = firstOwn(root, "img.img-fluid, img.w-100, .carousel-item.active img, .card img") || firstOwn(root, "img");
    var titleEl = firstOwn(root, "h2") || firstOwn(root, ".fw-bold.fs-6") || firstOwn(root, "h1, .card-vzv-title");
    var linkEl = firstOwn(root, 'a[href*="/jungheinrich-"], a.btn-dark[href], a[href$="/index.html"]');
    var priceEl = firstOwn(root, ".price-detail .fs-3, .wrapProductPrice, .text-primary.fs-5, .text-vzv.fs-3");
    var popt = document.querySelector('.poptavka-item[data-id="' + id + '"]');
    var specs = [];
    root.querySelectorAll(".row.no-wrap .col, .row .col").forEach(function (col) {
      if (!ownEl(root, col)) return;
      var svg = col.querySelector("svg.svgParams, svg[id^='svg']");
      if (!svg) return;
      var value = "";
      col.querySelectorAll(".col-12.text-center").forEach(function (cell) {
        if (cell.querySelector("svg")) return;
        var t = text(cell);
        if (t) value = t;
      });
      if (value) specs.push({ label: specLabel(svg) || "Parametr", value: value });
    });
    var title = text(titleEl);
    if (!title || /^podobné/i.test(title)) {
      title = (fromCatalog && fromCatalog.title) || (imgEl && imgEl.alt) || (existing && existing.title) || ("Položka " + id);
    }
    var url = "";
    if (root.id === "item-" + id && firstOwn(root, "h2") && !root.classList.contains("card")) {
      url = window.location.pathname;
    } else if (linkEl) {
      url = linkEl.getAttribute("href") || "";
    }
    if (url && url.indexOf("http") !== 0 && url.charAt(0) !== "/") {
      try { url = new URL(url, window.location.href).pathname; } catch (e) {}
    }
    if (!url || url === "#" || /rucne-vedene|celni-|aku__|index__/.test(url) && !/jungheinrich-efg/.test(url)) {
      url = (fromCatalog && fromCatalog.url) || (existing && existing.url) || window.location.pathname;
    }
    var item = {
      id: id,
      title: title,
      img: (imgEl && imgEl.getAttribute("src")) || (fromCatalog && fromCatalog.img) || (existing && existing.img) || "",
      url: url || (fromCatalog && fromCatalog.url) || "#",
      price: text(priceEl) || (popt && popt.getAttribute("data-price") ? (popt.getAttribute("data-price") + " Kč") : "") || (fromCatalog && fromCatalog.price) || (existing && existing.price) || "",
      specs: specs.length ? specs : (existing && existing.specs) || []
    };
    if (existing) {
      if (!item.img) item.img = existing.img;
      if (!item.price) item.price = existing.price;
      if (!item.specs.length) item.specs = existing.specs || [];
      if (item.url === "#" || !item.url) item.url = existing.url;
    }
    return item;
  }

  function addTo(kind, id) {
    var list = readList(kind);
    if (!findItem(list, id)) list.push(collectItem(id));
    writeList(kind, list);
    return list;
  }

  function removeFrom(kind, id) {
    var list = readList(kind).filter(function (it) { return String(it.id) !== String(id); });
    writeList(kind, list);
    return list;
  }

  function inquiryHtml(kind) {
    var list = readList(kind);
    if (!list.length) return "<p>Seznam je prázdný.</p>";
    var rows = list.map(function (it) {
      return "<li>" + escapeHtml(it.title) + (it.price ? " — " + escapeHtml(it.price) : "") + "</li>";
    }).join("");
    return (
      "<p>Chcete poptat tyto vozíky?</p><ul>" + rows + "</ul>" +
      "<p>Volejte <a href=\"tel:+420777711378\">+420 777 711 378</a> nebo pište na <a href=\"mailto:vzv@vzv.cz\">vzv@vzv.cz</a>.</p>"
    );
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function basketItemsHtml(list) {
    if (!list.length) return "";
    return list.map(function (it) {
      return (
        '<div class="col-12 col-md-6 mb-3" id="kosik-polozka-' + it.id + '">' +
          '<div class="d-flex gap-3 align-items-center border rounded p-2">' +
            (it.img ? '<a href="' + escapeHtml(it.url) + '"><img src="' + escapeHtml(it.img) + '" alt="" style="width:96px;height:72px;object-fit:cover"></a>' : "") +
            '<div class="flex-grow-1">' +
              '<a href="' + escapeHtml(it.url) + '" class="fw-bold text-decoration-none">' + escapeHtml(it.title) + "</a>" +
              (it.price ? '<div class="text-primary fw-bold">' + escapeHtml(it.price) + "</div>" : "") +
              '<button type="button" class="btn btn-sm btn-outline-dark mt-1" onclick="removeBasket(\'' + it.id + "')\">Odebrat</button>" +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  function listingCardHtml(it) {
    var inFav = !!findItem(readList("favourite"), it.id);
    var inCmp = !!findItem(readList("compare"), it.id);
    var inBas = !!findItem(readList("basket"), it.id);
    var favClass = inFav ? "btn-dark text-light" : "btn-outline-dark";
    var cmpClass = inCmp ? "btn-dark text-light" : "btn-outline-dark";
    return (
      '<div class="col-12 col-md-6 col-xxl-4">' +
        '<div class="card mt-4 mb-4 ms-2 me-2 border-1 border-light position-relative" id="item-' + it.id + '">' +
          '<a href="' + escapeHtml(it.url) + '"><img src="' + escapeHtml(it.img) + '" class="w-100 border-top" alt="' + escapeHtml(it.short || it.title) + '"></a>' +
          '<div class="card-body p-0 ps-2 pe-2 pb-1">' +
            '<div class="fw-bold fs-6 no-wrap overflow-hidden ps-1 pe-1 mt-2">' + escapeHtml(it.short || it.title) + "</div>" +
            '<div class="d-flex gap-2 ps-1 pe-1 mt-2 mb-2">' +
              '<button type="button" onclick="addRemoveFavourite(\'' + it.id + '\')" class="favourite-button text-decoration-none fs-6 btn btn-sm rounded-circle ' + favClass + '" title="Oblíbené">♡</button>' +
              '<button type="button" onclick="addRemoveCompare(\'' + it.id + '\')" class="compare-button text-decoration-none fs-6 btn btn-sm rounded-circle ' + cmpClass + '" title="Porovnat">⇄</button>' +
            "</div>" +
            '<div class="text-primary pe-2 mt-2 mb-2 fs-5 fw-bold">' + escapeHtml(it.price) + "</div>" +
          "</div>" +
          '<div class="card-footer border-0 bg-transparent p-0 ps-2 pe-2 mt-2 pb-2">' +
            '<div class="row ps-1 pe-1">' +
              '<div class="col-6 text-center p-0"><div class="row justify-content-center"><div class="col-10 d-grid">' +
                '<a href="' + escapeHtml(it.url) + '" class="btn btn-dark rounded-1">Detail</a>' +
              "</div></div></div>" +
              '<div class="col-6 text-center p-0"><div class="row justify-content-center"><div class="col-10 d-grid">' +
                '<a href="' + PATHS.kosik + '" class="btn btn-outline-primary rounded-1' + (inBas ? "" : " d-none") + '" id="item-v-kosiku-' + it.id + '">V košíku</a>' +
                '<button class="btn btn-primary rounded-1 btn-cart' + (inBas ? " d-none" : "") + '" id="item-pridat-do-kosiku-' + it.id + '" data-bs-toggle="modal" data-bs-target="#obsah-kosiku" onclick="addBasket(\'' + it.id + '\')">Do košíku</button>' +
              "</div></div></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function listingPayload() {
    function htmlOf(id) {
      var el = document.getElementById(id);
      return el ? el.innerHTML : "";
    }
    return JSON.stringify({
      voziky: CATALOG.map(listingCardHtml).join(""),
      vzv_paginator: "",
      filtr_badge_template: htmlOf("filtr-badge"),
      nadpis: htmlOf("nadpis"),
      popis: htmlOf("popis"),
      breadcrumb: htmlOf("breadcrumb"),
      podkategorie: htmlOf("category-wrap"),
      pocet_voziku: CATALOG.length,
      url: window.location.pathname + window.location.search
    });
  }

  function handle(url, data) {
    var id = data && (data.id_polozky || data.id);
    if (url === "get-forklifts") return listingPayload();
    if (url === "add-favourite") {
      return JSON.stringify({ favourite_count: addTo("favourite", id).length });
    }
    if (url === "remove-favourite") {
      return JSON.stringify({ favourite_count: removeFrom("favourite", id).length });
    }
    if (url === "remove-favourite-all") {
      writeList("favourite", []);
      return JSON.stringify({ favourite_count: 0 });
    }
    if (url === "add-compare") {
      return JSON.stringify({ compare_count: addTo("compare", id).length });
    }
    if (url === "remove-compare") {
      return JSON.stringify({ compare_count: removeFrom("compare", id).length });
    }
    if (url === "remove-compare-all") {
      writeList("compare", []);
      return JSON.stringify({ compare_count: 0 });
    }
    if (url === "add-basket") {
      var basket = addTo("basket", id);
      return JSON.stringify({ basket_count: basket.length, basket_items: basketItemsHtml(basket) });
    }
    if (url === "remove-basket") {
      var after = removeFrom("basket", id);
      return JSON.stringify({ basket_count: after.length, basket_items: basketItemsHtml(after) });
    }
    if (url === "create-pdf-favourite" || url === "create-pdf-compare") {
      return "";
    }
    if (url === "add-inquiry-favorites") return inquiryHtml("favourite");
    if (url === "add-inquiry-compare") return inquiryHtml("compare");
    return JSON.stringify({});
  }

  function wrapAjax() {
    if (window.__vzvStaticListsWrapped) return;
    window.__vzvStaticListsWrapped = true;
    var orig = window.ajaxCallPromise;
    window.ajaxCallPromise = function (url, data, loadingScreen, postOrGet) {
      if (HANDLED[url]) {
        var payload = handle(url, data || {});
        return Promise.resolve(payload).then(function (result) {
          setTimeout(function () {
            updateCounts();
            markButtons();
            if (url === "get-forklifts") rewriteKosikLinks();
          }, 0);
          return result;
        });
      }
      if (typeof orig === "function") return orig.apply(this, arguments);
      return Promise.resolve("");
    };
  }

  function updateCounts() {
    var fav = readList("favourite").length;
    var cmp = readList("compare").length;
    var bas = readList("basket").length;
    var favEl = document.getElementById("favourite-count");
    var cmpEl = document.getElementById("compare-count");
    var basEl = document.getElementById("basket-count");
    if (favEl) favEl.textContent = String(fav);
    if (cmpEl) cmpEl.textContent = String(cmp);
    if (basEl) basEl.textContent = String(bas);
  }

  function markButtons() {
    var fav = readList("favourite");
    var cmp = readList("compare");
    var bas = readList("basket");
    fav.forEach(function (it) {
      document.querySelectorAll("#item-" + it.id + " .favourite-button").forEach(function (btn) {
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-dark", "text-light");
      });
    });
    cmp.forEach(function (it) {
      document.querySelectorAll("#item-" + it.id + " .compare-button").forEach(function (btn) {
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-dark", "text-light");
      });
    });
    bas.forEach(function (it) {
      var inBtn = document.getElementById("item-v-kosiku-" + it.id);
      var addBtn = document.getElementById("item-pridat-do-kosiku-" + it.id);
      if (inBtn) inBtn.classList.remove("d-none");
      if (addBtn) addBtn.classList.add("d-none");
    });
  }

  function rewriteKosikLinks() {
    document.querySelectorAll('a[href*="vzv.cz/kosik"], a[href$="/kosik"], a[href$="/kosik/index.html"]').forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (/kosik/i.test(href)) a.setAttribute("href", PATHS.kosik);
    });
  }

  function cardHtml(it, kind) {
    var specs = (it.specs || []).slice(0, 3).map(function (s) {
      return '<span class="vzv-list-spec">' + escapeHtml(s.label) + ": " + escapeHtml(s.value) + "</span>";
    }).join("");
    return (
      '<div class="col-12 col-md-6 col-xl-4" id="kosik-polozka-' + it.id + '">' +
        '<article class="card border-1 border-light h-100 vzv-list-card" id="item-' + it.id + '">' +
          (it.img ? '<a href="' + escapeHtml(it.url) + '"><img src="' + escapeHtml(it.img) + '" alt="' + escapeHtml(it.title) + '"></a>' : "") +
          '<div class="card-body">' +
            '<h3><a href="' + escapeHtml(it.url) + '">' + escapeHtml(it.title) + "</a></h3>" +
            (it.price ? '<p class="vzv-list-price">' + escapeHtml(it.price) + "</p>" : "") +
            (specs ? '<p class="vzv-list-specs">' + specs + "</p>" : "") +
            '<div class="d-flex flex-wrap gap-2">' +
              '<a class="btn btn-dark btn-sm" href="' + escapeHtml(it.url) + '">Detail</a>' +
              (kind === "favourite" ? '<button type="button" class="favourite-button btn btn-dark text-light btn-sm" onclick="addRemoveFavourite(\'' + it.id + "')\">Odebrat</button>" : "") +
              (kind === "basket" ? '<button type="button" class="btn btn-outline-dark btn-sm" onclick="removeBasket(\'' + it.id + "')\">Odebrat</button>" : "") +
            "</div>" +
          "</div>" +
        "</article>" +
      "</div>"
    );
  }

  function renderFavourites() {
    var empty = document.getElementById("favorite-empty");
    if (!empty) return;
    var list = readList("favourite");
    var wrap = document.getElementById("favourite-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "favourite-wrap";
      wrap.className = "container mt-4 mb-5";
      empty.parentNode.insertBefore(wrap, empty);
    }
    if (!list.length) {
      wrap.classList.add("d-none");
      empty.classList.remove("d-none");
      return;
    }
    wrap.classList.remove("d-none");
    empty.classList.add("d-none");
    wrap.innerHTML =
      '<div class="favorite-bar d-flex flex-wrap gap-2 mb-3">' +
        '<button type="button" class="btn btn-outline-dark" onclick="removeFavouriteAll()">Odebrat vše</button>' +
        '<button type="button" class="btn btn-vzv" onclick="addInquiryFavorites()">Poptat oblíbené</button>' +
      "</div>" +
      '<div class="row" id="favourite">' + list.map(function (it) { return cardHtml(it, "favourite"); }).join("") + "</div>";
  }

  function renderCompare() {
    var empty = document.getElementById("compare-empty");
    if (!empty) return;
    var list = readList("compare");
    var wrap = document.getElementById("compare-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "compare-wrap";
      wrap.className = "container mt-4 mb-5";
      empty.parentNode.insertBefore(wrap, empty);
    }
    if (!list.length) {
      wrap.classList.add("d-none");
      empty.classList.remove("d-none");
      return;
    }
    wrap.classList.remove("d-none");
    empty.classList.add("d-none");
    var labels = [];
    list.forEach(function (it) {
      (it.specs || []).forEach(function (s) {
        if (s.label && labels.indexOf(s.label) === -1) labels.push(s.label);
      });
    });
    function cells(fn) {
      return list.map(function (it) { return '<td class="compare-item-' + it.id + '">' + fn(it) + "</td>"; }).join("");
    }
    var specRows = labels.map(function (label) {
      return "<tr><th>" + escapeHtml(label) + "</th>" + cells(function (it) {
        var hit = (it.specs || []).filter(function (s) { return s.label === label; })[0];
        return hit ? escapeHtml(hit.value) : "—";
      }) + "</tr>";
    }).join("");
    wrap.innerHTML =
      '<div class="compare-bar d-flex flex-wrap gap-2 mb-3">' +
        '<button type="button" class="btn btn-outline-dark" onclick="removeCompareAll()">Odebrat vše</button>' +
        '<button type="button" class="btn btn-vzv" onclick="addInquiryCompare()">Poptat porovnávané</button>' +
      "</div>" +
      '<div class="table-responsive" id="compare">' +
        '<table class="table align-middle vzv-compare-table">' +
          "<thead><tr><th></th>" + cells(function (it) {
            return (it.img ? '<img src="' + escapeHtml(it.img) + '" alt="">' : "") +
              '<div class="fw-bold mt-2"><a href="' + escapeHtml(it.url) + '">' + escapeHtml(it.title) + "</a></div>";
          }) + "</tr></thead>" +
          "<tbody>" +
            "<tr><th>Cena</th>" + cells(function (it) { return escapeHtml(it.price || "—"); }) + "</tr>" +
            specRows +
            "<tr><th></th>" + cells(function (it) {
              return '<button type="button" class="btn btn-sm btn-outline-dark" onclick="compareRemoveItem(\'' + it.id + "')\">Odebrat</button>";
            }) + "</tr>" +
          "</tbody>" +
        "</table>" +
      "</div>";
  }

  function renderBasket() {
    var empty = document.getElementById("basket-empty") || document.querySelector(".content-body .container.mt-5");
    if (!empty || !/Košík je prázdný/.test(empty.textContent || "") && !document.getElementById("basket-empty")) {
      if (!document.getElementById("basket-empty") && !document.getElementById("basket-wrap")) return;
    }
    if (!document.getElementById("basket-empty") && empty) empty.id = "basket-empty";
    empty = document.getElementById("basket-empty");
    if (!empty) return;
    var list = readList("basket");
    var wrap = document.getElementById("basket-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "basket-wrap";
      wrap.className = "container mt-4 mb-5";
      empty.parentNode.insertBefore(wrap, empty);
    }
    if (!list.length) {
      wrap.classList.add("d-none");
      empty.classList.remove("d-none");
      return;
    }
    wrap.classList.remove("d-none");
    empty.classList.add("d-none");
    var mail = "mailto:vzv@vzv.cz?subject=" + encodeURIComponent("Poptávka z košíku") +
      "&body=" + encodeURIComponent(list.map(function (it) { return it.title + (it.price ? " (" + it.price + ")" : ""); }).join("\n"));
    wrap.innerHTML =
      '<div class="row" id="basket-items">' + list.map(function (it) { return cardHtml(it, "basket"); }).join("") + "</div>" +
      '<div class="d-flex flex-wrap gap-2 mt-4">' +
        '<a class="btn btn-vzv btn-lg" href="' + mail + '">Poptat vozíky v košíku</a>' +
        '<a class="btn btn-outline-dark btn-lg" href="' + PATHS.listing + '">Pokračovat ve výběru</a>' +
      "</div>";
  }

  function injectCss() {
    if (document.getElementById("vzv-static-lists-css")) return;
    var link = document.createElement("link");
    link.id = "vzv-static-lists-css";
    link.rel = "stylesheet";
    link.href = "/assets/vzv.cz/assets/css/static-lists.css?v=lists-2";
    document.head.appendChild(link);
  }

  function boot() {
    wrapAjax();
    injectCss();
    rewriteKosikLinks();
    updateCounts();
    markButtons();
    renderFavourites();
    renderCompare();
    renderBasket();
  }

  wrapAjax();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
