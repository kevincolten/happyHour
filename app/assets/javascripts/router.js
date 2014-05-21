define([
    './models/DayModels',
    './models/FormModel',
    './views/List/ListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    'ratchet'
],

function(DayModels, FormModel, ListView, FormView, SearchView) {

    var Router = Backbone.Router.extend({

        routes: {
            ""       : "list",
            "form"   : "form",
            "search" : "search"
        },

        list: function()
        {
            var view = new ListView({
                collection: new DayModels.Collection()
            });
            $('.content').html(view.render().el);
        },

        search: function()
        {
            var view = new SearchView();
            $('.content').html(view.render().el);
        },

        form: function()
        {
            var view = new FormView({
                model: new FormModel(),
            })
            $('.content').html(view.render().el);
        }
    });
    return Router;
});
