HappyHour.Views.BusinessesIndex = Backbone.View.extend({

    initialize : function () {
        this.collection.on("sync", this.render, this);
    },
  
    render : function () {
        this.$el.html(this.template({collection : this.collection}));
        return this;
    },

    template: JST['businesses/index']

});
