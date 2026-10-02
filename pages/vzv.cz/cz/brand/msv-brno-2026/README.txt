VZV · MSV Brno 2026 — karta (prototyp pro IT)
=============================================

Otevřít
-------
Soubor `PROTOTYP-MSV-BRNO-2026-formulare.html` (nebo `index.html`) v prohlížeči.
Funguje i bez serveru, pokud jsou ve stejné složce `logo-vzv.png`, `claim-white.png` a `pattern.png`.

Účel
----
Kompletní vizuální a datový prototyp karty z veletrhu MSV Brno 6.–9. 10. 2026
pro implementaci v Power Apps (canvas) + AI Builder Business Card Reader.

Stejný princip jako Logimat Standard Pack: jedna HTML karta pro obchodníka
+ tabulka polí a JSON payload pro IT.

Není to produkční aplikace. Uložení jen zapíše kartu do seznamu „Dnešní karty“
a ukáže JSON dole na stránce.

Obsah formuláře
---------------
1. Foto vizitky (AI Builder)
2. Typ klienta, Role, Firma*, IČO/DIČ, Kategorie A–D
3. Kontakt: jméno*, funkce, telefon, e-mail
4. Sídlo: město, PSČ, země, web
5. Zájem: prodej/pronájem/servis/díly/přídavná/financování,
   stav, typ vozíku, pohon, nosnost, zdvih, počet, termín, poznámka
6. Další krok: follow-up, datum, GDPR*
7. Dnešní karty (seznam uložených)
8. Zadání pro IT (tabulka polí + poslední JSON)
