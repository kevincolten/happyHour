HappyHour.Routers.router = Backbone.Router.extend({

    routes: {
        ""         : "businessesIndex",
        "specials" : "specialsIndex",
        "form"     : "formsIndex"
    },

    initialize: function ()
    {
        var that = this;
        this.businesses = new HappyHour.Collections.Businesses();
        this.businesses.fetch();
    },

    businessesIndex: function ()
    {
        var view = new HappyHour.Views.BusinessesIndex({
            collection: this.businesses
        });
        $('#container').html(view.render().el);
    },

    specialsIndex: function ()
    {
        
        var view = new HappyHour.Views.SpecialsIndex();
        $('#container').html(view.render().el);
    },

    formsIndex: function(google_key)
    {
        var form = new HappyHour.Models.Form();
        form.fetch();
        var view = new HappyHour.Views.FormsIndex({
            model: form
        })
        $('#container').html(view.render().el);
    }
});
