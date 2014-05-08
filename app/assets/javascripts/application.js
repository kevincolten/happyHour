require(["backbone", "./router", "jquery-mobile", "jqm-config", "fastclick"],
function(Backbone, Router) {
    
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);
    
    var HappyHour = {

        start: function() {
            this.router = new Router();
            Backbone.history.start();
        }
    };

    return HappyHour.start();
});
