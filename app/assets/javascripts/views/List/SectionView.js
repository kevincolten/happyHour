define(['backbone'], 

function(Backbone) {

    var SectionView = Backbone.View.extend({

        el: false,
        tagName:'li',
        className: 'table-view-divider',

        render: function ()
        {
            var that = this;
            this.$el.html(this.model.get('day_name'));
            return this;
        }
    });
    return SectionView;
});
