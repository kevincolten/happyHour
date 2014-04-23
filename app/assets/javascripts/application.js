require.config({
    paths: {
        "jquery": "/assets/javascripts/jquery/jquery",
        "underscore": "/assets/javascripts/underscore/underscore",
        "backbone": "/assets/javascripts/backbone/backbone",
        "jquery-mobile": "/assets/javascripts/jquery-mobile-bower/js/jquery.mobile-1.4.2.min",
        "jackbone": "/assets/javascripts/jackbone/jackbone",
        "tpl": "/assets/javascripts/requirejs-tpl/tpl",
        "backbone-query-parameters": "/assets/javascripts/backbone-query-parameters/backbone.queryparams",
        "backbone-query-parameters-shim": "/assets/javascripts/backbone-query-parameters/backbone.queryparams-1.1-shim",
        "serializeJSON": "/assets/javascripts/jquery.serializeJSON/jquery.serializejson",
        "jqm-config": "/assets/javascripts/jqm-config",
        "fastclick": "/assets/javascripts/fastclick/lib/fastclick"
    },

    shim: {
        'backbone-query-parameters-shim': ['backbone'],
        'jqm-config': ["jquery-mobile"]
    }
});

define(['happy_hour', "jquery-mobile", "jqm-config", "fastclick"], function(HappyHour) {
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);
    HappyHour.initialize();
})
