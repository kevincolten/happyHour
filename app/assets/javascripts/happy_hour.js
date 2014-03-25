window.HappyHour = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new HappyHour.Routers.router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  HappyHour.initialize();
});
