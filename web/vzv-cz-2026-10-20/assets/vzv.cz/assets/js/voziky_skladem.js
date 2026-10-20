
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
        else
        {
            rewriteDetailLinks();
            tagRepasStickers();
        }
    }

    injectRucniPohonIcon();
    mountFiltrActions();
    activeFilter();

    // Nastavíme change event na inputy k range
    $('.range-input').on('change', function(){
        changeRangeInputDataNEW($(this));
    });
});

function rewriteDetailLinks()
{
    var path = window.location.pathname || '';
    var marker = '/voziky-skladem/';
    var prefix = '';
    var idx = path.indexOf(marker);
    if (idx !== -1)
    {
        var rest = path.slice(idx + marker.length);
        var extra = rest.split('/').filter(function (p) {
            return p && p !== 'index.html';
        }).length;
        if (extra > 0)
        {
            prefix = '../'.repeat(extra);
        }
    }
    $('#forklifts a[href]').each(function () {
        var href = $(this).attr('href') || '';
        var m = href.match(/aktualne-skladem\/voziky-skladem\/(?:nove-voziky\/)?([a-z0-9\-]+)\/?(?:[?#].*)?$/i);
        if (!m || m[1] === 'nove-voziky')
        {
            return;
        }
        $(this).attr('href', prefix + m[1] + '/index.html');
        $(this).removeAttr('target');
    });
    bindForkliftCardClicks();
}

function bindForkliftCardClicks()
{
    $('#forklifts .card').each(function () {
        var $card = $(this);
        $card.find('a[target="_blank"]').removeAttr('target');
        var href = $card.find('a[href]').filter(function () {
            var h = $(this).attr('href') || '';
            return /index\.html/i.test(h) && !/kosik|youtu|mailto:|tel:/i.test(h);
        }).first().attr('href');
        if (!href)
        {
            return;
        }
        $card.off('click.vzvcard').on('click.vzvcard', function (e) {
            if ($(e.target).closest('button, .btn, a[href*="youtu"], a[href*="kosik"], .favourite-button, .compare-button, input, select, textarea').length)
            {
                return;
            }
            var $link = $(e.target).closest('a[href]');
            if ($link.length)
            {
                $link.removeAttr('target');
                return;
            }
            window.location.href = href;
        });
    });
}

function tagRepasStickers()
{
    $('#forklifts .sticker-repas').each(function () {
        var t = ($(this).text() || '').replace(/\s+/g, ' ').trim().toLowerCase();
        $(this).removeClass('sticker-repas-probiha sticker-repas-hotovo');
        if (t.indexOf('probíhá') !== -1 || t.indexOf('probiha') !== -1) {
            $(this).addClass('sticker-repas-probiha');
        } else {
            $(this).addClass('sticker-repas-hotovo');
        }
    });
}

// Metoda, která je volaná při změně inputu (checkbox, radio, input)
function processFiltr(applyNow)
{
    let target = (window.event && window.event.target) ? window.event.target : null;
    let idElement = target ? target.id : '';
    let mobile = $(window).width() < 800;
    let isChoice = target && (target.type === 'checkbox' || target.type === 'radio');
    if (mobile && isChoice && applyNow !== true)
    {
        return;
    }
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
    let fromSearch = target && target.closest && target.closest('#button-addon2');
    let closePanel = applyNow === true || !!fromSearch;
    if (fromSearch && mobile)
    {
        $('#offcanvasFiltr').removeClass('show');
    }
    getForklifts(1, closePanel);
}

// Metoda pro práci s vozíkami (filtr, lazyload)
function getForklifts(page = 1, closeAfter)
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

            if (closeAfter && $(window).width() < 800)
            {
                $('#offcanvasFiltr').removeClass('show');
            }
            $('#forklifts-empty').hide();

            let array = $.parseJSON(response);

            $('#forklifts').html(array['voziky']);
            rewriteDetailLinks();
            tagRepasStickers();
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
function syncDualRange(dataArray, key)
{
    if (!dataArray[key] || !$('#' + key + '-from').length)
    {
        return;
    }
    let parts = String(dataArray[key]).split(',');
    let fromVal = parts[0];
    let toVal = parts.length > 1 ? parts[1] : '';
    let $from = $('#' + key + '-from');
    let $to = $('#' + key + '-to');
    $from.val(fromVal);
    if ($to.length && toVal !== '')
    {
        $to.val(toVal);
    }
    let minDefault = String($from.data('value-min'));
    let maxDefault = $to.length ? String($to.data('value-max')) : '';
    if (toVal === '')
    {
        dataArray[key + '-from'] = fromVal;
        return;
    }
    if (String(fromVal) !== minDefault)
    {
        dataArray[key + '-from'] = fromVal;
    }
    if (String(toVal) !== maxDefault)
    {
        dataArray[key + '-to'] = toVal;
        if (key === 'price' || key === 'overall-height' || key === 'running-hours')
        {
            dataArray[key + '-from'] = toVal;
        }
    }
}

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

    delete dataArray['year-from'];
    delete dataArray['year-to'];
    delete dataArray['overall-height-from'];
    delete dataArray['overall-height-to'];
    delete dataArray['running-hours-from'];
    delete dataArray['running-hours-to'];
    delete dataArray['price-from'];
    delete dataArray['price-to'];
    syncDualRange(dataArray, 'year');
    syncDualRange(dataArray, 'overall-height');
    syncDualRange(dataArray, 'running-hours');
    syncDualRange(dataArray, 'price');

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
    noRefreshslideroverallheight = true;
    noRefreshsliderrunninghours = true;
    noRefreshsliderprice = true;
    slidercapacity.setValues($('#capacity-from').data('value-min'), $('#capacity-to').data('value-max'));
    sliderlift.setValues($('#lift-from').data('value-min'), $('#lift-to').data('value-max'));
    if (typeof slideroverallheight !== 'undefined' && $('#overall-height-to').length)
    {
        slideroverallheight.setValues($('#overall-height-from').data('value-min'), $('#overall-height-to').data('value-max'));
    }
    if (typeof sliderrunninghours !== 'undefined' && $('#running-hours-to').length)
    {
        sliderrunninghours.setValues($('#running-hours-from').data('value-min'), $('#running-hours-to').data('value-max'));
    }
    if (typeof slideryear !== 'undefined' && $('#year-to').length)
    {
        slideryear.setValues($('#year-from').data('value-min'), $('#year-to').data('value-max'));
    }
    if (typeof sliderprice !== 'undefined' && $('#price-to').length)
    {
        sliderprice.setValues($('#price-from').data('value-min'), $('#price-to').data('value-max'));
    }

    delete filtered['capacity-from'];
    delete filtered['capacity-to'];
    delete filtered['lift-from'];
    delete filtered['lift-to'];
    delete filtered['overall-height-from'];
    delete filtered['overall-height-to'];
    delete filtered['running-hours-from'];
    delete filtered['running-hours-to'];
    delete filtered['year-from'];
    delete filtered['year-to'];
    delete filtered['price-from'];
    delete filtered['price-to'];

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
        if ($(window).width() < 800)
        {
            $('#offcanvasFiltr').removeClass('show');
        }
        getForklifts(1, true);
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
    let $toggle = $('#' + id);
    let panelId = id.replace(/-ac$/, '');
    let $panel = $('#' + panelId);
    if (action == 1)
    {
        $toggle.show();
        $panel.removeClass('show');
    }
    else
    {
        $toggle.hide();
        $panel.addClass('show');
    }
    if (window.event)
    {
        window.event.preventDefault();
        window.event.stopPropagation();
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

function mountFiltrActions()
{
    var rows = document.querySelectorAll('#filtr .filtr-cancel');
    if (!rows.length) {
        return;
    }
    if (!document.getElementById('filtr-actions-style')) {
        var style = document.createElement('style');
        style.id = 'filtr-actions-style';
        style.textContent = ''
            + '#filtr .filtr-cancel { display: block !important; margin-bottom: 20px; }'
            + '#filtr .filtr-close-row { display: flex; justify-content: flex-end; padding: 2px 4px 6px; }'
            + '#filtr .filtr-close { border: 0; background: transparent; color: #1a1a1a; font-size: 32px; line-height: 1; padding: 0 6px; cursor: pointer; }'
            + '#filtr .filtr-actions { display: flex; gap: 8px; justify-content: center; align-items: stretch; }'
            + '#filtr .filtr-btn { flex: 1 1 0; background: transparent !important; background-color: transparent !important; box-shadow: none !important; text-transform: uppercase; font-weight: 700; font-size: 12px; line-height: 1.2; padding: 8px 6px; border-radius: 4px; text-decoration: none !important; text-align: center; }'
            + '#filtr .filtr-btn-reset { border: 1px solid #cfcfcf !important; color: #4a4a4a !important; }'
            + '#filtr .filtr-btn-apply { border: 1px solid #0E6303 !important; color: #0E6303 !important; }'
            + '@media (min-width: 800px) { #filtr .filtr-close-row { display: none; } }'
            + '#filtr .form-check-input:checked[type=radio] { background-image: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23333333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.15\' d=\'M3.3 8.3l2.9 3 6.5-6.7\'/%3e%3c/svg%3e") !important; background-size: 14px 14px !important; background-position: center !important; background-repeat: no-repeat !important; }';
        document.head.appendChild(style);
    }
    rows.forEach(function (row) {
        if (row.getAttribute('data-filtr-actions') === '1') {
            return;
        }
        row.setAttribute('data-filtr-actions', '1');
        row.classList.remove('d-none');
        var col = row.querySelector('.col-12') || row;
        col.className = 'col-12 filtr-actions';
        col.innerHTML = '';
        if (row === rows[0]) {
            var closeRow = document.createElement('div');
            closeRow.className = 'filtr-close-row';
            var closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'filtr-close';
            closeBtn.setAttribute('aria-label', 'Zavřít filtr');
            closeBtn.textContent = '\u00d7';
            closeBtn.addEventListener('click', function () {
                $('#offcanvasFiltr').removeClass('show');
            });
            closeRow.appendChild(closeBtn);
            row.insertBefore(closeRow, col);
        }
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'btn filtr-btn filtr-btn-reset';
        reset.textContent = 'Zrušit filtr';
        reset.addEventListener('click', function (event) {
            event.preventDefault();
            var filtr = document.getElementById('filtr');
            filtr.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function (input) {
                input.checked = false;
            });
            var search = document.getElementById('search-text');
            if (search) {
                search.value = '';
            }
            filtr.querySelectorAll('.range-input').forEach(function (input) {
                if (input.id.slice(-5) === '-from' && input.getAttribute('data-value-min') != null) {
                    input.value = input.getAttribute('data-value-min');
                }
                if (input.id.slice(-3) === '-to' && input.getAttribute('data-value-max') != null) {
                    input.value = input.getAttribute('data-value-max');
                }
            });
            getForklifts(1, false);
        });
        var apply = document.createElement('button');
        apply.type = 'button';
        apply.className = 'btn filtr-btn filtr-btn-apply';
        apply.textContent = 'Použít filtr';
        apply.addEventListener('click', function () {
            processFiltr(true);
        });
        col.appendChild(reset);
        col.appendChild(apply);
    });
}

function injectRucniPohonIcon()
{
    var hand = '<svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="svgParamsRucni" class="svgParams svgParamsRucni" xmlns="http://www.w3.org/2000/svg"><g id="five_x2C__gesture_x2C__hand_x2C__stop_3_"><g><path class="svgHighlight" d="m15.01 31c-6.24 0-7.75-5.7-8.68-9.25-.3-1.13-.56-2.1-.87-2.61l-4.32-7.74c-.23-.42-.28-.89-.14-1.35.15-.5.51-.92.97-1.16.9-.47 1.96-.19 2.47.65l4.16 6.86c.04.07.14.23.2.26-.03-.05-.1-.24-.12-.3l-3.73-9.78c-.35-1 .15-2.13 1.11-2.53.48-.21 1.05-.21 1.55-.01.49.2.87.56 1.07 1.03l4 9.6c.05.14.09.2.12.23 0-.03 0-.11-.03-.23l-2.31-11.17c-.21-1.15.6-2.24 1.83-2.48 1.09-.21 2.25.54 2.49 1.58l2.33 10.88c.04.17.07.22.09.24-.01-.04 0-.18 0-.23l.11-9.29c-.01-.48.22-1.02.6-1.4.39-.39.87-.59 1.47-.58 1.27.02 2.02 1.09 2 2.11l.02 10.08c-.02 1.31.37 2.77.98 3.72.09.13.23.29.43.3.19.03.41-.12.59-.35.76-.94 1.9-2.3 3.11-3.3.67-.56 1.55-.8 2.43-.66.89.15 1.67.68 2.15 1.46.12.2.09.46-.08.62l-1.43 1.38c-1.39 1.35-2.48 2.98-3.22 4.83-.85 2.12-1.73 3.89-2.6 5.24-1.48 2.29-3.58 2.63-5.62 2.96-.29.05-.59.1-.88.15-.81.17-1.56.24-2.25.24zm-12.13-21.34c-.15 0-.29.04-.44.11 0 0 0 0-.01 0-.23.12-.41.33-.48.57-.04.14-.07.35.05.57l4.31 7.72c.38.62.66 1.66.98 2.87 1.07 4.07 2.54 9.65 9.78 8.31.3-.06.6-.1.9-.15 1.98-.32 3.7-.6 4.94-2.52.84-1.3 1.69-3.01 2.52-5.07.8-1.98 1.96-3.72 3.46-5.17l1.12-1.08c-.32-.36-.75-.6-1.22-.68-.59-.1-1.18.06-1.62.44-1.14.95-2.24 2.26-2.97 3.16-.39.48-.9.74-1.42.72-.48-.02-.91-.29-1.22-.76-.73-1.13-1.16-2.76-1.14-4.27l-.03-10.1c0-.29-.17-1.08-1.02-1.1-.29-.02-.54.09-.74.29-.22.22-.31.5-.31.68l-.11 9.29c-.08.94-.56 1.17-.94 1.21-.33.03-.91-.06-1.13-.98l-2.34-10.91c-.11-.52-.76-.91-1.32-.81-.77.15-1.13.79-1.04 1.31l2.32 11.15c.18.85-.23 1.28-.68 1.4-.2.06-.92.2-1.32-.82l-4-9.59c-.08-.21-.27-.39-.51-.48-.26-.1-.55-.1-.79 0-.48.2-.74.78-.57 1.26l3.72 9.78c.34.93-.02 1.35-.39 1.53-.32.16-.93.29-1.47-.61l-4.16-6.88c-.15-.25-.42-.39-.71-.39z"></path></g></g></svg>';
    $('.boxDetailPictogram').each(function () {
        var $box = $(this);
        var label = $.trim($box.find('.boxProductDataPictogramLabel').first().text());
        var value = $.trim($box.find('.fw-bold').first().text());
        if (label !== 'Pohon') {
            return;
        }
        if (!/ru[cč]n/i.test(value)) {
            return;
        }
        var $ico = $box.find('.ico-parameter').first();
        if ($ico.find('svg').length) {
            return;
        }
        $ico.html(hand);
    });
}
