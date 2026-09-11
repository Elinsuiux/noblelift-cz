function homepageFiltr()
{
    let idTypuVoziku = $('#typ-voziku').val();
    let idPohonu = $('#pohon').val();
    let nosnostOD = $('#nosnost-od').val();
    let nosnostDO = $('#nosnost-do').val();
    let idVyrobce = $('#vyrobce').val();

    ajaxCallPromise('get-url-homepage-filtr', {'id-pohonu': idPohonu, 'id-typu-voziku': idTypuVoziku, 'nosnost-od': nosnostOD, 'nosnost-do': nosnostDO, 'id-vyrobce': idVyrobce}, true, 'GET').then((response) => {
        location.href = response;
    });
}


function pruvodceVyberemVoziku()
{
    let idPohonu = 0;
    let nosnostOD = $('#nosnost').val();
    let zdvih = $('#zdvih').val();
    let stavebniVyska = $('#stavebni-vyska').val();
    let idTypuVozikuArray = [];

    if ($('#pohon-aku').prop('checked'))
    {
        idPohonu = 5;
    }
    else if ($('#pohon-diesel').prop('checked'))
    {
        idPohonu = 1;
    }
    else if ($('#pohon-plg').prop('checked'))
    {
        idPohonu = 2;
    }

    let typyVoziku = [1,2,3,5,6,7];
    $.each(typyVoziku, function (key, value) {
        if ($('#typ-voziku-' + value).prop('checked'))
        {
            idTypuVozikuArray.push(value);
        }
    });

    let data = {
        'id-pohonu': idPohonu,
        'nosnost-od': nosnostOD,
        'zdvih': zdvih,
        'stavebni-vyska': stavebniVyska,
        'id-typu-voziku': idTypuVozikuArray
    };
    ajaxCallPromise('pruvodce-vyberem-voziku', data, true, 'GET').then((response) => {
        location.href = response;
    });
}


function downloadFile(file, type)
{
    if (file !== '' && type !== '')
    {
        location.href = adr + 'download?file=' + file + '&type=' + type;
    }
}

function servisPoptavka()
{
    let zakoupenoUNas = 0;
    if ($('#zakoupen-u-nas-yes').prop('checked'))
    {
        zakoupenoUNas = 1;
    }

    let stalePouzivan = 0;
    if ($('#stale-pouzivan-yes').prop('checked'))
    {
        stalePouzivan = 1;
    }

    let evidcislo = $('#evidcislo').val();
    let vyrobniCislo = $('#vyrobni_cislo').val();

    let idTypuVoziku = $('#id_typu_voziku').val();
    let idVyrobce = $('#id_vyrobce').val();
    let model = $('#model').val();
    let rokVyroby = $('#rok_vyroby').val();
    let detailniPopis = $('#detailni_popis').val();

    let ic = $('#ic').val();
    let dic = $('#dic').val();
    let fakturacniSpolecnost = $('#fakturacni_spolecnost').val();
    let fakturacniUlice = $('#fakturacni_ulice').val();
    let fakturacniMesto = $('#fakturacni_mesto').val();
    let fakturacniPsc = $('#fakturacni_psc').val();
    let fakturacniEmail = $('#fakturacni_email').val();

    let osobaPoptavkaJmeno = $('#osoba_poptavka_jmeno').val();
    let osobaPoptavkaPrijmeni = $('#osoba_poptavka_prijmeni').val();
    let osobaPoptavkaTelefon = $('#osoba_poptavka_telefon').val();
    let osobaPoptavkaEmail = $('#osoba_poptavka_email').val();

    let umisteniVozikuNazevSpolecnosti = $('#umisteni_voziku_nazev_spolecnosti').val();
    let umisteniVozikuUlice = $('#umisteni_voziku_ulice').val();
    let umisteniVozikuMesto = $('#umisteni_voziku_mesto').val();
    let umisteniVozikuPsc = $('#umisteni_voziku_psc').val();

    let osobaServisJmeno = $('#osoba_servis_jmeno').val();
    let osobaServisPrijmeni = $('#osoba_servis_prijmeni').val();
    let osobaServisTelefon = $('#osoba_servis_telefon').val();


    let schodnaAdresaUmisteniVoziku = 0;
    if ($('#shodne-adresy').prop('checked'))
    {
        schodnaAdresaUmisteniVoziku = 1;
    }

    let shodnaOosbaServis = 0;
    if ($('#shodne_kontaktni_osoby').prop('checked'))
    {
        shodnaOosbaServis = 1;
    }

    let pozadovanyTerminOD = $('#pozadovany_termin_od').val();
    let pozadovanyTerminDO = $('#pozadovany_termin_do').val();
    let pracovniDoba = $('#pracovni_doba').val();

    $('#alert_spatny_termin').addClass('d-none');
    if (pozadovanyTerminDO < pozadovanyTerminOD)
    {
        $('#alert_spatny_termin').removeClass('d-none')
    }


    let emailKopie = 0;
    if ($('#email_kopie').prop('checked'))
    {
        emailKopie = 1;
    }

    let vetsiNezNulaPole = ['id_typu_voziku', 'id_vyrobce'];
    let povinnaPoleArray = ['vyrobni_cislo', 'model', 'detailni_popis', 'ic', 'dic', 'fakturacni_spolecnost', 'fakturacni_ulice', 'fakturacni_mesto', 'fakturacni_psc', 'fakturacni_email', 'osoba_poptavka_jmeno', 'osoba_poptavka_prijmeni', 'osoba_poptavka_telefon', 'osoba_poptavka_email', 'umisteni_voziku_nazev_spolecnosti', 'umisteni_voziku_ulice', 'umisteni_voziku_mesto', 'umisteni_voziku_psc', 'osoba_servis_jmeno', 'osoba_servis_prijmeni', 'osoba_servis_telefon', 'pozadovany_termin_od', 'pozadovany_termin_do', 'pracovni_doba'];

    let vseVyplneno = true;
    $.each(povinnaPoleArray, function (key, value) {
        if ($('#' + value).val() == '')
        {
            vseVyplneno = false;
            $('#alert_' + value).removeClass('d-none');
        }
        else
        {
            $('#alert_' + value).addClass('d-none');
        }
    });

    $.each(vetsiNezNulaPole, function (key, value) {
        if ($('#' + value).val() > 0)
        {
            $('#alert_' + value).addClass('d-none');
        }
        else
        {
            vseVyplneno = false;
            $('#alert_' + value).removeClass('d-none');
        }
    });

    if (!validateEmail(osobaPoptavkaEmail))
    {
        vseVyplneno = false;
        $('#alert_osoba_poptavka_email').removeClass('d-none');
    }


    if (vseVyplneno)
    {
        let data = {
            'zakoupeno_u_nas': zakoupenoUNas,
            'stale_pouzivan': stalePouzivan,
            'evidcislo': evidcislo,
            'vyrobni_cislo': vyrobniCislo,
            'id_typu_voziku': idTypuVoziku,
            'id_vyrobce': idVyrobce,
            'model': model,
            'rok_vyroby': rokVyroby,
            'detailni_popis': detailniPopis,
            'ic': ic,
            'dic': dic,
            'fakturacni_spolecnost': fakturacniSpolecnost,
            'fakturacni_ulice': fakturacniUlice,
            'fakturacni_mesto': fakturacniMesto,
            'fakturacni_psc': fakturacniPsc,
            'fakturacni_email': fakturacniEmail,
            'osoba_poptavka_jmeno': osobaPoptavkaJmeno,
            'osoba_poptavka_prijmeni': osobaPoptavkaPrijmeni,
            'osoba_poptavka_telefon': osobaPoptavkaTelefon,
            'osoba_poptavka_email': osobaPoptavkaEmail,
            'umisteni_voziku_nazev_spolecnosti': umisteniVozikuNazevSpolecnosti,
            'umisteni_voziku_ulice': umisteniVozikuUlice,
            'umisteni_voziku_mesto': umisteniVozikuMesto,
            'umisteni_voziku_psc': umisteniVozikuPsc,
            'osoba_servis_jmeno': osobaServisJmeno,
            'osoba_servis_prijmeni': osobaServisPrijmeni,
            'osoba_servis_telefon': osobaServisTelefon,
            'pozadovany_termin_od': pozadovanyTerminOD,
            'pozadovany_termin_do': pozadovanyTerminDO,
            'pracovni_doba': pracovniDoba,
            'email_kopie': emailKopie,
            'schodna_adresa_umisteni_voziku': schodnaAdresaUmisteniVoziku,
            'shodna_osoba_servis': shodnaOosbaServis,
        };

        ajaxCallPromise('send-servis-poptavka', data, true, 'POST').then((response) => {
            location.reload();
        })
    }

}

function servisStejnaOsobaServisu()
{
    let array = ['jmeno', 'prijmeni', 'telefon'];
    $.each(array, function (key, value) {
        $('#osoba_servis_' + value).val($('#osoba_poptavka_' + value).val());
    });
}

function servisPoptavkaZakoupenoUNas()
{
    if ($('#zakoupen-u-nas-yes').prop('checked'))
    {
        $('#evidcislo-zobrazit').removeClass('d-none');
    }
    else
    {
        $('#evidcislo-zobrazit').addClass('d-none');
    }

}

function getForkliftData()
{
    let evidcislo = $('#evidcislo').val();
    if (evidcislo != '' && evidcislo.length >= 4 && evidcislo.length <= 5)
    {
        ajaxCallPromise('eshop/get-forklift-data', {evidcislo: evidcislo}, true, 'GET').then( result => {
            let responseArray = JSON.parse(result);
            if (responseArray['evidcislo'] != '')
            {
                $('#id_vyrobce').val(responseArray['id_vyrobce']).change();
                $('#model').val(responseArray['nazev_modelu']);
                $('#rok_vyroby').val(responseArray['rok_vyroby']);
                $('#vyrobni_cislo').val(responseArray['vyrobni_cislo']);
                if ($('#id_typu_voziku').length > 0)
                {
                    $('#id_typu_voziku').val(responseArray['id_typu_voziku']).change();
                }
            }
        });
    }
}

function getDataAres()
{
    let ic = $('#ic').val();
    if (ic.length > 6)
    {
        ajaxCallPromise('get-ares-address', {'ic': ic}, true, 'GET').then( result => {
            let data = JSON.parse(result);
            if (data['status'] == 'OK')
            {
                $('#ic').val(data['ico']);
                $('#dic').val(data['dic']);
                $('#fakturacni_ulice').val(data['ulice']);
                $('#fakturacni_psc').val(data['psc']);
                $('#fakturacni_mesto').val(data['mesto']);
                $('#fakturacni_spolecnost').val(data['spolecnost']);
                $('#fakturacni_stat').val(1);

                if ($('#dodaci_spolecnost').length > 0)
                {
                    basketCopyAddress();
                }
                if ($('#umisteni_voziku_nazev_spolecnosti').length > 0)
                {
                    $('#umisteni_voziku_nazev_spolecnosti').val(data['spolecnost']);
                    $('#umisteni_voziku_ulice').val(data['ulice']);
                    $('#umisteni_voziku_mesto').val(data['mesto']);
                    $('#umisteni_voziku_psc').val(data['psc']);
                }

            }
        });
    }
}