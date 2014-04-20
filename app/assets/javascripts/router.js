define([
    'backbone',
    './models/DayModels',
    './models/FormModel',
    './views/List/ListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    './views/List/ItemView',
    'backbone-query-parameters',
    'backbone-query-parameters-shim'
],

function(Backbone, DayModels, FormModel, ListView, FormView, SearchView, ItemView) {

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
                collection: new DayModels.Collection()
            });
            // $('#container').html(view.el);
            this.changePage(view);
        },

        item: function()
        {
            var view = new ItemView();
            // $('#container').html(view.render().el);
            this.changePage(view);
        },

        search: function()
        {
            var view = new SearchView();
            // $('#container').html(view.render().el);
            this.changePage(view);
        },

        form: function(params)
        {
            var view = new FormView({
                model: new FormModel(),
                params: params
            })
            this.changePage(view);
        },

        changePage:function (page)
        {
            $(page.el).attr('data-role', 'page');
            page.render();
            $('body').append($(page.el));
            $('body').pagecontainer({defaults: true}).pagecontainer('change', $(page.el), {allowSamePageTransition: true});
        }
    });
    return Router;
});
