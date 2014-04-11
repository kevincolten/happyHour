define(["backbone", "router"],

function(Backbone, Router) {
    var HappyHour = {
        initialize: function() {
            this.router = new Router();
            Backbone.history.start();
        }
    };
    return HappyHour;
});
