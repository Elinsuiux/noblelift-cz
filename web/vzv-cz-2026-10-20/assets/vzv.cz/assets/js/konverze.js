function eventFormSend(typFormulare)
{
    if (localStorage.getItem('enableGtag'))
    {

    }
    else
    {
        console.log('Event form send: ' + typFormulare);
    }
}

function sendConversionTelefonHomePage(hodnota)
{
    sendConversion('tel', 'but_telefon', hodnota);
}

function sendConversionTelefonBannerKontakt(hodnota)
{
    sendConversion('tel', 'rozcestnik', 'prodej', hodnota);
}

function sendConversionHeader(hodnota)
{
    sendConversion('tel', 'but_telefon', hodnota);
}

function sendConversion(nazevEventu, kategorieEventu, popisEventu, hodnotaEventu)
{
    eventGA(nazevEventu, kategorieEventu, popisEventu, hodnotaEventu);
}

function eventGA(nazevEventu, kategorieEventu, popisEventu, hodnotaEventu, email = '', telefon = '')
{
    let gtagObj = {
        'event_category': kategorieEventu,
        'event_label': popisEventu,
        'value': hodnotaEventu,
    };

    email = validateKonverzeEmail(email);
    telefon = validateKonverzePhoneNumber(telefon);

    if (email !== '')
    {
        gtagObj.email_zakaznika = email;
    }

    if (telefon !== '')
    {
        gtagObj.telefon_zakaznika = telefon;
    }

    if (localStorage.getItem('enableGtag'))
    {
        setConsentCookie();
        gtag('event', nazevEventu, gtagObj);
    }
    else
    {
        console.log('Event GA: ' + nazevEventu + ', ' + kategorieEventu + ', ' + popisEventu + ', ' + hodnotaEventu);
        console.log(gtagObj);

    }
}

function validateKonverzeEmail(email)
{
    let regular = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

    email = email.replace(/\s+/g, '');

    if (regular.test(email))
    {
        return email;
    }
    else
    {
        return '';
    }
}

function validateKonverzePhoneNumber(telefoniCislo)
{
    telefoniCislo = telefoniCislo.toString();
    telefoniCislo = telefoniCislo.replace(/\s+/g, '');
    telefoniCislo = telefoniCislo.replace(/([-]+)?/g, '');

    if (telefoniCislo.length >= 9)
    {
        return telefoniCislo;
    }
    else
    {
        return ''
    }
}

function setConsentCookie(defaultUpdate = 'update')
{
    if (enviroment == 'production')
    {
        if (localStorage.getItem('enableGtag') == 1)
        {
            gtag('consent', defaultUpdate, {
                'ad_user_data': localStorage.getItem('cookiesMarketing'),
                'ad_personalization': localStorage.getItem('cookiesMarketing'),
                'ad_storage': localStorage.getItem('cookiesStatistika'),
                'analytics_storage': localStorage.getItem('cookiesStatistika')
            });
            gtag('set', 'url_passthrough', true);
            gtag('set', 'ads_data_redaction', true);

        }
        else
        {
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
            });
        }
    }
}