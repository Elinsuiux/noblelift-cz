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
  var ICONS = {"rok": "<svg version=\"1.1\" id=\"svgParamsRokVyroby\" class=\"svgParams svgParamsRokVyroby\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"> <g> <g> <path d=\"M420.103,42.667V16.41h-39.385v26.256H275.692V16.41h-39.385v26.256H131.282V16.41H91.897v26.256H0V495.59h512V42.667 H420.103z M472.615,456.205H39.385V193.641h433.231V456.205z M472.615,154.256H39.385V82.051h52.513v26.256h39.385V82.051h105.026 v26.256h39.385V82.051h105.026v26.256h39.385V82.051h52.513V154.256z\"></path> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"131.282\" cy=\"259.282\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"214.423\" cy=\"259.282\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"297.577\" cy=\"259.282\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"380.718\" cy=\"259.282\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"131.282\" cy=\"324.923\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"214.423\" cy=\"324.923\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"297.577\" cy=\"324.923\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"380.718\" cy=\"324.923\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"131.282\" cy=\"390.564\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"214.423\" cy=\"390.564\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"297.577\" cy=\"390.564\" r=\"19.692\"></circle> </g> </g> <g> <g> <circle class=\"svgHighlight\" cx=\"380.718\" cy=\"390.564\" r=\"19.692\"></circle> </g> </g> </svg>", "aku": "<svg version=\"1.1\" id=\"svgParamsAku\" class=\"svgParams svgParamsAku\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"> <g> <g> <path d=\"M449.121,161.803H273.684L366.936,0H156.027L62.879,266.202h149.75L146.25,512L449.121,161.803z M104.824,236.441 l72.321-206.679h138.289l-93.251,161.803h161.853L208.938,394.022l42.556-157.581H104.824z\"></path> </g> </g> </svg>", "nosnost": "<svg id=\"svgNosnost\" class=\"svgParams svgNosnost\" viewBox=\"-6 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"m427.863281 136.527344h-114.414062c12.054687-14.445313 19.324219-33.019532 19.324219-53.261719 0-45.914063-37.351563-83.265625-83.261719-83.265625-45.914063 0-83.265625 37.351562-83.265625 83.265625 0 20.242187 7.269531 38.816406 19.324218 53.261719h-114.414062l-71.15625 375.472656h499.019531zm-178.351562-106.527344c29.367187 0 53.261719 23.894531 53.261719 53.265625 0 29.367187-23.894532 53.261719-53.261719 53.261719-29.371094 0-53.265625-23.894532-53.265625-53.261719 0-29.371094 23.894531-53.265625 53.265625-53.265625zm-153.507813 136.527344h307.011719l59.785156 315.472656h-426.582031zm0 0\"></path> <path d=\"m250.117188 264.589844h-34.050782l-47.605468 47.539062v-47.539062h-24.46875v119.890625h24.46875v-40.976563l12.339843-12.03125 37.292969 53.007813h31.585938l-51.40625-69.820313zm0 0\"></path> <path d=\"m298.527344 341.347656h32.332031v13.148438c-2.597656 1.894531-6.136719 3.753906-10.554687 5.539062-5.375 2.175782-10.960938 3.277344-16.59375 3.277344-6.449219 0-12.621094-1.441406-18.351563-4.285156-5.523437-2.738282-9.625-6.832032-12.53125-12.519532-3-5.863281-4.519531-13.382812-4.519531-22.347656 0-7.261718 1.289062-14.070312 3.816406-20.214844 1.429688-3.417968 3.464844-6.601562 6.050781-9.472656 2.464844-2.734375 5.820313-5 9.964844-6.730468 4.222656-1.761719 9.382813-2.65625 15.34375-2.65625 4.855469 0 9.304687.839843 13.222656 2.496093 3.726563 1.574219 6.585938 3.640625 8.496094 6.136719 2.070313 2.703125 3.863281 6.601562 5.332031 11.589844l1.375 4.667968 22.527344-6.179687-1.214844-4.722656c-2.066406-8.046875-5.175781-14.722657-9.246094-19.851563-4.175781-5.261718-9.945312-9.394531-17.15625-12.285156-6.984374-2.800781-14.859374-4.21875-23.410156-4.21875-11.726562 0-22.28125 2.46875-31.371094 7.335938-9.304687 4.984374-16.523437 12.683593-21.441406 22.882812-4.785156 9.914062-7.207031 20.71875-7.207031 32.125 0 11.546875 2.453125 22.179688 7.300781 31.597656 4.957032 9.640625 12.390625 17.105469 22.101563 22.191406 9.503906 4.980469 20.183593 7.507813 31.742187 7.507813 8.566406 0 17.03125-1.558594 25.160156-4.636719 8.050782-3.042968 15.945313-7.628906 23.464844-13.625l1.871094-1.488281v-48.164063l-56.503906.089844zm0 0\"></path> </svg>", "zdvih": "<svg version=\"1.1\" id=\"svgParamsZdvih\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"> <rect x=\"122.4\" y=\"22.2\" width=\"17.8\" height=\"180.2\"></rect> <rect x=\"48.3\" y=\"90.9\" width=\"39.4\" height=\"416.8\"></rect> <rect x=\"122.4\" y=\"202.8\" width=\"318.6\" height=\"17.8\"></rect> <rect x=\"190\" y=\"5.9\" width=\"216.8\" height=\"160\"></rect> <g> <path class=\"svgHighlight\" d=\"M244.8,507.1h-25.7v-135h-46.2v-22H291v22h-46.2V507.1z\"></path> <path class=\"svgHighlight\" d=\"M430.7,507.1h-29.5l-39.3-64.2l-39.6,64.2h-27.5l52.1-81.4L298.1,350h28.6l36.3,59.4l36.3-59.4H427l-49.1,76.1L430.7,507.1 z\"></path> </g> </svg>", "mth": "<svg version=\"1.1\" id=\"svgParamsMth\" class=\"svgParams svgParamsMth\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 209.28 209.28\" style=\"enable-background:new 0 0 209.28 209.28;\" xml:space=\"preserve\"> <g> <path d=\"M104.641,0C46.943,0,0.002,46.94,0.002,104.637c0,57.701,46.941,104.643,104.639,104.643 c57.697,0,104.637-46.943,104.637-104.643C209.278,46.94,162.338,0,104.641,0z M104.641,194.28 c-49.427,0-89.639-40.214-89.639-89.643C15.002,55.211,55.214,15,104.641,15c49.426,0,89.637,40.211,89.637,89.637 C194.278,154.066,154.067,194.28,104.641,194.28z\"></path> <path class=\"svgHighlight\" d=\"M158.445,102.886h-49.174V49.134c0-4.142-3.357-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v61.252c0,4.142,3.358,7.5,7.5,7.5 h56.674c4.143,0,7.5-3.358,7.5-7.5C165.945,106.244,162.587,102.886,158.445,102.886z\"></path> </g> </svg>", "heart": "<svg version=\"1.1\" id=\"svgHearth\" class=\"svgHearth\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 52 52\" style=\"enable-background:new 0 0 52 52;\" xml:space=\"preserve\"> <path d=\"M25.9,51.5c-0.5,0-0.9-0.2-1.3-0.5c-1.3-1.3-2.6-2.6-3.9-3.9C10.3,36.9,0.6,27.3,0.6,14.4c0-4.7,4.7-13.6,13.6-13.6 c4.7,0,8.9,2.3,11.8,6.2c2.9-3.9,7.1-6.2,11.8-6.2c8.9,0,13.6,8.9,13.6,13.6c0,13-9.8,22.6-20.2,32.7c-1.3,1.3-2.6,2.6-3.9,3.9 C26.9,51.4,26.4,51.5,25.9,51.5L25.9,51.5z M14.2,4.4c-6.9,0-10,7.2-10,10c0,11.4,8.8,20.1,19.1,30.2c0.9,0.9,1.8,1.8,2.7,2.6 c0.9-0.9,1.8-1.8,2.7-2.6c10.2-10,19.1-18.7,19.1-30.2c0-2.7-3.1-10-10-10c-6.1,0-9.1,4.8-10.2,6.9c-0.6,1.2-2.6,1.2-3.2,0 C23.3,9.2,20.2,4.4,14.2,4.4L14.2,4.4z\"></path> </svg>", "cart": "<svg version=\"1.1\" id=\"svgShoppingCart\" class=\"svgShoppingCart\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 450.391 450.391\" style=\"enable-background:new 0 0 450.391 450.391;\" xml:space=\"preserve\"> <g> <path d=\"M143.673,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02 c25.969,0,47.02-21.052,47.02-47.02C190.694,371.374,169.642,350.322,143.673,350.322z M143.673,423.465 c-14.427,0-26.122-11.695-26.122-26.122c0-14.427,11.695-26.122,26.122-26.122c14.427,0,26.122,11.695,26.122,26.122 C169.796,411.77,158.1,423.465,143.673,423.465z\"></path> <path d=\"M342.204,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02s47.02-21.052,47.02-47.02 C389.224,371.374,368.173,350.322,342.204,350.322z M342.204,423.465c-14.427,0-26.122-11.695-26.122-26.122 c0-14.427,11.695-26.122,26.122-26.122s26.122,11.695,26.122,26.122C368.327,411.77,356.631,423.465,342.204,423.465z\"></path> <path d=\"M448.261,76.037c-2.176-2.377-5.153-3.865-8.359-4.18L99.788,67.155L90.384,38.42 C83.759,19.211,65.771,6.243,45.453,6.028H10.449C4.678,6.028,0,10.706,0,16.477s4.678,10.449,10.449,10.449h35.004 c11.361,0.251,21.365,7.546,25.078,18.286l66.351,200.098l-5.224,12.016c-5.827,15.026-4.077,31.938,4.702,45.453 c8.695,13.274,23.323,21.466,39.184,21.943h203.233c5.771,0,10.449-4.678,10.449-10.449c0-5.771-4.678-10.449-10.449-10.449 H175.543c-8.957-0.224-17.202-4.936-21.943-12.539c-4.688-7.51-5.651-16.762-2.612-25.078l4.18-9.404l219.951-22.988 c24.16-2.661,44.034-20.233,49.633-43.886l25.078-105.012C450.96,81.893,450.36,78.492,448.261,76.037z M404.376,185.228 c-3.392,15.226-16.319,26.457-31.869,27.69l-217.339,22.465L106.58,88.053l320.261,4.702L404.376,185.228z\"></path> </g> </svg>", "compare": "<svg version=\"1.1\" id=\"Vrstva_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 488 464\" style=\"enable-background:new 0 0 488 464;\" xml:space=\"preserve\"> <g> <path d=\"M295.3,155.9c12.4,4.1,15.5-4.9,19.7-12.7c17.9-32.7,36-65.3,54-98c1.2-2.2,2.2-4.4,4.1-8.1c-38,12.9-74.6,25.3-111.4,37.8 c0,122.8,0,245.6,0,368.2c7.3,2.5,14.8,4.4,21.7,7.6c6.8,3.1,13,7.6,19.5,11.4c-0.2,0.6-0.5,1.1-0.7,1.7c-36,0-72,0-109.4,0 c12.4-11.3,26.3-17,41.8-20c0-119.6,0-239.2,0-359.7c-42.2,14.3-84.1,28.5-126.8,43c3.5,6.8,6.7,13,9.9,19.1 c18.2,34.4,36.4,68.8,54.6,103.3c3.9,7.5,6.3,17.2,19.3,12c0.4,17.2-4.7,31.2-14.1,43.4c-19.4,25.2-45.8,37-77.1,37.6 c-34.7,0.6-64.1-11-84.9-40c-8.3-11.6-12.5-24.8-12.4-39c0.9-0.5,1.3-1,1.7-0.9c8.9,1.8,12.9-3.2,16.8-10.4 c22-40.8,44.6-81.4,67-122c-11.2-12.2-8.6-21,7.5-26.5c98.4-33.3,196.7-66.7,295-100c2.4-0.8,4.8-1.7,7.3-2.3 c6.9-1.5,13.1,1.7,15.5,7.7c2.4,6-0.1,12.5-6.1,16.2c-1.2,0.7-2.5,1.3-4.3,2.2c8.5,16.1,16.8,32.2,25.3,48.1 c12,22.7,24.2,45.2,36,68c4.1,7.8,7.1,16.2,20.8,12c-2.3,9.8-3.3,18.2-6.3,25.7c-11.4,28.5-33.7,44.8-62.7,51.8 c-36.9,9-70.4,1.7-98.7-24.6c-12.7-11.8-19.9-26.9-22.4-44C295,162,295.3,159.4,295.3,155.9z M331,155.7c39.8,0,78.4,0,117.7,0 c-19.4-36.6-38.2-72.3-57.7-108.9C370.8,83.4,351.2,119,331,155.7z M38.7,261.7c39.8,0,78.3,0,117.6,0 c-19.3-36.5-38.2-72.1-57.6-108.8C78.3,189.9,58.6,225.5,38.7,261.7z\"></path> </g> </svg>"};
  var ICO_TRASH = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
  var ICO_DL = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>';
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
    "add-inquiry-compare": 1
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
    if (root.classList.contains("card")) {
      var listTitle = firstOwn(root, ".fw-bold.fs-6");
      if (listTitle) {
        item.title = text(listTitle) || item.title;
        var codeEl = listTitle.querySelector(".text-primary");
        if (codeEl) item.code = text(codeEl);
      }
      item.cardHtml = rewriteLocalLinks(root.outerHTML);
      var stickers = root.querySelector(".stickers");
      if (stickers) item.stickerHtml = stickers.outerHTML;
    } else {
      var evid = firstOwn(root, ".sticker-wrap-evid");
      if (evid) item.code = text(evid);
      var og = document.querySelector('meta[property="og:title"]');
      if (og && og.getAttribute("content") && /^\d+\s/.test(og.getAttribute("content"))) {
        item.title = og.getAttribute("content");
      }
      var moto = root.querySelector(".sticker-motohodiny");
      if (moto) {
        item.stickerHtml = '<div class="stickers position-absolute top-0 end-0 mt-3"><div class="sticker fw-bold mt-1 pe-2 sticker-motohodiny">' + escapeHtml(text(moto)) + "</div></div>";
      }
    }
    if (existing) {
      if (!item.img) item.img = existing.img;
      if (!item.price) item.price = existing.price;
      if (!item.specs.length) item.specs = existing.specs || [];
      if (item.url === "#" || !item.url) item.url = existing.url;
      if (!item.cardHtml) item.cardHtml = existing.cardHtml;
      if (!item.code) item.code = existing.code;
      if (!item.stickerHtml) item.stickerHtml = existing.stickerHtml;
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

  function handle(url, data) {
    var id = data && (data.id_polozky || data.id);
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
    if (url === "create-pdf-favourite") {
      setTimeout(printFavourites, 0);
      return "";
    }
    if (url === "create-pdf-compare") {
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
            if (/favourite/.test(url)) renderFavourites();
          }, 0);
          return result;
        });
      }
      if (typeof orig === "function") {
        var pending = orig.apply(this, arguments);
        if (url === "get-forklifts" && pending && typeof pending.then === "function") {
          return pending.then(function (result) {
            setTimeout(function () {
              rewriteKosikLinks();
              markButtons();
            }, 0);
            return result;
          });
        }
        return pending;
      }
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
    document.querySelectorAll('[id^="item-v-kosiku-"]').forEach(function (el) { el.classList.add("d-none"); });
    document.querySelectorAll('[id^="item-pridat-do-kosiku-"]').forEach(function (el) { el.classList.remove("d-none"); });
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


  function localDetailPath(href) {
    if (!href) return href;
    if (/youtu\.be|youtube|fancybox|^#|^mailto:|^tel:|^javascript:/i.test(href)) return href;
    if (/\/kosik/.test(href)) return PATHS.kosik;
    var path = href;
    if (/^https?:/.test(href)) {
      try { path = new URL(href).pathname; } catch (e) { return href; }
    } else if (href.charAt(0) !== "/") {
      try { path = new URL(href, window.location.href).pathname; } catch (e) { path = href; }
    }
    if (/\/aktualne-skladem\/voziky-skladem\/[a-z0-9\-]+/i.test(path) && !/index\.html$/.test(path)) {
      path = path.replace(/\/?$/, "/") + "index.html";
    }
    if (path.indexOf("/pages/") !== 0 && path.indexOf("/aktualne-skladem/") !== -1) {
      path = "/pages/vzv.cz" + (path.indexOf("/cz/") === 0 ? path : "/cz" + path);
    }
    return path;
  }

  function rewriteLocalLinks(html) {
    return String(html || "")
      .replace(/https:\/\/www\.vzv\.cz\/kosik[^"']*/g, PATHS.kosik)
      .replace(/href="([^"]+)"/g, function (_, href) {
        return 'href="' + localDetailPath(href) + '"';
      })
      .replace(/\s+target="_blank"/g, "");
  }

  function specKind(spec) {
    var label = ((spec && spec.label) || "").toLowerCase();
    var value = ((spec && spec.value) || "").toLowerCase();
    if (/rok/.test(label)) return "rok";
    if (/nosnost/.test(label)) return "nosnost";
    if (/zdvih|výška|vyska/.test(label)) return "zdvih";
    if (/moto|mth/.test(label)) return "mth";
    if (/aku|diesel|lpg|pohon|parametr/.test(label) || /aku|diesel|lpg/.test(value)) return "aku";
    return "";
  }

  function splitTitle(it) {
    var t = it.title || "";
    var m = t.match(/^(\d+)\s+(.+)$/);
    if (m) return { code: m[1], name: m[2] };
    if (it.code) return { code: it.code, name: t.replace(it.code, "").trim() };
    return { code: "", name: t };
  }

  function specCell(kind, value) {
    var icon = ICONS[kind] || ICONS.rok;
    return (
      '<div class="col"><div class="row">' +
        '<div class="col-12 text-center text-light-dark-dark fs-3">' + icon + "</div>" +
        '<div class="col-12 text-center">' + escapeHtml(value) + "</div>" +
      "</div></div>"
    );
  }

  function favouriteBarHtml() {
    return (
      '<div class="favorite-bar row align-items-center mb-3 mt-2">' +
        '<div class="col-12 col-md-6 d-flex flex-wrap gap-2 mb-2 mb-md-0">' +
          '<button type="button" class="btn btn-outline-dark" onclick="removeFavouriteAll()">Odstranit vše ' + ICO_TRASH + "</button>" +
          '<button type="button" class="btn btn-outline-dark" onclick="getFavouritePDF()">Uložit do PDF ' + ICO_DL + "</button>" +
        "</div>" +
        '<div class="col-12 col-md-6 text-md-end">' +
          '<button type="button" class="btn btn-primary" onclick="addInquiryFavorites()">Poptat všechny vozíky</button>' +
        "</div>" +
      "</div>"
    );
  }

  function printFavourites() {
    window.print();
  }

  function listingCardHtml(it) {
    if (it.cardHtml) {
      return (
        '<div class="col-12 col-md-6" id="kosik-polozka-' + it.id + '">' +
          rewriteLocalLinks(it.cardHtml) +
        "</div>"
      );
    }
    var parts = splitTitle(it);
    var titleHtml = parts.code
      ? '<span class="text-primary">' + escapeHtml(parts.code) + "</span> " + escapeHtml(parts.name)
      : escapeHtml(parts.name);
    var specs = (it.specs || []).map(function (sp) {
      return specCell(specKind(sp) || "rok", sp.value);
    }).join("");
    var sticker = it.stickerHtml || "";
    return (
      '<div class="col-12 col-md-6" id="kosik-polozka-' + it.id + '">' +
        '<div class="card mt-4 mb-4 ms-2 me-2 border-1 border-light position-relative" id="item-' + it.id + '">' +
          (it.img ? '<a href="' + escapeHtml(it.url) + '"><img src="' + escapeHtml(it.img) + '" class="w-100 border-top" alt="' + escapeHtml(it.title) + '"></a>' : "") +
          sticker +
          '<div class="card-body p-0 ps-2 pe-2 pb-1">' +
            '<div class="fw-bold fs-6 no-wrap overflow-hidden ps-1 pe-1 mt-2">' + titleHtml + "</div>" +
            '<div class="fs-6 text-muted no-wrap overflow-hidden ps-1 pe-1 mb-4"> &nbsp; </div>' +
            (specs ? '<div class="row no-wrap ps-1 pe-1 fs-7">' + specs + "</div>" : "") +
            '<div class="row">' +
              '<div class="col-7 col-xxl-6 text-start mt-3 mb-3">' +
                '<button type="button" onclick="addRemoveFavourite(\'' + it.id + '\')" class="favourite-button text-decoration-none ms-1 me-1 fs-6 btn btn-sm rounded-circle btn-dark text-light">' + ICONS.heart + "</button>" +
                '<button type="button" onclick="addRemoveCompare(\'' + it.id + '\')" class="compare-button text-decoration-none fs-6 btn btn-sm rounded-circle btn-outline-dark">' + ICONS.compare + "</button>" +
              "</div>" +
              '<div class="col-5 col-xxl-6 text-end no-wrap">' +
                (it.price ? '<div class="text-primary pe-2 mt-3 mb-3 fs-5 fw-bold">' + escapeHtml(it.price) + "</div>" : "") +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="card-footer border-0 bg-transparent p-0 ps-2 pe-2 mt-2 pb-2">' +
            '<div class="row ps-1 pe-1">' +
              '<div class="col-6 text-center p-0"><div class="row justify-content-center"><div class="col-10 d-grid">' +
                '<a href="' + escapeHtml(it.url) + '" class="btn btn-dark rounded-1">Detail</a>' +
              "</div></div></div>" +
              '<div class="col-6 text-center p-0"><div class="row justify-content-center"><div class="col-10 d-grid">' +
                '<a href="' + PATHS.kosik + '" class="btn btn-outline-primary rounded-1 d-none" id="item-v-kosiku-' + it.id + '">V košíku</a>' +
                '<button class="btn btn-primary rounded-1 btn-cart" id="item-pridat-do-kosiku-' + it.id + '" data-bs-toggle="modal" data-bs-target="#obsah-kosiku" onclick="addBasket(\'' + it.id + '\')">Do košíku <span class="fs-6">' + ICONS.cart + "</span></button>" +
              "</div></div></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
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
              '<a class="btn ' + (kind === "favourite" ? "btn-primary" : "btn-dark") + ' btn-sm" href="' + escapeHtml(it.url) + '">Detail</a>' +
              (kind === "favourite" ? '<button type="button" class="favourite-button btn btn-outline-dark btn-sm" onclick="addRemoveFavourite(\'' + it.id + "')\">Odebrat</button>" : "") +
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
    wrap.className = "container mt-4 mb-5";
    wrap.innerHTML =
      favouriteBarHtml() +
      '<div class="row" id="favourite">' + list.map(listingCardHtml).join("") + "</div>" +
      favouriteBarHtml();
    markButtons();
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
    link.href = "/assets/vzv.cz/assets/css/static-lists.css?v=lists-5";
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
