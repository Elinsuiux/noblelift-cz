function splatkovaKalkulacka(porizovaciCena = 0, zobrazitClassicLeasing = 0)
{
    if (porizovaciCena == 0)
    {
        porizovaciCena = getPorizovaciCena();
    }
    if (porizovaciCena > 0)
    {
        ajaxCallPromise('splatkova-kalkulacka-uver', {'cena': porizovaciCena, 'zobrazit-classic-leasing': zobrazitClassicLeasing}, true, 'GET').then((response) => {
            $('#splatkova-kalkulacka-modal-content').html(response);
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