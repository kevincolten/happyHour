HappyHour.Routers.Businesses = Backbone.Router.extend({

    initialize: function () {
        this.collection = new HappyHour.Collections.Businesses();
        this.collection.fetch();
    },

    routes: {
        "" : "index",
        "business/:id" : "show"
    },

    index: function () {
        var view = new HappyHour.Views.BusinessesIndex({collection: this.collection});
        $("#container").html(view.render().$el);
    },

    show: function (id) {
        var business = this.collection.findWhere({id : id});
    },

});
