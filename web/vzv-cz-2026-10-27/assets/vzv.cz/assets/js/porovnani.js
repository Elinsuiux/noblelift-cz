function addRemoveCompare(idPolozky)
{
    let inCompare = isInFavouriteOrCompare(idPolozky, 'compare');
    const compareCount = $('#compare-count');
    if (inCompare === 0)
    {
        ajaxCallPromise('add-compare', {id_polozky: idPolozky}, true, 'POST').then((response) => {
            let responseArray = JSON.parse(response);
            compareCount.html(responseArray['compare_count']);
        });
    }
    else
    {
        ajaxCallPromise('remove-compare', {id_polozky: idPolozky}, true, 'POST').then((response) => {
            let responseArray = JSON.parse(response);
            let valueSpan = responseArray['compare_count'];
            let countCompareItems = valueSpan;
            if (valueSpan === 0)
            {
                valueSpan = '0';
            }
            compareCount.html(valueSpan);
            if (countCompareItems === 0 && $('#compare').length)
            {
                compareSetEmptyTemplate();
            }
        });
    }
}


/* pouze pro stránku s porovnávačem */

function removeCompareAll()
{
    ajaxCallPromise('remove-compare-all', {}, true, 'GET').then((response) => {
        compareSetEmptyTemplate();
        $('#compare-count').html('0');
    });
}

function compareSetEmptyTemplate()
{
    $('#compare-wrap').addClass('d-none');
    $('.compare-bar').addClass('d-none');
    $('#compare-empty').removeClass('d-none');
    $('#compare').addClass('d-none');
}

function getComparePDF()
{
    window.print();
}

function addInquiryCompare()
{
    ajaxCallPromise('add-inquiry-compare').then((response) => {
        $('#poptavka .modal-body').html(response);
        $('#poptavka').modal('show');
    });
}

function compareRemoveItem(idPolozky)
{
    ajaxCallPromise('remove-compare', {id_polozky: idPolozky}, true, 'POST').then((response) => {
        let responseArray = JSON.parse(response);
        $('.compare-item-' + idPolozky).remove();
        let valueSpan = responseArray['compare_count'];
        let countCompareItems = valueSpan;
        if (valueSpan === 0)
        {
            valueSpan = '0';
        }
        $('#compare-count').html(valueSpan);
        if (countCompareItems === 0 && $('#compare').length)
        {
            compareSetEmptyTemplate();
        }
    });
}