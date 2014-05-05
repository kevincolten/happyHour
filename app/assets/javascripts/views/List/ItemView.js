define(['backbone', "tpl!../../templates/List/Item.html"], 

function(Backbone, ItemTpl) {

    var ItemView = Backbone.View.extend({

        template: ItemTpl,
        tagName: 'li',

        render: function ()
        {
            var start_time = this.model.start_time;
            var end_time = this.model.end_time;
            var date = new Date();
            var current_time = date.getHours() + ":" + date.getMinutes() + ":00";
            var now = start_time <= current_time && end_time > current_time;
            this.$el.html(this.template({ event: this.model,
                                          start_time: start_time,
                                          end_time: end_time,
                                          now: now }));
            return this;
        }
    });
    return ItemView;
});
