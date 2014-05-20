$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$('body').on('pagecontainerhide', function (event, ui) {
    $('div[data-role="page"]:not(.ui-page-active)').remove();
    $("span:contains('BESbewy')").remove();
});