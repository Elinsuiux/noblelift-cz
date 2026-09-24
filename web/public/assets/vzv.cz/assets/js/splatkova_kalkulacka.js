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
    var el = host.querySelector('.' + className);
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

function applyEssoxRecolor()
{
    var iframe = findEssoxIframe();
    if (!iframe || !iframe.offsetHeight)
    {
        return false;
    }
    iframe.style.removeProperty('filter');
    document.querySelectorAll('.vzv-essox-phone-tint, .vzv-essox-footer-tint').forEach(function (el) {
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
    var left = (ir.left - hr.left) + 'px';
    var width = ir.width + 'px';
    var tint = placeEssoxLayer(host, 'vzv-essox-purple-tint');
    tint.style.left = (ir.left - hr.left + ir.width * 0.51) + 'px';
    tint.style.width = (ir.width * 0.34) + 'px';
    tint.style.top = (ir.top - hr.top + ir.height * 0.215) + 'px';
    tint.style.height = (ir.height * 0.54) + 'px';
    var footer = placeEssoxLayer(host, 'vzv-essox-footer-cover', essoxFooterMarkup());
    footer.style.left = left;
    footer.style.width = width;
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
