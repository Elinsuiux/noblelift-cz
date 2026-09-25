function findEssoxIframe()
{
    return document.querySelector('#splatkovaKalkulacka iframe[src*="essox"], #splatkovaKalkulacka iframe[title*="splátk"], #splatkovaKalkulacka iframe[title*="splatk"], #splatkovaKalkulacka iframe');
}

function essoxFooterMarkup()
{
    return ''
        + '<div class="vzv-essox-footer-col">'
        + '<div><a href="tel:+420389010422">+420 389 010 422</a></div>'
        + '<div>Po – Pá, od 8:00 do 19:00</div>'
        + '<div>Nejčastější dotazy, www.essox.cz</div>'
        + '<div>Nastavení cookies</div>'
        + '</div>'
        + '<div class="vzv-essox-footer-col">'
        + '<div>ESSOX s.r.o.</div>'
        + '<div>F. A. Gerstnera 52, 370 01 České Budějovice</div>'
        + '<div>IČO 26764652, DIČ CZ699001182</div>'
        + '<div>Spisová značka: 12814 C</div>'
        + '</div>';
}

function placeEssoxLayer(host, className, html)
{
    var unique = className.split(/\s+/).pop();
    var el = host.querySelector('.' + unique);
    if (!el)
    {
        el = document.createElement('div');
        el.className = className;
        el.setAttribute('aria-hidden', 'true');
        if (html)
        {
            el.innerHTML = html;
        }
        host.appendChild(el);
    }
    return el;
}

function essoxBox(host, className, ir, hr, fx, fy, fw, fh)
{
    var el = placeEssoxLayer(host, className);
    el.style.display = '';
    el.style.left = (ir.left - hr.left + ir.width * fx) + 'px';
    el.style.top = (ir.top - hr.top + ir.height * fy) + 'px';
    el.style.width = (ir.width * fw) + 'px';
    el.style.height = (ir.height * fh) + 'px';
    return el;
}

function hideEssoxLayer(host, unique)
{
    var el = host.querySelector('.' + unique);
    if (el)
    {
        el.style.display = 'none';
    }
}

function essoxWidgetPrice(iframe)
{
    try
    {
        var src = iframe.getAttribute('src') || '';
        var match = src.match(/#\/rc\/([A-Za-z0-9+/=_-]+)/);
        if (!match)
        {
            return 0;
        }
        var b64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4)
        {
            b64 += '=';
        }
        var json = JSON.parse(atob(b64));
        return parseFloat(json.Price) || 0;
    }
    catch (e)
    {
        return 0;
    }
}

function isEssoxOutOfRange(iframe)
{
    var price = essoxWidgetPrice(iframe);
    if (price <= 0)
    {
        var el = document.getElementById('porizovaci-cena');
        var cena = el ? parseFloat(String(el.value).replace(/\s+/g, '').replace(',', '.')) : 0;
        if (cena > 0)
        {
            price = cena * 1.21;
        }
    }
    return price > 0 && price < 150000;
}

function applyEssoxRecolor()
{
    var iframe = findEssoxIframe();
    if (!iframe || !iframe.offsetHeight)
    {
        return false;
    }
    iframe.style.removeProperty('filter');
    document.querySelectorAll('.vzv-essox-phone-tint, .vzv-essox-footer-tint, .vzv-essox-purple-tint, .vzv-essox-tint-rule').forEach(function (el) {
        el.remove();
    });
    var host = iframe.parentElement;
    if (!host)
    {
        return false;
    }
    if (!host.classList.contains('vzv-essox-wrap'))
    {
        host.classList.add('vzv-essox-wrap');
    }
    if (window.getComputedStyle(host).position === 'static')
    {
        host.style.position = 'relative';
    }
    host.style.isolation = 'isolate';
    var ir = iframe.getBoundingClientRect();
    var hr = host.getBoundingClientRect();
    var cardX = 0.529;
    var cardW = 0.302;
    if (isEssoxOutOfRange(iframe))
    {
        hideEssoxLayer(host, 'vzv-essox-tint-knob-1');
        hideEssoxLayer(host, 'vzv-essox-tint-knob-2');
        hideEssoxLayer(host, 'vzv-essox-tint-track-1');
        hideEssoxLayer(host, 'vzv-essox-tint-track-2');
        essoxBox(host, 'vzv-essox-tint-bar', ir, hr, 0.508, 0.472, 0.344, 0.094);
        essoxBox(host, 'vzv-essox-tint-bar vzv-essox-tint-banner', ir, hr, 0.145, 0.212, 0.708, 0.080);
    }
    else
    {
        hideEssoxLayer(host, 'vzv-essox-tint-banner');
        essoxBox(host, 'vzv-essox-tint-knob vzv-essox-tint-knob-1', ir, hr, 0.511, 0.298, 0.338, 0.034);
        essoxBox(host, 'vzv-essox-tint-knob vzv-essox-tint-knob-2', ir, hr, 0.511, 0.448, 0.338, 0.034);
        essoxBox(host, 'vzv-essox-tint-track vzv-essox-tint-track-1', ir, hr, cardX, 0.312, cardW, 0.008);
        essoxBox(host, 'vzv-essox-tint-track vzv-essox-tint-track-2', ir, hr, cardX, 0.463, cardW, 0.008);
        essoxBox(host, 'vzv-essox-tint-bar', ir, hr, 0.510, 0.536, 0.342, 0.098);
    }
    var footer = placeEssoxLayer(host, 'vzv-essox-footer-cover', essoxFooterMarkup());
    footer.style.left = (ir.left - hr.left) + 'px';
    footer.style.width = ir.width + 'px';
    footer.style.top = (ir.top - hr.top + ir.height * 0.825) + 'px';
    footer.style.height = (ir.height * 0.175) + 'px';
    return true;
}

function scheduleEssoxRecolor()
{
    var tries = 0;
    var timer = setInterval(function () {
        tries += 1;
        if (applyEssoxRecolor() || tries > 40)
        {
            clearInterval(timer);
        }
    }, 250);
}

function prepareEssoxHtml(html)
{
    if (typeof html !== 'string')
    {
        return html;
    }
    html = html.replace(/<iframe\b([^>]*)>/gi, function (match, attrs) {
        if (!/referrerpolicy/i.test(attrs))
        {
            attrs = ' referrerpolicy="no-referrer"' + attrs;
        }
        return '<div class="vzv-essox-wrap"><iframe' + attrs + '>';
    });
    return html.replace(/<\/iframe>/gi, '</iframe></div>');
}

function bindEssoxRecolorEvents()
{
    document.addEventListener('shown.bs.modal', function (event) {
        if (event.target && event.target.id === 'splatkovaKalkulacka')
        {
            scheduleEssoxRecolor();
        }
    });
    window.addEventListener('resize', function () {
        if (findEssoxIframe())
        {
            applyEssoxRecolor();
        }
    });
    var modal = document.getElementById('splatkovaKalkulacka');
    if (modal && window.MutationObserver)
    {
        new MutationObserver(function () {
            if (findEssoxIframe())
            {
                applyEssoxRecolor();
            }
        }).observe(modal, { childList: true, subtree: true });
    }
}
if (document.readyState === 'loading')
{
    document.addEventListener('DOMContentLoaded', bindEssoxRecolorEvents);
}
else
{
    bindEssoxRecolorEvents();
}

function splatkovaKalkulacka(porizovaciCena = 0, zobrazitClassicLeasing = 0)
{
    if (porizovaciCena == 0)
    {
        porizovaciCena = getPorizovaciCena();
    }
    if (porizovaciCena > 0)
    {
        ajaxCallPromise('splatkova-kalkulacka-uver', {'cena': porizovaciCena, 'zobrazit-classic-leasing': zobrazitClassicLeasing}, true, 'GET').then((response) => {
            $('#splatkova-kalkulacka-modal-content').html(prepareEssoxHtml(response));
            scheduleEssoxRecolor();
        });
    }
    else
    {
        alert('Zadejte prosím pořizovací cenu vozíky.');
    }
}

function splatkovaKalkulackaUver()
{
    let porizovaciCena = getPorizovaciCena();
    if (porizovaciCena > 0)
    {
        ajaxCallPromise('splatkova-kalkulacka-uver-pdf', {'porizovaci-cena': porizovaciCena}, true, 'GET').then((response) => {
            if (response != '')
            {
                downloadFile(response, 'splatkova_kalkulacka');
            }
        });
    }
    else
    {
        alert('Zadejte prosím pořizovací cenu vozíky.');
    }
}

function splatkovaKalkulackaLeasing()
{
    let porizovaciCena = getPorizovaciCena();
    if (porizovaciCena > 0)
    {
        ajaxCallPromise('splatkova-kalkulacka-leasing-pdf', {'porizovaci-cena': porizovaciCena}, true, 'GET').then((response) => {
            if (response != '')
            {
                downloadFile(response, 'splatkova_kalkulacka');
            }
        });
    }
    else
    {
        alert('Zadejte prosím pořizovací cenu vozíky.');
    }
}

function getPorizovaciCena()
{
    if ($('#porizovaci-cena').length > 0)
    {
        return $('#porizovaci-cena').val()
    }
    return 0;
}
