define(['backbone', 'tpl!../../templates/Detail/Detail'],

function(Backbone, DetailTpl) {

    var DetailView = Backbone.View.extend({

        template: DetailTpl,
    });
    return DetailView;
});