
// Načtení vozíků při otevření stránky
$(document).ready(function()
{
    // Pokud nejsou načtené vozíky, tak je načteme
    if ($('#forklifts').length > 0)
    {
        if ($('#forklifts .card').length == 0)
        {
            let urlParams = new URLSearchParams(window.location.search);
            let page = urlParams.get('page');
            if (!page > 0)
            {
                page = 1;
            }
            getForklifts(page);
        }
    }

    activeFilter();

    // Nastavíme change event na inputy k range
    $('.range-input').on('change', function(){
        changeRangeInputDataNEW($(this));
    });
});

// Metoda, která je volaná při změně inputu (checkbox, radio, input)
function processFiltr()
{
    let idElement = this.event.target.id;
    if (idElement !== undefined && idElement.indexOf('top-') !== -1)
    {
        let urlActual = window.location.href;
        let newUrl = $('#offcanvasFiltr').data('url');

        if (idElement == 'top-6' && urlActual.indexOf('top=6') === -1)
        {
            showHideLoading();
            location.href = newUrl + '?top=6';
            return;
        }

        if (idElement != 'top-6' && urlActual.indexOf('top=6') !== -1)
        {
            showHideLoading();
            location.href = newUrl + '?' + idElement.replaceAll('-', '=');
            return;
        }
    }
    getForklifts();
}

// Metoda pro práci s vozíkami (filtr, lazyload)
function getForklifts(page = 1)
{
    if ($('#filtr').length > 0)
    {
        let dataArray = getFiltr();
        let pocetFiltru = Object.keys(dataArray).length;

        $('#filtr-cancel-reset').removeClass('d-none');
        if (pocetFiltru > 7)
        {
            $('.filtr-cancel').removeClass('d-none');
        }
        else
        {
            // $('.filtr-cancel').addClass('d-none');
        }

        dataArray['page'] = page;

        ajaxCallPromise('get-forklifts', dataArray, true, 'GET').then((response) => {

            $('#offcanvasFiltr').removeClass('show');
            $('#forklifts-empty').hide();

            let array = $.parseJSON(response);

            $('#forklifts').html(array['voziky']);
            $('#vzv-paginator').html(array['vzv_paginator']);
            $('#filtr-badge').html(array['filtr_badge_template']);

            // Nove voziky
            $('#nadpis').html(array['nadpis']);
            $('#popis').html(array['popis']);
            $('#breadcrumb').html(array['breadcrumb']);
            $('#breadcrumb-mobile').html(array['breadcrumb']);
            $('#category-wrap').html(array['podkategorie']);

            if (array['pocet_voziku'] == 0)
            {
                $('#forklifts-empty').show();
            }
            let newURL = array['url'];
            let newURLParams = new URLSearchParams(newURL);
            let idCategoryNEWURL = newURLParams.get('id-category');
            if (idCategoryNEWURL === null)
            {
                let urlParams = new URLSearchParams(window.location.search);
                let idCategory = urlParams.get('id-category');
                if (idCategory !== null)
                {
                    newURL += '&id-category=' + idCategory;
                }
            }


            window.history.pushState('page2', 'Title', newURL);

        });
    }
}

// Zpracování filtru
function getFiltr()
{
    let dataArray = {};
    dataArray['nove-voziky'] = $('#nove-voziky').val();
    $.each($('#filtr input'), function (key, value) {
        let typeInput = $(value).attr('type');
        let idInput = $(value).attr('id');
        let valueInput = $(value).val();
        if (typeInput === 'checkbox' || typeInput === 'radio')
        {
            if ($(value).prop('checked'))
            {
                valueInput = 1;
            }
            else
            {
                valueInput = '';
            }
        }
        if (valueInput !== '')
        {
            dataArray[idInput] = valueInput;
        }
    });

    let sortBy = $('#sort-by').val();
    if ($(window).width() < 768)
    {
        sortBy = $('#sort-by-mobile').val();
    }

    if (sortBy > 0)
    {
        dataArray['sort-by'] = sortBy;
    }

    if ($('#lift-from').length) {
        let liftFrom = dataArray['lift'].split(',')[0];
        $('#lift-from').val(liftFrom);
        if (liftFrom > 0)
        {
            dataArray['lift-from'] = liftFrom;
        }
    }

    if ($('#lift-to').length) {
        let liftTo = dataArray['lift'].split(',')[1];
        $('#lift-to').val(liftTo);
        if (liftTo > 0)
        {
            dataArray['lift-to'] = liftTo;
        }
    }

    if ($('#year-from').length) {
        let yearFrom = dataArray['year'].split(',')[0];
        $('#year-from').val(yearFrom);
    }

    if ($('#capacity-from').length) {
        let capacityFrom = dataArray['capacity'].split(',')[0];
        $('#capacity-from').val(capacityFrom);
        if (capacityFrom > 0)
        {
            dataArray['capacity-from'] = capacityFrom;
        }
    }

    if ($('#capacity-to').length) {
        let capacityTo = dataArray['capacity'].split(',')[1];
        $('#capacity-to').val(capacityTo);
        if (capacityTo > 0)
        {
            dataArray['capacity-to'] = capacityTo;
        }
    }

    if ($('#overall-height-from').length) {
        $('#overall-height-from').val(dataArray['overall-height']);
    }

    if ($('#running-hours-from').length) {
        $('#running-hours-from').val(dataArray['running-hours']);
    }

    if ($('#price-from').length) {
        $('#price-from').val(dataArray['price']);
    }

    // Nove voziky
    $.each($('#category-box a'), function (key, value) {

        if($(value).data('click') == true)
        {
            // Vynulujeme checkboxy na fitlru
            removeFiltr();

            dataArray = removeParametrs(dataArray);

            let categoryFiltr = $(value).data('filtr');

            if(categoryFiltr != '')
            {
                let categoryFiltrArray = categoryFiltr.split('&');

                $.each(categoryFiltrArray, function (key, value) {
                    let valueArray = value.split('=');
                    dataArray[valueArray[0]] = parseInt(valueArray[1]);
                    $('#' + valueArray[0]).prop('checked', true);
                })
            }

            dataArray['id-category'] = $(value).data('idcategory');
        }

    });

    $.each($('.new-breadcrumb'), function (key, value) {
        if ($(value).data('click') == true)
        {
            removeFiltr();

            dataArray = removeParametrs(dataArray);

            let categoryFiltr = $(value).data('filtr');

            if(categoryFiltr != '')
            {
                let categoryFiltrArray = categoryFiltr.split('&');
                $.each(categoryFiltrArray, function (key, value) {
                    let valueArray = value.split('=');
                    dataArray[valueArray[0]] = parseInt(valueArray[1]);
                    $('#' + valueArray[0]).prop('checked', true);
                });
            }

            dataArray['id-category'] = $(value).data('idcategory');

            if(sliderlift)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                sliderlift.setValues(parseInt(dataArray['lift-from']), parseInt(dataArray['lift-to']));
            }
            if(slidercapacity)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                slidercapacity.setValues(parseInt(dataArray['capacity-from']), parseInt(dataArray['capacity-to']));
            }

        }
    });

    $.each($('#nosnost-wrap button'), function (key, value) {
        if($(value).data('click') == true)
        {
            removeFiltr();

            dataArray = removeParametrs(dataArray);

            let categoryFiltr = $(value).data('filtr');
            let categoryFiltrArray = categoryFiltr.split('&');

            $.each(categoryFiltrArray, function (key, value) {
                let valueArray = value.split('=');
                dataArray[valueArray[0]] = valueArray[1];
                $('#' + valueArray[0]).prop('checked', true);
            })

            let idKategorieZdvih = '';
            $.each($('#zdvih-wrap button'), function (key, value) {
                if($(value).hasClass('active'))
                {
                    idKategorieZdvih = $(value).data('idcategory');
                }
            });

            dataArray['id-category'] = $(value).data('idcategory').toString() + idKategorieZdvih.toString();

            if(slidercapacity)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                slidercapacity.setValues(parseInt(dataArray['capacity-from']), parseInt(dataArray['capacity-to']));
            }
            if(sliderlift)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                sliderlift.setValues(parseInt(dataArray['lift-from']), parseInt(dataArray['lift-to']));
            }
        }
    });

    $.each($('#zdvih-wrap button'), function (key, value) {
        if($(value).data('click') == true)
        {
            removeFiltr();

            dataArray = removeParametrs(dataArray);

            let categoryFiltr = $(value).data('filtr');
            let categoryFiltrArray = categoryFiltr.split('&');

            $.each(categoryFiltrArray, function (key, value) {
                let valueArray = value.split('=');
                dataArray[valueArray[0]] = valueArray[1];
                $('#' + valueArray[0]).prop('checked', true);
            })

            let idKategorieNosnost = '';
            $.each($('#nosnost-wrap button'), function (key, value) {
                if($(value).hasClass('active'))
                {
                    idKategorieNosnost = $(value).data('idcategory');
                }
            });

            dataArray['id-category']= idKategorieNosnost.toString() + $(value).data('idcategory').toString();

            if(sliderlift)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                sliderlift.setValues(parseInt(dataArray['lift-from']), parseInt(dataArray['lift-to']));
            }
            if(slidercapacity)
            {
                noRefreshslidercapacity = true;
                noRefreshsliderlift = true;
                noRefreshslideryear = true;
                slidercapacity.setValues(parseInt(dataArray['capacity-from']), parseInt(dataArray['capacity-to']));
            }
        }
    });

    if(dataArray['id-category'] == undefined)
    {
        dataArray['id-category'] = $('#id-category').val();
    }

    delete dataArray['capacity'];
    delete dataArray['lift'];
    delete dataArray['year'];
    delete dataArray['overall-height'];
    delete dataArray['running-hours'];
    delete dataArray['price'];

    return dataArray;
}

// offcanvas offcanvas-start show
$( window ).on( "resize", function() {
    activeFilter();
} );

// Nastavení zobrazení filtru
function activeFilter()
{
    let width = $(window).width();
    let selector = $('.katalog-filtr');
    if (width < 800)
    {
        if (!selector.hasClass('offcanvas-start'))
        {
            selector.addClass('offcanvas-start');
            selector.addClass('offcanvas');
        }
    }
    else
    {
        if (selector.hasClass('offcanvas-start'))
        {
            selector.removeClass('offcanvas-start');
            selector.removeClass('offcanvas');
        }
    }
}

function removeParametrs(dataArray)
{
    let filtered = Object.fromEntries(
        Object.entries(dataArray).filter(([key]) =>
            !key.startsWith('type-') && !key.startsWith('power-')
        )
    );

    noRefreshslidercapacity = true;
    noRefreshsliderlift = true;
    noRefreshslideryear = true;
    slidercapacity.setValues($('#capacity-from').data('value-min'), $('#capacity-to').data('value-max'));
    sliderlift.setValues($('#lift-from').data('value-min'), $('#lift-to').data('value-max'));

    delete filtered['capacity-from'];
    delete filtered['capacity-to'];
    delete filtered['lift-from'];
    delete filtered['lift-to'];

    return filtered;
}

function removeFiltr()
{
    // Vynulujeme checkboxy na fitlru
    $.each($('.form-check-input'), function (key, value) {
        $(value).prop('checked', false);
    })
}

// Přepínač na radio aby šlo odznačit
var lastRadio = '';
$("input[type=radio]").on('click', function ()
{
    let id = $(this).attr('id');
    if (lastRadio == id)
    {
        $(this).prop('checked', false);
        lastRadio = '';
    }
    else
    {
        lastRadio = id;
    }
});

// získání vozíku při enteru v search textu
$(document).on('keypress',function(e) {
    if(e.which == 13 && $("#search-text").is(":focus") && $('#forklifts').length > 0)
    {
        getForklifts();
    }
});


// Načte range při změně hodnoty
function setRange(idFrom, idTo, value, noRefresh)
{
    let valueArray = value.split(',');
    let zmenaNenuloveHodnoty = false;
    if (idFrom != '')
    {
        let aktualniHodnotaFrom = $('#' + idFrom).val();
        if (aktualniHodnotaFrom > 0  && aktualniHodnotaFrom != valueArray[0])
        {
            zmenaNenuloveHodnoty = true;
        }
        $('#' + idFrom).val(valueArray[0]);
    }

    if (idTo != '')
    {
        let aktualniHodnotaTo = $('#' + idTo).val();
        if (aktualniHodnotaTo > 0 && aktualniHodnotaTo != valueArray[1])
        {
            zmenaNenuloveHodnoty = true;
        }
        $('#' + idTo).val(valueArray[1]);
    }

    if(noRefresh)
    {
        zmenaNenuloveHodnoty = false;
    }


    if (zmenaNenuloveHodnoty)
    {
        getForklifts();
    }
}

function changeRangeInputDataNEW(element)
{
    let id = element.attr('id');
    let value = element.val();
    let parentID = element.data('id-parent');
    changeRangeInputNEW(id, value, parentID);
}

function changeRangeInputNEW(id, value, parentID)
{
    let data = {
        'id-range': parentID,
    };
    ajaxCallPromise('change-range&' + id + '=' + value, data, false, 'GET').then((response) => {
        $('#filtr-cancel-reset').removeClass('d-none');
        $('#range-' + parentID).html(response);
        getForklifts();
        $('#range-' + parentID + ' .range-input').on('change', function(){
            changeRangeInputDataNEW($(this));
        });
    });
}
function showHideMore(id, action)
{
    if (action == 1)
    {
        $('#' + id).show();
    }
    else
    {
        $('#' + id).hide();
    }
}

function odpocetProdejniAkce()
{
    if ($('.counter').length > 0)
    {
        let odpocet = $('.counter').data('counter');

        var countDownDate = new Date(odpocet*1000).getTime();

        var x = setInterval(function() {

            var now = new Date().getTime();
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('.counter-days-text-init').remove();
            if (days > 0)
            {
                $('.counter-days-value').html(days);
                if (days > 4)
                {
                    $('.counter-days-text-dnu').removeClass('d-none');
                }
                else if (days > 1)
                {
                    $('.counter-days-text-dny').removeClass('d-none');
                }
                else
                {
                    $('.counter-days-text-den').removeClass('d-none');
                }
            }
            else
            {
                $('#counter-days').remove();
            }

            $('.counter-hours-value').html(hours);
            $('.counter-minutes-value').html(minutes);
            $('.counter-seconds-value').html(seconds);


            if (distance < 0)
            {
                clearInterval(x);
                $('.counter').remove();
            }
        }, 1000);
    }
}


function odeslatPoptavku(idUzivatele = 0)
{
    let spolecnost = $('#spolecnost').val();
    let jmenoPrijmeni = $('#jmeno_a_prijmeni').val();
    let email = $('#email').val();
    let telefon = $('#telefon').val();
    let pozadavek = $('#pozadavek').val();

    let odeslatPoptavku = true;

    let validEmail = validateEmail(email);
    if (!validEmail)
    {
        $('#alert_email').removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_email').addClass('d-none');
        localStorage.setItem('fakturacni_email', email);
    }

    if (telefon.length < 6)
    {
        $('#alert_telefon').removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_telefon').addClass('d-none');
        localStorage.setItem('fakturacni_mobil', telefon);
    }

    if (spolecnost.length < 2)
    {
        $('#alert_spolecnost').removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_spolecnost').addClass('d-none');
    }

    if (jmenoPrijmeni.length < 2)
    {
        $('#alert_jmeno_a_prijmeni').removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_jmeno_a_prijmeni').addClass('d-none');
    }

    let idPolozkyArray = [];
    if ($('.poptavka-item').length > 0)
    {
        $.each($('.poptavka-item'), function (key, value) {
            idPolozkyArray.push($(value).data('id'));
        });
    }

    if (odeslatPoptavku)
    {
        ajaxCallPromise('odeslat-poptavku', {spolecnost: spolecnost, jmeno_prijmeni: jmenoPrijmeni, email: email, telefon: telefon, pozadavek: pozadavek, id_polozky_array: idPolozkyArray, id_uzivatele: idUzivatele}).then( result => {
            if (result == 'OK')
            {
                $('#poptavka-result').html('');
                $('#modal-poptat-vozik').modal('hide');
                if ($('#poptavka').length > 0)
                {
                    $('#poptavka').modal('hide');
                }
                if ($('#modal-poptat-pz').length > 0)
                {
                    $('#modal-poptat-pz').modal('hide');
                }
                if ($('#modal-poptat-kontaktni-formular').length > 0)
                {
                    $('#modal-poptat-kontaktni-formular').modal('hide');
                }

                TrackEventGA('sendform', 'inquiry', 'detail_vzv', '', email, telefon);
                window.dataLayer = window.dataLayer || [];
                if ($('.poptavka-item').length > 0)
                {
                    $.each($('.poptavka-item'), function (key, value) {
                        let selector = $(value);
                        let idPolozky = selector.data('id');
                        let cena = selector.data('price');
                        let jazyk = selector.data('lang');
                        let mena = 'CZK';
                        if (jazyk != 'cz')
                        {
                            mena = 'EUR';
                        }
                        let objectData = {
                            'event': 'poptat',
                            'id': idPolozky,
                            'price': cena  + ' ' + mena,
                        };

                        if (localStorage.getItem('enableGtag'))
                        {
                            window.dataLayer.push(objectData);
                        }
                        else
                        {
                            console.log(objectData);
                        }
                    });
                }



            }
            else
            {
                $('#poptavka-result').html(result);
            }
        });
    }
}

function odeslatPoptavkuNovyVozik(idUzivatele, idPolozky)
{
    let spolecnost = $('#spolecnost_' + idPolozky).val();
    let jmenoPrijmeni = $('#jmeno_a_prijmeni_' + idPolozky).val();
    let email = $('#email_' + idPolozky).val();
    let telefon = $('#telefon_' + idPolozky).val();
    let pozadavek = $('#pozadavek_' + idPolozky).val();

    let odeslatPoptavku = true;

    let validEmail = validateEmail(email);
    if (!validEmail)
    {
        $('#alert_email_' + idPolozky).removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_email_' + idPolozky).addClass('d-none');
        localStorage.setItem('fakturacni_email', email);
    }

    if (telefon.length < 6)
    {
        $('#alert_telefon_' + idPolozky).removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_telefon_' + idPolozky).addClass('d-none');
        localStorage.setItem('fakturacni_mobil', telefon);
    }

    if (spolecnost.length < 2)
    {
        $('#alert_spolecnost_' + idPolozky).removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_spolecnost_' + idPolozky).addClass('d-none');
    }

    if (jmenoPrijmeni.length < 2)
    {
        $('#alert_jmeno_a_prijmeni_' + idPolozky).removeClass('d-none');
        odeslatPoptavku = false;
    }
    else
    {
        $('#alert_jmeno_a_prijmeni_' + idPolozky).addClass('d-none');
    }

    let idPolozkyArray = [];
    idPolozkyArray.push(idPolozky);

    if (odeslatPoptavku)
    {
        ajaxCallPromise('odeslat-poptavku', {spolecnost: spolecnost, jmeno_prijmeni: jmenoPrijmeni, email: email, telefon: telefon, pozadavek: pozadavek, id_polozky_array: idPolozkyArray, id_uzivatele: idUzivatele}).then( result => {
            if (result == 'OK')
            {
                $('#poptavka-result').html('');
                $('#modal-poptat-vozik-'+ idPolozky).modal('hide');
                if ($('#poptavka').length > 0)
                {
                    $('#poptavka').modal('hide');
                }
                if ($('#modal-poptat-pz').length > 0)
                {
                    $('#modal-poptat-pz').modal('hide');
                }
                if ($('#modal-poptat-kontaktni-formular').length > 0)
                {
                    $('#modal-poptat-kontaktni-formular').modal('hide');
                }

                TrackEventGA('sendform', 'inquiry', 'detail_vzv', '', email, telefon);
                window.dataLayer = window.dataLayer || [];
                if ($('.poptavka-item').length > 0)
                {
                    $.each($('.poptavka-item'), function (key, value) {
                        let selector = $(value);
                        let idPolozky = selector.data('id');
                        let cena = selector.data('price');
                        let jazyk = selector.data('lang');
                        let mena = 'CZK';
                        if (jazyk != 'cz')
                        {
                            mena = 'EUR';
                        }
                        let objectData = {
                            'event': 'poptat',
                            'id': idPolozky,
                            'price': cena  + ' ' + mena,
                        };

                        if (localStorage.getItem('enableGtag'))
                        {
                            window.dataLayer.push(objectData);
                        }
                        else
                        {
                            console.log(objectData);
                        }
                    });
                }



            }
            else
            {
                $('#poptavka-result').html(result);
            }
        });
    }
}

function getPDF(idPolozky)
{
    ajaxCallPromise('create-pdf-detail', {id_polozky: idPolozky}).then( result => {
        downloadFile(result, 'favourite');
    });
}

function openFiltr() {
    $('#offcanvasFiltr').addClass('show');
}