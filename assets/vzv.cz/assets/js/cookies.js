// odhlášení uživatele
$(document).ready(function()
{
    if ( $('#modal-cookies').length )
    {
        $('.cookie-souhlas').removeClass('d-none');
    }
});


function hideCookiesModal()
{
    let selector = $('#modal-cookies');
    selector.modal('hide');
    selector.remove();
    $('.cookie-souhlas').remove();
}

function cookiesNastaveni(analytickeStatickeUdaje, marketingoveUdaje)
{
    let data = {
        'cookies_analyticke_a_statisticke_udaje': analytickeStatickeUdaje,
        'cookies_marketingove_udaje': marketingoveUdaje,
    };

    if (marketingoveUdaje == 1)
    {
        marketingoveUdaje = 'granted';
    }
    if (marketingoveUdaje == 0)
    {
        marketingoveUdaje = 'denied';
    }

    if (analytickeStatickeUdaje == 1)
    {
        analytickeStatickeUdaje = 'granted';
    }
    if (analytickeStatickeUdaje == 0)
    {
        analytickeStatickeUdaje = 'denied';
    }

    ajaxCallPromise('set-cookies-consent', data, true, 'POST').then( result => {
        localStorage.setItem('cookiesConsent', 1);
        localStorage.setItem('cookiesMarketing', marketingoveUdaje);
        localStorage.setItem('cookiesStatistika', analytickeStatickeUdaje);
        setConsentCookie();
        hideCookiesModal();
    });
}

function cookiesOdmitnoutVse()
{
    cookiesNastaveni(0,0);
}

function cookiesPrijmoutVse()
{
    cookiesNastaveni(1,1);
}

function cookiesUlozitVybrane()
{
    let analytickeStatickeUdaje = 0;
    let marketingoveUdaje = 0;

    if ($('#cookies-analyticke-statisticke-udaje').prop('checked'))
    {
        analytickeStatickeUdaje = 1;
    }
    if ($('#cookies-marketingove-udaje').prop('checked'))
    {
        marketingoveUdaje = 1;
    }
    cookiesNastaveni(analytickeStatickeUdaje,marketingoveUdaje);
}