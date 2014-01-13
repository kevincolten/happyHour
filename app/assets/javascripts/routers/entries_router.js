HappyHour.Routers.Entries = Backbone.Router.extend({
    routes: {
        "" : "index",
        "entries/:id" : "show"
    },

    index: function () {
        var view = new HappyHour.Views.EntriesIndex();
        $("#container").html(view.render().$el);
    },

    show: function (id) {
        alert("Here's entry number " + id);
    },
});
