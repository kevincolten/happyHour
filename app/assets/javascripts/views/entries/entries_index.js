HappyHour.Views.EntriesIndex = Backbone.View.extend({

    render : function () {
        this.$el.html(this.template());
        return this;
    },

    template: JST['entries/index']

});
