function removeInquiry(idPolozky)
{
    ajaxCallPromise('remove-inquiry', {id_polozky: idPolozky}, true, 'POST').then((response) => {
        $('#inquiry-' + idPolozky).remove();
        $('#pozadavek').html(response);
    });
}