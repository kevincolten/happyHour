window.HappyHour = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {
        new HappyHour.Routers.Businesses();
        new HappyHour.Routers.Specials();
        Backbone.history.start();
    }
};

$(document).ready(function(){
    HappyHour.initialize();
});
