define(["backbone", "./router", "jquery-mobile", "jqm-config", "fastclick"],
function(Backbone, Router) {
    
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);
    
    $(document).ready(function(){
        var HappyHour = {

            start: function() {
                this.router = new Router();
                Backbone.history.start();
            }
        };
        console.log("hello");
        return HappyHour.start();
    });
});