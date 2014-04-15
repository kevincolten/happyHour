define([
    'backbone',
    './models/EventModels',
    './models/FormModel',
    './views/List/ListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    './views/List/ItemView',
    'backbone-query-parameters',
    'backbone-query-parameters-shim'
],

function(Backbone, EventModels, FormModel, ListView, FormView, SearchView, ItemView) {

    var Router = Backbone.Router.extend({

        routes: {
            ""       : "list",
            "form"   : "form",
            "search" : "search",
            "item"   : "item"
        },

        list: function()
        {
            var view = new ListView({
                collection: new EventModels.Collection()
            });
            $('#container').html(view.render().el);
        },

        item: function()
        {
            var view = new ItemView();
            $('#container').html(view.render().el);
        },

        search: function()
        {
            var view = new SearchView();
            $('#container').html(view.render().el);
        },

        form: function(params)
        {
            var view = new FormView({
                model: new FormModel(),
                params: params
            })
            $('#container').html(view.render().el);
        }
    });
    return Router;
});
