$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$('body').on('pagecontainerhide', function (event, ui) {
        var page = ui.nextPage.attr('data-page');
        var pages = $('div[data-page="' + page + '"]');
        if (pages.length > 1) {
            pages.first().remove();
        }
});