VZV.cz — complete static prototype for IT
=========================================

Updated 13. 10. 2026 (same format as the 18. 9. / 27. 9. 2026 packages).
Includes the latest listing, Košík, Parkoviště, Porovnání and Poptat-form work.

This folder is the whole prototype website as HTML + CSS + JS + images.

How to open locally
-------------------
1. Unzip this archive.
2. Install Python 3 if needed (https://www.python.org/downloads/).
3. Double-click START.bat (Windows) or run:
     python3 start-server.py
4. Browser opens the Czech homepage under /pages/vzv.cz/cz/index/index.html

Do not open the HTML files by double-clicking them in Explorer.
Links and CSS use root paths (/pages/..., /assets/...), so a local
server from this folder is required — same as the original preview.

Apache
------
Copy the unzipped `pages/` and `assets/` folders into the site document
root, keeping those path prefixes. UTF-8 for HTML/CSS.
Do not flatten the tree. Prototype / demo only — not a CMS export.

What is inside
--------------
  pages/     all HTML pages (home, contact, Pronájem catalogs, Služby, …)
  assets/    CSS, JS, fonts, logos, photos
  index.html redirect into the Czech homepage

Notes for implementation
------------------------
- Header, layout and Bootstrap CSS live in assets/vzv.cz/assets/
- Shared layout + list JS to take from this zip:
    assets/vzv.cz/assets/css/layout.css
    assets/vzv.cz/assets/js/static-lists.js
- Page overlays:
    pages/vzv.cz/cz/parkoviste/colors-green.css
    pages/vzv.cz/cz/porovnani-voziku/colors-green.css
    pages/vzv.cz/cz/kosik/colors-green.css
- Pronájem catalog extras live in pages/vzv.cz/cz/pujcovna-vzv/
    pujcovna-katalog.css
    spec-icons/*.png
    colors-green.css
- Some machine photos still load from admin.vzv.cz (live image server).
  Layout, icons and copy are local.
- Czech characters need UTF-8 (the start script sets charset=utf-8).

Key pages
---------
  Home:       /pages/vzv.cz/cz/index/index.html
  Contact:    /pages/vzv.cz/cz/kontakt/index.html
  Listing:    /pages/vzv.cz/cz/aktualne-skladem/voziky-skladem/index.html
  Parkoviště: /pages/vzv.cz/cz/parkoviste/index.html
  Porovnání:  /pages/vzv.cz/cz/porovnani-voziku/index.html
  Košík:      /pages/vzv.cz/cz/kosik/index.html
  Rental:     /pages/vzv.cz/cz/pujcovna-vzv/index.html
  Telehandlers: /pages/vzv.cz/cz/pujcovna-vzv/teleskopicke-manipulatory/index.html
  O nás:      /pages/vzv.cz/cz/o-nas/index.html
  Reference:  /pages/vzv.cz/cz/o-nas/reference/index.html
  Výkup:      /pages/vzv.cz/cz/sluzby/vykup-vzv/index.html
  Nákup na protiúčet: /pages/vzv.cz/cz/sluzby/nakup-na-protiucet/index.html
  Detail:     /pages/vzv.cz/cz/pujcovna-vzv/teleskopicke-manipulatory/34394-manitou-mrt-2150/index.html

Latest in this package
----------------------
- Parkoviště / Porovnání “Poptat všechny vozíky”: white fill, green outline
- Porovnání table: grey best-value cells, thin white line between stacked greys
- Poptat inquiry modal: panel #EBEBEB (not black)
- Košík: visible prices, black checkout next buttons, modal remove X / Odebrat vše
- O nás Služby “Číst více”: Financování, Servis, Náhradní díly → Příslušenství, Výkup VZV

Large gallery photos
--------------------
A few oversized service-gallery photos (over ~600 kB) are omitted from this
zip so the archive stays under 100 MB. HTML still points at those files.
Layout, CSS, icons, catalog pages and the rest of the media are included.
