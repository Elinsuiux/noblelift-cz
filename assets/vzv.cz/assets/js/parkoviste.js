const classFavourite = 'btn-dark text-light';
const classNotFavourite = 'btn-outline-dark';

function isInFavouriteOrCompare(idPolozky, choice = 'favourite')
{
    let isInFavourite = 0;
    let selector = $('#item-' + idPolozky + ' .'+ choice +'-button');
    console.log(selector);
    if (selector.hasClass('btn-dark'))
    {
        isInFavourite = 1;
        selector.removeClass(classFavourite);
        selector.addClass(classNotFavourite);
        if ($('#favourite').length)
        {
            $($('#'+ choice +' #item-' + idPolozky).parent()).remove();
        }
    }
    else
    {
        selector.removeClass(classNotFavourite);
        selector.addClass(classFavourite);
    }
    return isInFavourite;
}

function addRemoveFavourite(idPolozky)
{
    let inFavourite = isInFavouriteOrCompare(idPolozky, 'favourite');
    const favouriteCount = $('#favourite-count');
    if (inFavourite === 0)
    {
        ajaxCallPromise('add-favourite', {id_polozky: idPolozky}, true, 'POST').then((response) => {
            let responseArray = JSON.parse(response);
            favouriteCount.html(responseArray['favourite_count']);
        });
    }
    else
    {
        ajaxCallPromise('remove-favourite', {id_polozky: idPolozky}, true, 'POST').then((response) => {
            let responseArray = JSON.parse(response);
            let valueSpan = responseArray['favourite_count'];
            let countFavouriteItems = valueSpan;
            if (valueSpan === 0)
            {
                valueSpan = '0';
            }
            favouriteCount.html(valueSpan);

            if (countFavouriteItems === 0 && $('#favourite').length)
            {
                favouriteSetEmptyTemplate();
            }
        });
    }
}


/* Pouze pro stránku favourite */

function getFavouritePDF()
{
    window.print();
}

function favouriteSetEmptyTemplate()
{
    $('.favorite-bar').addClass('d-none');
    $('#favorite-empty').removeClass('d-none');
    $('#favourite').addClass('d-none');
    $('#favourite-wrap').addClass('d-none');
}

function removeFavouriteAll()
{
    ajaxCallPromise('remove-favourite-all', {}, true, 'GET').then((response) => {
        favouriteSetEmptyTemplate();
        $('#favourite-count').html('0');
    });
}

function addInquiryFavorites()
{
    ajaxCallPromise('add-inquiry-favorites').then((response) => {
        $('#poptavka .modal-body').html(response);
        $('#poptavka').modal('show');
    });
}
