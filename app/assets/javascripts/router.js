define([
    'backbone',
    './models/BusinessModels',
    './models/FormModel',
    './views/List/BusinessListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    'backbone-query-parameters',
    'backbone-query-parameters-shim'
],

function(Backbone, BusinessModels, FormModel, BusinessListView, FormView, SearchView) {

    var Router = Backbone.Router.extend({

        routes: {
            ""         : "list",
            "form"     : "form",
            "search"   : "search"
        },

        list: function()
        {
            var view = new BusinessListView({
                collection: this.businesses = new BusinessModels.Collection()
            });
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
