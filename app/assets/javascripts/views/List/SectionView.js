define(['backbone', './ItemView', "tpl!../../templates/List/Section.tpl"], 

function(Backbone, ItemView, SectionTpl) {

    var SectionView = Backbone.View.extend({

        template: SectionTpl,

        render: function ()
        {
            var that = this;
            this.$el.remove();
            $('ul').append(this.template({ day: this.model.get('day_name'),
                                           count: this.model.get('events').length }))
            _.each(this.model.get('events'), function(event) {
                var itemView = new ItemView({ model: event });
                $('ul').append(itemView.el);
                itemView.render();
            });
            return this;
        }
    });
    return SectionView;
});
