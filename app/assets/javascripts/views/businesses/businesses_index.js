HappyHour.Views.BusinessesIndex = Backbone.View.extend({

    template: JST['businesses/index'],

    initialize: function ()
    {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function ()
    {
        this.$el.html(this.template({ businesses: this.collection.toJSON() }));
        return this;
    }

});
