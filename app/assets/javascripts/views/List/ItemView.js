define(['backbone', "tpl!../../templates/List/Item.tpl"], 

function(Backbone, ItemTemplate) {

    var ListView = Backbone.View.extend({

        template: ItemTemplate,
        tagName: 'li',

        render: function ()
        {
            this.$el.html(this.template({event: this.model.toJSON()}));
            return this;
        }
    });
    return ListView;
});
