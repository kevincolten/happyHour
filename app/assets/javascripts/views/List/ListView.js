define(['backbone', './SectionView', "tpl!../../templates/List/List.html"], 

function(Backbone, SectionView, ListTpl) {

    var ListView = Backbone.View.extend({

        template: ListTpl,

        attributes: {
            "data-page": "list"
        },

        initialize: function ()
        {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        events: {
            'click #add-special': 'addSpecial'
        },

        addSpecial: function (e)
        {
            e.preventDefault();
            Backbone.history.navigate('form', {trigger: true});
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
            this.$('#header').toolbar();
            return this;
        }
    });
    return ListView;
});