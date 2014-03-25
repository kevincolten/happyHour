HappyHour.Views.FormsIndex = Backbone.View.extend({

    template: JST['forms/index'],

    initialize: function ()
    {
        this.listenTo(this.model, 'change', this.render);
        this.getKey();
    },

    render: function ()
    {
        this.$el.html(this.template({ form: this.model.toJSON() }));
        return this;
    },

    getKey: function ()
    {
        var that = this;
        $.ajax({
            url:"/figaro.json",
            success: function(key)
            {   
                that.getLocation(key["GOOGLE_PUBLIC_API_KEY"]);
            }
        });
    },

    getLocation: function (key)
    {
        var that = this;
        var success = function (pos)
        {
            that.getNearbyPlaces(key, pos.coords);
        }

        var error = function ()
        {
            // ask user for location
        };

        navigator.geolocation.getCurrentPosition(success, error);
    },

    getNearbyPlaces: function (key, coords)
    {
        var that = this;
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            data: { key: key,
                    sensor: false,
                    location: coords.latitude + "," + coords.longitude,
                    rankby: "distance",
                    types: "bar|restaurant" },
            success: function (businesses)
            {
                that.model.set('businesses', businesses['results']);
            },
        });
    }

});
