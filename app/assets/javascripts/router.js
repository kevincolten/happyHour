define([
    'backbone',
    './models/DayModels',
    './models/FormModel',
    './views/List/ListView',
    './views/Form/FormView',
    './views/Search/SearchView',
    './views/List/ItemView',
    'backbone-query-parameters'
],

function(Backbone, DayModels, FormModel, ListView, FormView, SearchView, ItemView) {

    var Router = Backbone.Router.extend({

        routes: {
            ""       : "list",
            "form"   : "form",
            "search" : "search",
            "item"   : "item"
        },

        initialize: function()
        {
            // $('body').pagecontainer();
        },

        list: function(params)
        {
            var view = new ListView({
                collection: new DayModels.Collection()
            });
            var reverse = params ? true : false;
            var transition = params ? "slide" : "pop";
            this.changePage(view, transition, reverse);
        },

        item: function()
        {
            var view = new ItemView();
            this.changePage(view);
        },

        search: function()
        {
            var view = new SearchView();
            this.changePage(view, "slideup", false);
        },

        form: function(params)
        {
            var view = new FormView({
                model: new FormModel(),
                params: params
            })
            var reverse = params ? true : false;
            var transition = params ? "slideup" : "slide";
            this.changePage(view, transition, reverse);
        },

        changePage:function (view, transition, reverse)
        {
            $(view.el).attr('data-role', 'page');
            view.render();
            $('body').append($(view.el));
            $('body').pagecontainer('change', $(view.el), { allowSamePageTransition: true,
                                                            transition: transition,
                                                            reverse: reverse });
        }
    });
    return Router;
});
