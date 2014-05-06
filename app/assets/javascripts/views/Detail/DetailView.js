define(['backbone', 'tpl!../../templates/Detail/Detail.html'],

function(Backbone, DetailTpl) {

    var DetailView = Backbone.View.extend({

        template: DetailTpl,
    });
    return DetailView;
});