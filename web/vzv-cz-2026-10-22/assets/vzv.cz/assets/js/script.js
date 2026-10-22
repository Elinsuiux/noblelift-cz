function openSubmenu(idMenu, show = false)
{
    if (show == false)
    {
        hideSubmenu();
        return;
    }
    $('.dropdown-menu').removeClass('show');

    let dropdownMenu = $('#dropdownMenu' + idMenu);
    dropdownMenu.addClass('show');

    let pos = $('#a-menu' + idMenu).position();
    let off = $('#a-menu' + idMenu).offset();
    /*let topOffset = parseInt(off.top) + 95;*/
    let topOffset = 100;
    if ($('.homepage-wrap').length > 0)
    {
        topOffset = 150;
    }

    //$('#dropdownMenuButton' + idMenu).addClass('show');
    dropdownMenu.css({'inset': '0px auto auto 0px', 'margin':'0px', 'transform': 'translate('+ pos.left +'px, '+ topOffset +'px)'});
}

$(document).ready(function()
{
    $('.dropdown-menu').mouseleave(function(){
        hideSubmenu();
    });

    changeHPVideoSize();
    loadHPVideo();

    $(window).resize(function() {
        changeHPVideoSize(true);
    });

    $(window).on('scroll', function () {
        $('.h-vzv').toggleClass('scrolled', $(this).scrollTop() > 50);
    });

    $(window).on('popstate', function () {
        location.href = window.location.href;
        //processFiltr();
    });

});

function loadHPVideo()
{
    let width = $( window ).width();
    if (width <= 768)
    {
        $('.homepage-video-empty').remove();
        changeHPVideoSize();
        return;
    }
    if ($('.homepage-video-empty').length > 0)
    {
        let vh = window.innerHeight * 0.01;
        let videoHeight = $( window ).height();

        document.documentElement.style.setProperty('--vh', `${vh}px`);


        $('.homepage-video-empty').css('height', videoHeight + 'px');
        ajaxCallPromise('get-homepage-video', {}, false, 'GET').then( result => {
            if (result != '')
            {
                $('.homepage-vzv-video').html(result);
                changeHPVideoSize(true);
            }
        });
    }
}

function changeHPVideoSize(changeBefore = false)
{
    if ($('.homepage-vzv-video').length > 0)
    {
        let width = $( window ).width();
        let videoHeight = $( window ).height() + 10;
        let wrapElement = $('.homepage-vzv-video-wrap');

        $('.homepage-vzv-video').css('height', videoHeight + 'px');
        wrapElement.css('height', videoHeight + 'px');
        wrapElement.css('width', width + 'px');
        $('.homepage-vzv-video video').css('min-width', '100%');

        if (changeBefore)
        {
            setTimeout(function() {
                let videoElement = document.getElementById('hpBgVideo');
                if (videoElement !== null)
                {
                    let videoHeight = $('#hpBgVideo').height();
                    $('.homepage-vzv-video').css('height', videoHeight + 'px');
                    $('<style>')
                        .prop('type', 'text/css')
                        .html('.homepage-vzv-video:before { height: '+ videoHeight +'px; }')
                        .appendTo('head');
                }
            }, 1000);
        }
    }
}

function hideSubmenu()
{
    $('.dropdown-menu').removeClass('show');
}

$(document).ready(function() {
    $('[data-bs-toggle=tooltip]').tooltip();
});

$(document).ready(function() {
    $("#exampleModal").modal();
});

function ajaxCallPromise(url, data = {}, loadingScreen = true, postOrGet = 'POST')
{
    let bodyClass = $('#body').attr("class").split(/\s+/);
    let lang = '';
    $.each(bodyClass, function (key, className) {
        if (className.indexOf('body-') >= 0)
        {
            lang = className.replace('body-', '');
        }
    });

    data['lang'] = lang;

    return new Promise((resolve, reject) => {
        $.ajax(
            {
                url: adr+"index.php?ajax&adresa=" + url,
                type: postOrGet,
                data: data,
                success: function(response)
                {
                    if (loadingScreen === true)
                    {
                        showHideLoading();
                    }
                    resolve(response);
                },
                beforeSend : function()
                {
                    if (loadingScreen === true)
                    {
                        showHideLoading();
                    }
                }
            });
    });
}

function showHideLoading()
{
    if ( $('.body').length )
    {

        let selector = $('#loading-screen');
        if (selector.hasClass('d-none') )
        {
            selector.removeClass('d-none');
        }
        else
        {
            selector.addClass('d-none');
        }
    }
}

$(document).ready(function()
{
    if ($( window ).width() < 1280)
    {
        katalogFiltr();
    }
    $( window ).resize(function() {
        katalogFiltr();
    });
    $('.offcanvas-zobrazit-zavrit-filtr').click(function()
    {
        if ($('#offcanvasScrolling').hasClass('show'))
        {
            $('#offcanvasScrolling').removeClass('show');
        }
        else
        {
            $('#offcanvasScrolling').addClass('show');
        }
        checkKatalogFiltrOpen();
    });

});

function checkKatalogFiltrOpen()
{
    if ($('#offcanvasScrolling').hasClass('show'))
    {
        $('.offcanvas-zavrit-filtr').removeClass('hidden');
        $('.offcanvas-zobrazit-filtr').addClass('hidden');
    }
    else
    {
        $('.offcanvas-zobrazit-filtr').removeClass('hidden');
        $('.offcanvas-zavrit-filtr').addClass('hidden');
    }
}

function katalogFiltr()
{
    if ($( window ).width() < 1280)
    {
        if ($('.katalog-filtr').hasClass('show'))
        {
            $('.katalog-filtr').removeClass('show');
            $('#katalog-vzv').removeClass('col-10');
            $('#katalog-vzv').addClass('col-12');
            $('#containerOffcanvas').removeClass('mobile');
        }
        else
        {
            $('.katalog-filtr').css('visibility', 'visible');
        }
    }
    else
    {
        if ($('.katalog-filtr').hasClass('show'))
        {}
        else
        {
            $('#containerOffcanvas').addClass('mobile');
            $('.katalog-filtr').addClass('show');
            $('#katalog-vzv').addClass('col-10');
            $('#katalog-vzv').removeClass('col-12');
        }
    }
    checkKatalogFiltrOpen();
}

function validateEmail(email)
{
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}