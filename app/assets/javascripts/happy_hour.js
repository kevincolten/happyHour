window.HappyHour = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {
        new HappyHour.Routers.Businesses();
        Backbone.history.start();
    }
};

$(document).ready(function(){
    HappyHour.initialize();
});
