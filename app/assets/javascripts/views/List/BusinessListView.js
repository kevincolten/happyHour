define(['backbone'], 

function(Backbone) {

    var BusinessListView = Backbone.View.extend({

        template: _.template("../../templates/List/List.jst"),

        initialize: function ()
        {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function ()
        {
            this.$el.html(this.template({ businesses: this.collection.toJSON() }));
            return this;
        }
    });
    return BusinessListView;
});
