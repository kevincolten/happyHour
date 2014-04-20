define(['backbone', './SectionView', "tpl!../../templates/List/List.tpl"], 

function(Backbone, SectionView, ListTpl) {

    var ListView = Backbone.View.extend({

        template: ListTpl,

        initialize: function ()
        {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function ()
        {
            this.$el.html(this.template());
            this.collection.each(function(day) {
                var sectionView = new SectionView({ model: day });
                this.$('ul').append(sectionView.el);
                sectionView.render();
            }, this)
            this.$('ul').listview();
            return this;
        }
    });
    return ListView;
});