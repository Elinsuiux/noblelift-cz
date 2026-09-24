function injectEssoxRecolorFilter()
{
    if (document.getElementById('vzv-essox-filter-svg'))
    {
        return;
    }
    if (!document.body)
    {
        document.addEventListener('DOMContentLoaded', injectEssoxRecolorFilter);
        return;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'vzv-essox-filter-svg';
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '1');
    svg.setAttribute('height', '1');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;left:-8px;top:-8px;width:1px;height:1px;overflow:hidden;pointer-events:none;';
    svg.innerHTML =
        '<filter id="essox-recolor" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">' +
            '<feColorMatrix in="SourceGraphic" type="matrix" result="gChan" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1 0 0 0"/>' +
            '<feComponentTransfer in="gChan" result="gBand">' +
                '<feFuncA type="table" tableValues="0 0 0 1 1 0.2 0 0 0"/>' +
            '</feComponentTransfer>' +
            '<feColorMatrix in="SourceGraphic" type="matrix" result="rGtG" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  10 -10 0 0 0"/>' +
            '<feComposite in="gBand" in2="rGtG" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="purpleMask"/>' +
            '<feFlood flood-color="#159504" result="greenFill"/>' +
            '<feComposite in="greenFill" in2="purpleMask" operator="in" result="greenParts"/>' +
            '<feColorMatrix in="SourceGraphic" type="matrix" result="luma" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.2126 0.7152 0.0722 0 0"/>' +
            '<feComponentTransfer in="luma" result="darkMask">' +
                '<feFuncA type="table" tableValues="1 1 1 1 0.35 0 0 0 0"/>' +
            '</feComponentTransfer>' +
            '<feComponentTransfer in="purpleMask" result="notPurple">' +
                '<feFuncA type="table" tableValues="1 0"/>' +
            '</feComponentTransfer>' +
            '<feColorMatrix in="SourceGraphic" type="matrix" result="redness" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2 -1 -1 0 0"/>' +
            '<feComponentTransfer in="redness" result="notRed">' +
                '<feFuncA type="table" tableValues="1 1 1 0.4 0 0 0 0 0"/>' +
            '</feComponentTransfer>' +
            '<feComposite in="darkMask" in2="notPurple" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="darkNotPurple"/>' +
            '<feComposite in="darkNotPurple" in2="notRed" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="blackMask"/>' +
            '<feFlood flood-color="#000000" result="blackFill"/>' +
            '<feComposite in="blackFill" in2="blackMask" operator="in" result="blackParts"/>' +
            '<feComposite in="blackParts" in2="SourceGraphic" operator="over" result="withBlack"/>' +
            '<feComposite in="greenParts" in2="withBlack" operator="over"/>' +
        '</filter>';
    document.body.appendChild(svg);
}

function wrapEssoxCalculator()
{
    var iframe = document.querySelector('#splatkovaKalkulacka iframe[src*="essox"], #splatkovaKalkulacka iframe[title*="splátk"], #splatkovaKalkulacka iframe[title*="splatk"], #splatkovaKalkulacka iframe');
    if (!iframe || !iframe.offsetHeight)
    {
        return false;
    }
    var host = iframe.parentElement;
    if (!host)
    {
        return false;
    }
    if (host.classList.contains('vzv-essox-recolor'))
    {
        host = host.parentElement;
    }
    if (!host)
    {
        return false;
    }
    if (window.getComputedStyle(host).position === 'static')
    {
        host.style.position = 'relative';
    }
    host.style.isolation = 'isolate';

    var wrap = host.querySelector(':scope > .vzv-essox-recolor');
    if (!wrap)
    {
        wrap = document.createElement('div');
        wrap.className = 'vzv-essox-recolor';
        iframe.parentNode.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);
    }
    else if (iframe.parentElement !== wrap)
    {
        wrap.appendChild(iframe);
    }
    iframe.style.filter = 'none';
    wrap.style.filter = 'url("#essox-recolor")';

    var overlay = host.querySelector(':scope > .vzv-essox-footer-tint');
    if (!overlay)
    {
        overlay = document.createElement('div');
        overlay.className = 'vzv-essox-footer-tint';
        overlay.setAttribute('aria-hidden', 'true');
        host.appendChild(overlay);
    }
    var ir = iframe.getBoundingClientRect();
    var hr = host.getBoundingClientRect();
    overlay.style.left = (ir.left - hr.left) + 'px';
    overlay.style.width = ir.width + 'px';
    overlay.style.top = (ir.top - hr.top + ir.height * 0.83) + 'px';
    overlay.style.height = (ir.height * 0.17) + 'px';
    return true;
}

function scheduleEssoxRecolor()
{
    var tries = 0;
    var timer = setInterval(function () {
        tries += 1;
        if (wrapEssoxCalculator() || tries > 40)
        {
            clearInterval(timer);
        }
    }, 250);
}

injectEssoxRecolorFilter();
function bindEssoxRecolorEvents()
{
    document.addEventListener('shown.bs.modal', function (event) {
        if (event.target && event.target.id === 'splatkovaKalkulacka')
        {
            injectEssoxRecolorFilter();
            scheduleEssoxRecolor();
        }
    });
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
    injectEssoxRecolorFilter();
    if (porizovaciCena == 0)
    {
        porizovaciCena = getPorizovaciCena();
    }
    if (porizovaciCena > 0)
    {
        ajaxCallPromise('splatkova-kalkulacka-uver', {'cena': porizovaciCena, 'zobrazit-classic-leasing': zobrazitClassicLeasing}, true, 'GET').then((response) => {
            $('#splatkova-kalkulacka-modal-content').html(response);
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
