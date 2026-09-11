function addBasket(idPolozky)
{
    ajaxCallPromise('add-basket', {id_polozky: idPolozky}, true, 'POST').then((response) => {
        if ($('#item-pridat-do-kosiku-' + idPolozky).length > 0)
        {
            $('#item-v-kosiku-' + idPolozky).removeClass('d-none');
            $('#item-pridat-do-kosiku-' + idPolozky).addClass('d-none');
        }
        basketContent(response);
    });
}

function removeBasket(idPolozky)
{
    ajaxCallPromise('remove-basket', {id_polozky: idPolozky}, true, 'POST').then((response) => {
        if ($('#item-v-kosiku-' + idPolozky).length > 0)
        {
            $('#item-v-kosiku-' + idPolozky).addClass('d-none');
            $('#item-pridat-do-kosiku-' + idPolozky).removeClass('d-none');
        }
        if ($('#kosik-polozka-' + idPolozky).length > 0)
        {
            location.reload();
        }
        else
        {
            basketContent(response);
        }
    });
}

function basketContent(response)
{
    let responseArray = JSON.parse(response);
    let valueSpan = responseArray['basket_count'];
    if (valueSpan === 0)
    {
        valueSpan = '0';
    }
    $('#basket-count').html(valueSpan);
    $('#obsah-kosiku-polozky').html(responseArray['basket_items']);
}

function basketCopyAddress()
{
    if ( $('#dodaci_jina').length )
    {
        var arr_fakturacni = ['fakturacni_spolecnost', 'fakturacni_ulice', 'fakturacni_mesto', 'fakturacni_psc', 'fakturacni_id_statu', 'fakturacni_jmeno_prijmeni'];
        var arr_dodaci = ['dodaci_spolecnost', 'dodaci_ulice', 'dodaci_mesto', 'dodaci_psc', 'dodaci_id_statu', 'dodaci_jmeno_prijmeni'];

        if ( $('#dodaci_jina').prop('checked') == true )
        {
            for ( i = 0; i < arr_dodaci.length; i++ )
            {
                $('#' + arr_dodaci[i]).val('');
            }
            $('#dodaci_id_statu').val(1);
        }
        else
        {
            for ( i = 0; i < arr_fakturacni.length; i++ )
            {
                $('#' + arr_dodaci[i]).val($('#' + arr_fakturacni[i]).val());
            }
        }
    }
}

function basketCopyAddressSingle(input)
{
    var f = $('#fakturacni_' + input);
    var d = $('#dodaci_' + input);

    if ( $('#dodaci_jina').length && $(f).length && $(d).length )
    {
        if ( $('#dodaci_jina').prop('checked') == false )
        {
            $(d).val($(f).val());
        }
    }
}

function basketGetAresData()
{
    basketShowOther();
    getDataAres();
}

function basketShowOther()
{
    $('.kosik-dodaci-udaje-button').addClass('d-none');
    $('.kosik-dodaci-udaje').removeClass('d-none');
}

function basketFillInput(typ)
{

}

function basketSaveAddress()
{
    let idArray = ['ic', 'dic', 'fakturacni_spolecnost', 'fakturacni_ulice', 'fakturacni_mesto', 'fakturacni_psc', 'fakturacni_id_statu', 'fakturacni_jmeno_prijmeni', 'fakturacni_email', 'fakturacni_telefon', 'fakturacni_mobil', 'dodaci_spolecnost', 'dodaci_ulice', 'dodaci_mesto', 'dodaci_psc', 'dodaci_id_statu', 'dodaci_jmeno_prijmeni'];
    let idArrayRequried = ['fakturacni_ulice', 'fakturacni_mesto', 'fakturacni_psc', 'fakturacni_id_statu', 'fakturacni_jmeno_prijmeni', 'fakturacni_email', 'fakturacni_mobil'];
    let idArrayRequiedOtherAddress = ['dodaci_spolecnost', 'dodaci_ulice', 'dodaci_mesto', 'dodaci_psc', 'dodaci_id_statu', 'dodaci_jmeno_prijmeni'];
    let dataArray = {};

    let continueProcess = true;
    for (i = 0; i < idArray.length; i++)
    {
        let value = $('#' + idArray[i]).val();
        dataArray[idArray[i]] = value;
    }

    $.each(idArrayRequried, function( index, value ) {
        if (dataArray[value] == '')
        {
            $('#alert_' + value).removeClass('d-none');
            continueProcess = false;
        }
        else
        {
            if (!$('#alert_' + value).has('d-none'))
            {
                $('#alert_' + value).addClass('d-none');
            }
        }
    });

    if ($('#dodaci_jina').prop('checked') == true)
    {
        $.each(idArrayRequiedOtherAddress, function( index, value ) {
            if (dataArray[value] == '')
            {
                $('#alert_' + value).removeClass('d-none');
                continueProcess = false;
            }
            else
            {
                if (!$('#alert_' + value).has('d-none'))
                {
                    $('#alert_' + value).addClass('d-none');
                }
            }
        });
    }

    if (continueProcess == true)
    {
        getTrasa(dataArray);
    }
}

function saveDodaciUdaje(dataArray)
{
    ajaxCallPromise('basket-save-address', dataArray, true, 'POST').then( result => {
        location.href = result;
    });
}

function basketGetZpusobPlatby(idZpusobuDopravy)
{
    ajaxCallPromise('basket-get-zpusob-platby', {id_zpusobu_dopravy: idZpusobuDopravy}, true, 'GET').then( result => {
        $('#basket-zpusob-platby').html(result);
    });
}

function saveDopravaPlatba()
{
    // get value by name
    let idZpusobuDopravy = $('input[name="id_zpusobu_dopravy"]:checked').val();
    let idZpusobuPlatby = $('input[name="id_zpusobu_platby"]:checked').val();

    if (idZpusobuPlatby > 0  && idZpusobuDopravy > 0)
    {
        $('#alert_platba').addClass('d-none');
        ajaxCallPromise('basket-save-doprava-platba', {id_zpusobu_dopravy: idZpusobuDopravy, id_zpusobu_platby: idZpusobuPlatby}, true, 'POST').then( result => {
            location.href = result;
        });
    }
    else
    {
        if (!idZpusobuPlatby > 0)
        {
            $('#alert_platba').removeClass('d-none');
        }
        if (!idZpusobuDopravy > 0)
        {
            $('#alert_doprava').removeClass('d-none');
        }
    }
}

function basketCreateOrder()
{
    let souhlasVOP = $('#souhlas_vop').prop('checked');
    let souhlasZOOU = $('#souhlas_gdpr').prop('checked');

    if (souhlasVOP && souhlasZOOU)
    {
        let poznamka = $('#poznamka').val();
        ajaxCallPromise('basket-create-order', {poznamka: poznamka}, true, 'POST').then( result => {
            location.href = result;
        });
    }
    else
    {
        $('#alert_souhlasy').removeClass('d-none');
    }
}

function basketZmenaKS(idPolozky, move)
{
    let selector = $('#ks_' + idPolozky);
    let pocetKs = parseInt(selector.val());
    if (move == 'plus')
    {
        pocetKs = pocetKs + 1;
    }
    if (move == 'minus')
    {
        pocetKs = pocetKs - 1;
    }
    let pocetKusuTemp = selector.val();
    pocetKs = basketZmenaKSValidator(idPolozky, pocetKs);

    if (pocetKusuTemp != pocetKs)
    {
        basketZmenaKSUpdate(idPolozky);
    }
}

function basketZmenaKSValidator(idPolozky, pocetKusu)
{
    let selector = $('#ks_' + idPolozky);

    if (!pocetKusu > 0)
    {
        pocetKusu = 1;
    }

    let max = selector.data('max');
    if (max > 0 && pocetKusu >= max)
    {
        pocetKusu = max;
    }
    selector.val(pocetKusu);
    return parseInt(pocetKusu);
}

function basketZmenaKSUpdate(idPolozky)
{
    let selector = $('#ks_' + idPolozky);
    let pocetKs = parseInt(selector.val());
    pocetKs = basketZmenaKSValidator(idPolozky, pocetKs);

    ajaxCallPromise('basket-zmena-poctu-polozky', {'id-polozky': idPolozky, 'pocet-kusu': pocetKs}, true, 'GET').then( result => {
        let array = JSON.parse(result);
        $('#cena_celkem_' + idPolozky).html(array['cena_celkem_polozka']);
        $('#cena_celkem').html(array['cena_celkem_format']);
    });
}

function getTrasaAjax(dataArray, adresa, repeat = false)
{
    $.ajax({
        url: 'https://api.mapy.cz/v1/geocode?apikey=aw4Yt0ch3I0jKR5Jw5ke2P-DWnsdIUuEWWs76mv0IYc&query=' + adresa, // URL, kterou chcete volat
        type: 'GET',
        data: {},
        success: function(response) {
            let items = response.items;
            let item = items[0];
            let position = item.position;

            if (position.hasOwnProperty('lon') && position.hasOwnProperty('lat'))
            {
                chk = true;
                $.ajax({
                    url: 'https://api.mapy.cz/v1/routing/route?apikey=aw4Yt0ch3I0jKR5Jw5ke2P-DWnsdIUuEWWs76mv0IYc&start=16.7536391,50.0274216&end=' + position['lon'] + ',' + position['lat'] + '&routeType=car_fast',
                    type: 'GET',
                    data: {},
                    success: function(responseRoute) {
                        if (responseRoute.hasOwnProperty('length'))
                        {
                            let vzdalenost = parseFloat(responseRoute.length) / 1000;
                            vzdalenost = Math.ceil(vzdalenost);
                            dataArray['vzdalenost'] = vzdalenost;
                            saveDodaciUdaje(dataArray);
                            return true;
                        }
                        else
                        {
                            if (repeat)
                            {
                                getTrasaAjax(dataArray, getAdresaKamMestoPsc());
                            }
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Chyba:', error);
                        if (repeat)
                        {
                            getTrasaAjax(dataArray, getAdresaKamMestoPsc());
                        }
                    }
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('Chyba:', error);
            if (repeat)
            {
                getTrasaAjax(dataArray, getAdresaKamMestoPsc());
            }
        }
    });
}

function getTrasa(dataArray)
{
    getTrasaAjax(dataArray, getAdresaKam(), true);

    return 0;
}

function getAdresaKam()
{
    // nastavení prefixu adres (dodací / fakturační)
    var prefix = 'fakturacni_';

    if ( $('#dodaci_jina').is(':checked') )
    {
        prefix = 'dodaci_';
    }

    var adresa = ''

    adresa = $('#' + prefix + 'mesto').val();
    adresa = adresa + ' ' + $('#' + prefix + 'ulice').val();
    adresa = adresa + ' ' + $('#' + prefix + 'psc').val();

    return adresa
}

function getAdresaKamMestoPsc()
{
    // nastavení prefixu adres (dodací / fakturační)
    var prefix = 'fakturacni_';

    if ( $('#dodaci_jina').is(':checked') )
    {
        prefix = 'dodaci_';
    }

    var adresa = ''

    adresa = $('#' + prefix + 'mesto').val();
    adresa = adresa + ' ' + $('#' + prefix + 'psc').val();

    return adresa
}