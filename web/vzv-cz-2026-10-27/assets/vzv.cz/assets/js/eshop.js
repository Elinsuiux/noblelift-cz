function nahradniDilyZobrazitKategorii(idKategorie, nazevKategorie)
{
    console.log(nazevKategorie);
    ajaxCallPromise('eshop/get-nahradni-dily', {'id-kategorie': idKategorie}, true, 'GET').then( result => {
        window.history.replaceState({}, "Page", adr + "eshop/" + nazevKategorie);
        $('#nahradni-dily-vypis-kategorie').html(result);
    });

}

function odeslatPoptavkuND(idUzivatele)
{
    let email = $('#email').val();
    let telefon = $('#telefon').val();

    if (validateEmail(email) === false)
    {
        email = '';
    }
    if (telefon.length < 6)
    {
        telefon = '';
    }

    let data =  {
        id_vyrobce: $('#id_vyrobce').val(),
        model: $('#model').val(),
        rok_vyroby: $('#rok_vyroby').val(),
        vyrobni_cislo: $('#vyrobni_cislo').val(),
        evidcislo: $('#evidcislo').val(),
        poznamka: $('#poznamka').val(),
        spolecnost: $('#spolecnost').val(),
        jmeno_prijmeni: $('#jmeno_prijmeni').val(),
        email: email,
        telefon: telefon,
        id_uzivatele: idUzivatele,
    };


    let povinnaPole = ['model', 'rok_vyroby', 'poznamka', 'spolecnost', 'jmeno_prijmeni', 'email', 'telefon'];
    let chyba = false;

    $.each(povinnaPole, function(index, value) {
        if (data[value] === '')
        {
            chyba = true;
            $('#' + value + '_error').removeClass('d-none');
        }
        else
        {
            $('#' + value + '_error').addClass('d-none');
        }
    });

    if (chyba === false)
    {
        ajaxCallPromise('eshop/odeslat-poptavku', data, true, 'POST').then( result => {
            if (result == 'OK')
            {
                $('#modal-nahradni-dily').modal('hide');
            }
            else
            {
                $('#poptavka_nd_result').html(result);
            }
        });
    }

}