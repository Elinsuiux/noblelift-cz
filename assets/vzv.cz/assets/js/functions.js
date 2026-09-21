// načte konfiguraci
window.adr = ''; // adresa pro localhost
window.is_polozky_chk_detected = false;

var regular_chuf = RegExp('chuf.com');
var regular_nejlevnejsivzv = RegExp('nejlevnejsivzv.cz');
var regual_development = RegExp('chuf2018');

if(regular_chuf.test(document.URL))
{
    var config_file = 'config_js_chuf.txt';
}
else if(regular_nejlevnejsivzv.test(document.URL))
{
    var config_file = 'config_js_nejlevnejsivzv.txt';
}
else if(regual_development.test(document.URL))
{
    var config_file = 'config_js_development.txt';
}
else
{
    var config_file = 'config_js_development.txt';
//    var config_file = 'config_js_chuf.txt';
}

$.get( getUrlRoot() + config_file, function(data)
{
    window.adr = data;
});

// rozšíření jquery pro vrácení hodnoty radio group
jQuery.fn.extend(
    {
        groupVal: function()
        {
            return $(this).filter(':checked').val();
        }
    });


// vrací cestu, kde je uložen config (root, který je jíný na ostrým a jiný na lokále)
function getUrlRoot()
{
    var url = document.URL;

    if ( url.indexOf('localhost') !== -1 )
    {
        // localhost
        var arr_url = url.split('/');
        var arr_url_localhost = new Array();
        var i=0;
        var chk_counter = 0;



        while (arr_url[i] != 'localhost')
        {
            i++;
        }


        for ( i=0; i<arr_url.length; i++)
        {
            if ( arr_url[i] == 'localhost' )
            {
                chk_counter++;
            }

            if ( chk_counter > 0 )
            {
                chk_counter++;
            }

            if ( chk_counter < 4 )
            {
                arr_url_localhost[i] = arr_url[i];
            }

        }

        if ( arr_url_localhost.length > 0 )
        {
            return arr_url_localhost.join('/') + '/';
        }
        else
        {
            alert('getUrlRoot(): nenalezen localhost');
        }


    }

    // ostrý web
    return '/';
}


function ReplaceAll(str,replace,with_this)
{
    var str_hasil = "";
    var temp;
    for(var i=0;i<str.length;i++)
    {
        if (str[i] == replace)
        {
            temp = with_this;
        }
        else
        {
            temp = str[i];
        }
        str_hasil += temp;
    }
    return str_hasil;
}


// testuje, jestli je ve viewporru zadaný element
$.fn.isInViewport = function()
{
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};


function ShowHideLoading()
{
    if ( $('.body').length )
    {
        if ( $('.wrap-loading').hasClass('show-loading') )
        {
            $('.wrap-loading').removeClass('show-loading');
        }
        else
        {
            $('.wrap-loading').addClass('show-loading');
        }
    }
}


///////////////////////////////////////////
// vrátí info o uživateli pro GA události
///////////////////////////////////////////

// odhlášení uživatele
$(document).ready(function()
{
    $('#but_logout').click(function()
    {
        ShowHideLoading();

        $.ajax(
            {
                type: 'POST',
                async: false,
                url: 'index.php',
                data: {
                    ajax: 'logout',
                },
                success: function(response)
                {
                    window.location.href = response;
                },
            });

        ShowHideLoading();
    });
});



// registrace uživatele a nastavení účtu
$(document).ready(function()
{
    /////////////////////////////////////
    // propíše do hiddenu název státu ze selectboxu
    /////////////////////////////////////

    $('#fakturacni_id_statu').change(function(event)
    {
        // propíše název státu u fakturační adresy
        GetNazevStatuFromSelectbox('fakturacni_id_statu', 'fakturacni_');
    });

    $('#dodaci_id_statu').change(function(event)
    {
        // propíše název státu u fakturační adresy
        GetNazevStatuFromSelectbox('dodaci_id_statu', 'dodaci_');
    });
});



///////////////////////////////////////////
// eshop - podle vybrané země nastaví, jestli je VAT/DIČ povinné nebo ne
///////////////////////////////////////////

function GetNazevStatuFromSelectbox(selectbox, prefix)
{
    // vloží do hiddenu text selected položky
    $('#' + prefix + 'stat').val($("#" + selectbox + " option:selected").text());
}

/////////////////////////////////////
// ukládání na disk přes javascript
/////////////////////////////////////


////////////////////////////////////
// Obecne funkce
////////////////////////////////////

function ReplaceAll(string, inToReplace, inReplaceWith)
{
    var outString = string;
    while (true) {
        var idx = outString.indexOf(inToReplace);
        if (idx == -1) {
            break;
        }
        outString = outString.substring(0, idx) + inReplaceWith +
            outString.substring(idx + inToReplace.length);
    }
    return outString;
}


//////////////////////////////////////
// můj profil / můj účet / zavření
//////////////////////////////////////

$(document).ready(function()
{
    $('.wrapCloseMyProfile').click(function()
    {
        $('#aHeaderMyProfile').trigger('click');
    });
});

function formatTelefonniCislo(telefon)
{
    telefon = telefon.replaceAll('(', '');
    telefon = telefon.replaceAll(')', '');
    telefon = telefon.replaceAll(' ', '');
    if (telefon.indexOf('+') === 0)
    {
        return telefon;
    }
    return '';
}


/////////////////////////////////////
// trackování událostí na webu
/////////////////////////////////////

function TrackEventGA(Category, Action, Label, Value, email = '', telefon = '')
{
    //console.log('kat: ' + Category + ' akce: ' + Action + ' štítek: ' + Label + ' hodnota: ' + Value);
    email = email.replaceAll(' ');
    telefon = formatTelefonniCislo(telefon);

    let gtagObj = {
        'event_category': Action,
        'event_label': Label,
        'value': Value,
    };
    let fakturacniEmail = localStorage.getItem('fakturacni_email');
    let fakturacniMobil = localStorage.getItem('fakturacni_mobil');
    if (email.length > 0)
    {
        gtagObj.email_zakaznika = email;
    }
    else if (fakturacniEmail !== null)
    {
        gtagObj.email_zakaznika = fakturacniEmail;
    }

    if (telefon !== '')
    {
        gtagObj.telefon_zakaznika = telefon;
    }
    else if (fakturacniMobil !== null)
    {
        gtagObj.telefon_zakaznika = fakturacniMobil;
    }

    if (typeof (ga) !== "undefined")
    {
        setConsentCookie();
        //ga('send', 'event', Category, Action, Label, Value);
        gtag('event', Category, gtagObj);
    }
}



/////////////////////////////////////
// vrátí parametry z GETu - https://www.creativejuiz.fr/blog/en/javascript-en/read-url-get-parameters-with-javascript
/////////////////////////////////////




//////////////////////////////////////
// při psaní do inputu povolí pouze čísla
//////////////////////////////////////

function isNumberKey(evt)
{
    var charCode = (evt.which != undefined) ? evt.which : event.keyCode;

    // 45 = minus, 46 = delete, 8 = backspace, 44 = comma,  31 dot
    if ((/*charCode != 45 && */charCode != 46 && charCode != 8 && charCode != 44)  && charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }

    return true;
}


//////////////////////////////////////
// nastavení kontroly pro zobrazení resetu filtru
//////////////////////////////////////



//////////////////////////////////////
// GA tracking events - on load
//////////////////////////////////////

function GetGaEvents()
{
}


$(document).ready(function()
{
    GetGaEvents();
});


// plovoucí menu
$(document).ready(function()
{
    // šířka okna prohlížeče
    var w = window.innerWidth;

    if ( w>600 )
    {
        if ( $('.wrapImportantInformation').length )
        {
            var hHeader = $('.wrapHeader').height();
            var hImportantInformation = 0;
            if ( $('.wrapImportantInformation').length )
            {
                $('.wrapImportantInformation').height();
            }

            var h = hImportantInformation + hHeader;

            $('.boxFakeHeader').height(h);
            $('.wrapHeader').css({top: hImportantInformation});
        }

        $(window).scroll(function(){
            if ($(this).scrollTop() > 100)
            {
                $('#wrapBackOnTop').addClass('wrapBackOnTopFloating');
            }
            else
            {
                $('#wrapBackOnTop').removeClass('wrapBackOnTopFloating');
            }
        });
    }
    else
    {
        $('#wrapBackOnTop').addClass('wrapBackOnTopFloating');

        setTimeout(function()
        {
            var hHeader = $('.wrapHeader').height();

            if ( $('.wrapImportantInformation').length )
            {

                var hImportantInformation = 0;
                if ( $('.wrapImportantInformation').length )
                {
                    $('.wrapImportantInformation').height();
                }
                var h = hImportantInformation + hHeader;

                $('.boxFakeHeader').height(h);
                $('.wrapHeader').css({top: hImportantInformation});
            }
            else
            {
                $('.boxFakeHeader').height(hHeader);
            }
        }, 100);

    }
});



// sliding filter
$(document).ready(function()
{
    // zobrazí / skryje boční filtr
    $('#butShowSlidingFiler, #butHideSlidingFilter').click(function()
    {
        if ( $('.wrapSlidingFilter').is(':visible') )
        {
            // skryje
            $('.wrapSlidingFilter').hide('slide', { direction: 'left' }, 300);
        }
        else
        {
            // zobrazí
            var w = window.innerWidth;

            if ( w <= 800 )
            {
                $('.wrapSlidingFilter').show('slide', { direction: 'left' }, 300);

                if ( $("#wrapNiceScrollFilter").hasClass('wrapNiceScrollFilter')==false )
                {
                    $("#wrapNiceScrollFilter").addClass('wrapNiceScrollFilter');
                }
            }
            else
            {
                $("#wrapNiceScrollFilter").removeClass('wrapNiceScrollFilter');
            }

            setWidthSumoSelect();


            $("#form_vzv .wrapNiceScrollFilter").niceScroll().resize();
        }
    });


    // nastavví výšku sekcí bočního filltru
    $('[data-height]').each(function()
    {
        if ( !$(this).hasClass('slidingFilterSectionClosed') )
        {
            var h = $(this).attr('data-height')
            $(this).height(h);
        }
        else
        {
            $(this).height(50);
        }

    });


    // zobrazí / skryje obsah sekcí bočního filtru po kliknutí na dropdown
    /*
        $('.butShowSectionOfSlidingFilter').click(function()
        {
            var elmButArrow = $(this);
            var elmSection = $(this).parent().parent();

            if ( $(elmSection).hasClass('slidingFilterSectionClosed') )
            {
                // rozbalí sekci
                $(elmButArrow).removeClass('butShowSectionOfSlidingFilterClose');
                $(elmSection).removeClass('slidingFilterSectionClosed');

                var hSection = $(elmSection).attr('data-height');
                $(elmSection).animate({height:hSection},500);
            }
            else
            {
                // zabalí sekci
                $(elmButArrow).addClass('butShowSectionOfSlidingFilterClose');
                $(elmSection).addClass('slidingFilterSectionClosed');

                $(elmSection).animate({height:50},200);
            }
        });
    */
    // zobrazí / skryje obsah sekcí bočního filtru po kliknutí na label sekce
    $('.wrapLabelFilterSection').click(function()
    {
        var elmButArrow = $(this).children('.butShowSectionOfSlidingFilter');
        var elmSection = $(this).parent();

        if ( $(elmSection).hasClass('slidingFilterSectionClosed') )
        {
            // rozbalí sekci
            $(elmButArrow).removeClass('butShowSectionOfSlidingFilterClose');
            $(elmSection).removeClass('slidingFilterSectionClosed');

            var hSection = $(elmSection).attr('data-height');
            $(elmSection).animate({height:hSection},500);
        }
        else
        {
            // zabalí sekci
            $(elmButArrow).addClass('butShowSectionOfSlidingFilterClose');
            $(elmSection).addClass('slidingFilterSectionClosed');

            $(elmSection).animate({height:50},200);
        }
    });

    // po odeslání formuláře, skryje boční filtr
    // po kliknutí na předdefinovaný filtr skryje boční menu
    $('.boxSlidingFiltersColumn .butSearch, .boxSlidingFiltersColumn .wrapPredefinedFilter').click(function()
    {
        $('.butCloseSlidingFilter').trigger('click');
    });

    // posuvník v porovnávači
    if ( $('#contentCompareTable').length )
    {
        var countColumns = $('#contentCompareTable .titleCompareItem').length;
        var wColumn = $('#contentCompareTable .titleCompareItem').width();
        var elmWidth = countColumns * wColumn;

        $('#contentCompareTable').width(elmWidth);
    }
});



// testuje, jestli je při zadávání tel čílsa vkládáno tel. číslo, + nebo mezera
function isPhoneNumberKey(evt)
{
    var charCode = (evt.which != undefined) ? evt.which : event.keyCode;

    // 45 = minus, 46 = delete, 8 = backspace, 43 = plus, 40 = (, 41 = ), 32 = space, 47 = /, 31 dot
    if ((charCode != 45 && charCode != 46 && charCode != 8 && charCode != 43 && charCode != 40 && charCode != 41 && charCode != 32 && charCode != 47)  && charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }

    return true;
}


$(document).ready(function()
{
    // po stiknutí enteru vyvolá klik odeslání filtru
    $('#fulltext.inputSlidingFulltext').bind('keyup', function(e)
    {
        if ( $('#isIos').length )
        {
//alert('iOS');
            // 13 = klávesa enter
            if ( e.keyCode === 13 )
            {
//               submitSlidingFilter();
            }
        }
    });
});


//////////////////////////////////////
// odstranění položky z košíku
//////////////////////////////////////
function RemoveFromBasketList(idPolozkyKosiku, evidCislo = '', idModal = '')
{
    let bodyLang = $('body').data('body-lang');
    ajaxCallPromise('index.php', {id_polozky_kosiku: idPolozkyKosiku, 'ajax': 'basket_remove', 'body_lang': bodyLang}, true, 'POST', false).then( result => {
        $('*[data-idPolozkyKosiku="' + idPolozkyKosiku + '"]').remove();

        if ($('#kosik-vypis-polozek').length > 0)
        {
            // jsme v košíku, je potřeba ověřit zda existují položky, pokud ne, tak reloadneme stránku
            let pocetZbyvajicichPolozek = 0;
            $.each($('*[data-idPolozkyKosiku]'), function (key, value) {
                pocetZbyvajicichPolozek += 1;
            });
            if (pocetZbyvajicichPolozek == 0)
            {
                ShowHideLoading();
                location.reload();
                return;
            }
        }

        if (idModal != '')
        {
            $('#' + idModal).modal('hide');
        }

        if (evidCislo != '')
        {
            $('.do-kosiku-' + evidCislo).removeClass('btn-outline-vzv-white').addClass('btn-vzv');
            $('.do-kosiku-' + evidCislo).html(result);
        }

        // přepočítá celkovou cenu v košíku
        GetBasketTotalPrice();
        GetBasketCountItems();
    });
}


//////////////////////////////////////
// aktualizuje součet ceny v košíku
//////////////////////////////////////

function GetBasketTotalPrice()
{
    // přepočítá celkovou částku
    var id_kosiku = $('#wrapBasketFormItems').data('id_kosiku');
    let bodyLang = $('body').data('body-lang');

    $.ajax(
        {
            type: 'POST',
            async: false,
            url: 'index.php',
            data: {
                ajax: 'basket_sum_total',
                id_kosiku: id_kosiku,
                body_lang: bodyLang
            },
            success: function(response)
            {
                $('#boxBiDataPriceTotal').html(response);
            },
        });
}


////////////////////////////////////////
// pokud vyplním položku formuláře, kde je zobrazena hláška o nevyplnění, tak skryje alert
////////////////////////////////////////

function HideInputFillAlert(elm_id)
{
    if ( $('#' + elm_id).length && $('#alert_' + elm_id).length )
    {
        if ( $('#' + elm_id).val()!='' )
        {
            $('#alert_' + elm_id).hide(function(){});
        }
    }
    if (elm_id == 'fakturacni_email')
    {
        localStorage.setItem('fakturacni_email', $('#' + elm_id).val());
    }
    if (elm_id == 'fakturacni_mobil')
    {
        localStorage.setItem('fakturacni_mobil', $('#' + elm_id).val());
    }
}

function isOnlyNumberKey(evt)
{
    var charCode = (evt.which != undefined) ? evt.which : event.keyCode;

    // 45 = minus, 46 = delete, 8 = backspace, 44 = comma,  31 dot
    if ((/*charCode != 45 && charCode != 46 &&*/ charCode != 8 /*&& charCode != 44*/)  /*&& charCode > 31*/ && (charCode < 48 || charCode > 57))
    {
        return false;
    }

    return true;
}

function isNumberKey(evt)
{
    var charCode = (evt.which != undefined) ? evt.which : event.keyCode;

    // 45 = minus, 46 = delete, 8 = backspace, 44 = comma,  31 dot
    if ((/*charCode != 45 && */charCode != 46 && charCode != 8 && charCode != 44)  && charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }

    return true;
}

function changeToNumber(elm)
{
    elm.value = elm.value.replace(" ","");
    elm.value = elm.value.replace(",",".");
}


///////////////////////////////////////////////////
// zobrazení navigace, pokud je poslední dlaždice katalogu nad horním lemem obrazovky
///////////////////////////////////////////////////

// testuje, jestli jsme doskrolovali
window.positionLastElm = 0;
window.positionButton = 0;
window.positionScroll = 0;
window.hWindow = 0;

var scrollTimer;


$(window).on("scroll",function()
{
    clearTimeout(scrollTimer);

    // nastavuje aktuální pozici buttonu
    setPositionButProductsAbove();

    // pokud je doskrolováno, volá fci, která řeší, vše, co se bude dít po skrolování
    scrollTimer = setTimeout(function()
    {
        afterScroll();
    },200);
});

// co se děje po doskrolování
function afterScroll()
{
    setPositionButProductsAbove();
    showButProductsAbove();
}


// nastavuje pozici buttonu podle aktuální pozice dle skrolu
function setPositionButProductsAbove()
{

    if ( $('#wrapButProductsAbove').length )
    {
        // vypočteme pozici, kterou nastavíme buttonu
        window.positionButton = window.positionScroll + (window.hWindow / 4);

        $('#wrapButProductsAbove').css({ top: window.positionButton + 'px' });
    }
}


// zobrazí button
function showButProductsAbove()
{
    var wWindow = window.innerWidth;

    if ( $('#wrapButProductsAbove').length && wWindow > 800 )
    {
        // test, jestli jsou produkty za horním lemem obrazovky
        if ( window.positionLastElm < (window.positionScroll + 200) )
        {
            // zobrazíme button
            if ( $('#wrapButProductsAbove').is(':hidden') )
            {
                $('#wrapButProductsAbove').show();
            }
        }
        else
        {
            $('#wrapButProductsAbove').hide();
        }
    }
}



function scrollToKontaktAnchor(id) {
    var target = document.getElementById(id);
    if (!target) return false;
    var header = document.querySelector('.h-vzv');
    var headerH = header ? header.offsetHeight : 0;
    var offset = (headerH > 40 ? headerH : 96) + 28;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
    }
    return true;
}

var lastScrollTop = 0;
$( document ).ready(function() {
    if (location.hash) {
        var startId = decodeURIComponent(location.hash.replace(/^#/, ''));
        if (document.getElementById(startId)) {
            setTimeout(function () { scrollToKontaktAnchor(startId); }, 50);
        }
    }


    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop)
        {
            $('.hide-scroll-down').addClass('hidden');
        }
        else
        {
            $('.hide-scroll-down').removeClass('hidden');
        }
        lastScrollTop = st;
    });

    var posledniID = '';
    $(document).scroll(function()
    {
        $.each($('.dropdown-menu'), function (key, obj) {
           if ($(obj).hasClass('show'))
           {
               $(obj).removeClass('show')
           }
        });
    });
    $('body').hover(function(event){
        var el = document.elementFromPoint(event.pageX, event.pageY);
        let posledniClass = $(el).attr('class');
        if (posledniID == '')
        {
            posledniID = posledniClass;
        }
        else
        {
            if (posledniID != posledniClass)
            {
                $('.dropdown-menu').removeClass('show')
            }
        }
    });
});

function getVyberJazyka(adresa)
{
    ajaxCallPromise('vyber-jazyka', {aktualni_adresa: adresa}, true, 'GET').then( result => {
        $('#vyber-jazyka-content').html(result);
    });
}

(function () {
    var menu = null;
    var openSelect = null;

    function closeMenu() {
        if (menu && menu.parentNode) menu.parentNode.removeChild(menu);
        menu = null;
        openSelect = null;
    }

    function isFilterSelect(select) {
        if (!select || select.tagName !== "SELECT") return false;
        if (select.disabled || select.multiple || (select.size && select.size > 1)) return false;
        return select.classList.contains("form-select")
            || select.classList.contains("form-select-lg")
            || select.classList.contains("form-control")
            || !!(select.closest("#filtr") || select.closest("#pzFiltr"));
    }

    function buildItems(select) {
        var items = [];
        function walk(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                if (n.tagName === "OPTGROUP") {
                    items.push({ sep: true, label: n.label || "" });
                    walk(n.children);
                } else if (n.tagName === "OPTION") {
                    items.push({
                        value: n.value,
                        label: String(n.textContent || "").replace(/\s+/g, " ").trim(),
                        selected: n.selected,
                        disabled: n.disabled
                    });
                }
            }
        }
        walk(select.children);
        return items;
    }

    function openMenu(select) {
        closeMenu();
        openSelect = select;
        var rect = select.getBoundingClientRect();
        menu = document.createElement("ul");
        menu.className = "vzv-select-menu";
        menu.setAttribute("role", "listbox");
        menu.style.left = Math.round(rect.left) + "px";
        menu.style.top = Math.round(rect.bottom) + "px";
        menu.style.minWidth = Math.round(rect.width) + "px";

        buildItems(select).forEach(function (item) {
            var li = document.createElement("li");
            if (item.sep) {
                li.className = "vzv-select-sep";
                li.textContent = /^-+$/.test(String(item.label || "").replace(/\s/g, ""))
                    ? "------------------------"
                    : item.label;
            } else {
                li.setAttribute("data-value", item.value);
                li.textContent = item.label;
                if (item.selected) li.classList.add("is-active");
                if (item.disabled) {
                    li.style.opacity = "0.5";
                    li.style.pointerEvents = "none";
                }
                li.addEventListener("mousedown", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    select.value = item.value;
                    select.dispatchEvent(new Event("input", { bubbles: true }));
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                    closeMenu();
                });
            }
            menu.appendChild(li);
        });

        document.body.appendChild(menu);
        var mrect = menu.getBoundingClientRect();
        if (mrect.bottom > window.innerHeight - 8) {
            menu.style.top = Math.max(8, Math.round(rect.top - mrect.height)) + "px";
        }
        if (mrect.right > window.innerWidth - 8) {
            menu.style.left = Math.max(8, Math.round(window.innerWidth - mrect.width - 8)) + "px";
        }
        ignoreScrollUntil = Date.now() + 250;
        try { select.focus({ preventScroll: true }); } catch (err) {
            try { select.focus(); } catch (err2) {}
        }
    }

    var ignoreScrollUntil = 0;

    document.addEventListener("mousedown", function (e) {
        var select = e.target && e.target.closest ? e.target.closest("select") : null;
        if (select && isFilterSelect(select)) {
            e.preventDefault();
            e.stopPropagation();
            if (openSelect === select) {
                closeMenu();
            } else {
                openMenu(select);
            }
            return;
        }
        if (menu && !menu.contains(e.target)) closeMenu();
    }, true);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("scroll", function () {
        if (Date.now() < ignoreScrollUntil) return;
        closeMenu();
    }, true);
    window.addEventListener("resize", closeMenu);
})();