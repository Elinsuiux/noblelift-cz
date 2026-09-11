function sendPujcovnaVZV(typFormulare)
{
    let nazevSpolecnosti = $('#nazev_spolecnosti').val();
    let jmenoPrijmeni = $('#jmeno_a_prijmeni').val();
    let telefon = $('#telefon').val();
    let email = $('#email').val();
    let poznamka = $('#poznamka').val();

    if (validateEmail(email) === false)
    {
        email = '';
    }

    if (telefon.length < 6)
    {
        telefon = '';
    }

    let ulozitPoptavku = true;

    $('#souhlas_gdpr_invalid').hide();
    $('#jmeno_a_prijmeni_invalid').hide();
    $('#telefon_invalid').hide();
    $('#email_invalid').hide();


    if ($('#souhlas_gdpr').prop('checked') == false)
    {
        ulozitPoptavku = false;
        $('#souhlas_gdpr_invalid').show();
    }

    if (jmenoPrijmeni == '')
    {
        ulozitPoptavku = false;
        $('#jmeno_a_prijmeni_invalid').show();
    }

    if (telefon == '')
    {
        ulozitPoptavku = false;
        $('#telefon_invalid').show();
    }
    if (email == '')
    {
        ulozitPoptavku = false;
        $('#email_invalid').show();
    }

    if (ulozitPoptavku)
    {
        let data = {
            nazev_spolecnosti: nazevSpolecnosti,
            jmeno_a_prijmeni: jmenoPrijmeni,
            telefon: telefon,
            email: email,
            poznamka: poznamka,
            token: 'sendform',
            'typ_formulare': typFormulare,
        };

        if (enableReCaptcha)
        {
            grecaptcha.enterprise.execute(reCaptchaSiteKey, {action: 'pujcovna_vzv'}).then( function (token)
            {
                data['token'] = token;
                ajaxCallPromise('send-pujcovna-vzv', data, true, 'POST').then((response) => {
                    sendPujcovnaVZVResult(response, typFormulare, email, telefon);

                });
            }).catch(function (err) {
                sendPujcovnaVZVResult('{"status":"ERROR","message":"Error ReCaptcha"}');
            });
        }
        else
        {
            ajaxCallPromise('send-pujcovna-vzv', data, true, 'POST').then((response) => {
                sendPujcovnaVZVResult(response, typFormulare, email, telefon);
            });
        }

    }
}

function sendPujcovnaVZVResult(responseJson, typFormulare = 0, email = '', telefon = '')
{
    let responseArray = JSON.parse(responseJson);
    if (responseArray['status'] == 'OK')
    {
        $('#pujcovna_vzv_form_valid').addClass('d-none');
        $('#pujcovna_vzv_form').html(responseArray['message']);

        let typPoptavky = 'Rychla poptavka';
        if (typFormulare == 2)
        {
            typPoptavky = 'Sjednat schuzku';
        }

        if (typFormulare > 0)
        {
            eventFormSend('Pujcovna VZV - Rychla poptavka');
            eventGA('sendform', 'send', 'Pujcovna VZV', typPoptavky, email, telefon);
        }
    }
    else
    {
        $('#pujcovna_vzv_form_valid').html(responseArray['message']);
        $('#pujcovna_vzv_form_valid').removeClass('d-none');
    }
}
