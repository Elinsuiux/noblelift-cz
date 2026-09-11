function filtrPZ()
{
    let dataArray = {
        'search-text': $('#search-text').val(),
        'device-type': $('#device-type').val(),
        'capacity-from': $('#capacity-from').val(),
        'capacity-to': $('#capacity-to').val(),
        'brand': $('#brand').val(),
        'iso': $('#iso').val(),
    };
    return dataArray;
}

$(document).on('keypress',function(e) {
    if(e.which == 13)
    {
        dgLazyLoadPZ(true);
    }
});

var lazyLoadLoadingPZ = false;
var processFiltrRunPZ = false;
function dgLazyLoadPZ(reloadPage = false)
{
    if (reloadPage)
    {
        lazyLoadLoadingPZ = false;
    }
    if (!lazyLoadLoadingPZ)
    {
        $('#pzFiltr').removeClass('show');
        lazyLoadLoadingPZ = true;
        let countPZ = 0;
        $.each($('#content-pz .card'), function (key, value) {
            countPZ = countPZ + 1;
        });

        page = 0;
        if (countPZ > 0 && !reloadPage)
        {
            page = Math.round(countPZ / 16);
        }

        let dataArray = filtrPZ();

        ajaxCallPromise('get-pz-ajax&page=' + page, dataArray, true, 'GET').then( result => {
            console.log(result);
            $('#pz-empty').hide();
            let array = $.parseJSON(result);
            let pzTemplate = array['template'];
            let pocetPZ = array['pocet_pz'];

            window.history.pushState('page2', 'Title', array['url']);

            processFiltrRunPZ = true;
            if ((pocetPZ > 0 && page == 0) || page > 0)
            {
                if (page == 0)
                {
                    $('#content-pz').html('');
                }
                $('#content-pz').append(pzTemplate);
                if (pocetPZ >= 16)
                {
                    lazyLoadLoadingPZ = false;
                }
            }
            else
            {
                $('#content-pz').html(pzTemplate);
                if (page == 0)
                {
                    $('#pz-empty').show();
                }
            }
        });
    }
}


$(document.body).on('touchmove', scrollDGLazyLoadPZ);
$(window).on('scroll', scrollDGLazyLoadPZ);

function scrollDGLazyLoadPZ()
{
    if ($('#content-pz')[0])
    {
        let scrollTop = Math.round($(window).scrollTop()) + 60;
        let scrollTopHeight = scrollTop + $(window).height();

        if (scrollTopHeight >= $(document).height())
        {
            dgLazyLoadPZ();
        }
    }
}
