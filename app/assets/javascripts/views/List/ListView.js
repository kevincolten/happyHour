define(['backbone', './SectionView', './ItemView'], 

function(Backbone, SectionView, ItemView) {

    var ListView = Backbone.View.extend({

        el: false,
        tagName: 'ul',
        className: 'table-view',

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
            var that = this;
            this.collection.each(function(day) {
                var sectionView = new SectionView({ model: day });
                that.$el.append(sectionView.el);
                sectionView.render();
                _.each(day.get('events'), function(event) {
                    var itemView = new ItemView({ model: event });
                    that.$el.append(itemView.el);
                    itemView.render();
                });
            });
            return this;
        }
    });
    return ListView;
});