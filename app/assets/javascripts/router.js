define([
    'backbone',
    './models/BusinessModels',
    './models/FormModel',
    './views/List/BusinessListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    'jquery-mobile'
],

function(Backbone, BusinessModels, FormModel, BusinessListView, FormView, SearchView) {

    var Router = Backbone.Router.extend({

        routes: {
            ""         : "businessesIndex",
            "form"     : "formsIndex",
            "search"   : "searchIndex"
        },

        initialize: function()
        {
            this.businesses = new BusinessModels.Collection();
            this.businesses.fetch();
            this.form = new FormModel();
            this.form.fetch();
        },

        businessesIndex: function()
        {
            var view = new BusinessListView({
                collection: this.businesses
            });
            $('#container').html(view.render().el);
        },

        searchIndex: function()
        {
            var view = new SearchView();
            $('#container').html(view.render().el);
        },

        formsIndex: function()
        {
            var view = new FormView({
                model: this.form
            })
            $('#container').html(view.render().el);
        }
    });
    return Router;
});
