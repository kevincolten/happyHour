define(['backbone', "tpl!../../templates/List/List.tpl", './ItemView'], 

function(Backbone, ListTemplate, ItemView) {

    var ListView = Backbone.View.extend({

        template: ListTemplate,

        initialize: function ()
        {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function ()
        {
            this.$el.html(this.template());
            this.collection.each(function(event) {
                var itemView = new ItemView({ model: event });
                this.$('ul').append(itemView.el);
                itemView.render();
            }, this)
            this.$('ul').listview();
            return this;
        }
    });
    return ListView;
});
