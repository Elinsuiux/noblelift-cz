VZV.cz — complete static prototype for IT
=========================================

This folder is the whole prototype website as HTML + CSS + JS + images
(the same tree served at http://127.0.0.1:8082/pages/vzv.cz/cz/index/index.html).

How to open
-----------
1. Unzip this archive.
2. Install Python 3 if needed (https://www.python.org/downloads/).
3. Double-click START.bat (Windows) or run:
     python3 start-server.py
4. Browser opens:
     http://127.0.0.1:8080/pages/vzv.cz/cz/index/index.html

Do not open the HTML files by double-clicking them in Explorer.
Links and CSS use root paths (/pages/..., /assets/...), so a local
server from this folder is required — same as the original preview.

What is inside
--------------
  pages/     all HTML pages (home, contact, Pronájem catalogs, Služby, …)
  assets/    CSS, JS, fonts, logos, photos
  index.html redirect into the Czech homepage

Notes for implementation
------------------------
- Prototype / demo only. Not a production CMS export.
- Header, layout and Bootstrap CSS live in assets/vzv.cz/assets/
- Pronájem catalog extras live in pages/vzv.cz/cz/pujcovna-vzv/
    pujcovna-katalog.css
    spec-icons/*.png
    colors-green.css
- Some machine photos still load from admin.vzv.cz (live image server).
  Layout, icons and copy are local.
- Czech characters need UTF-8 (the start script sets charset=utf-8).

Key pages
---------
  Home:     /pages/vzv.cz/cz/index/index.html
  Contact:  /pages/vzv.cz/cz/kontakt/index.html
  Rental:   /pages/vzv.cz/cz/pujcovna-vzv/index.html
  Listing:  /pages/vzv.cz/cz/pujcovna-vzv/teleskopicke-manipulatory/index.html
  Detail:   /pages/vzv.cz/cz/pujcovna-vzv/teleskopicke-manipulatory/34394-manitou-mrt-2150/index.html
