HappyHour.Views.FormsIndex = Backbone.View.extend({

    template: JST['forms/index'],

    events: {
        'submit form': 'formSubmit',
        'change #business': 'getBusinessDetails',
        'keyup #search': 'searchBusinesses'
    },

    initialize: function ()
    {
        this.listenTo(this.model, 'change', this.render);
        this.coords = "",
        this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw",
        this.getLocation();
    },

    formSubmit: function(e) {
        e.preventDefault();
        $.ajax({ type: "POST",
                 url: "api/specials",
                 data: this.$('form').serialize() });
    },

    getBusinessDetails: function (e)
    {
        var that = this;
        var business_reference = this.$('#business').val();
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/place/details/json",
            data: { key: this.google_key,
                    reference: business_reference,
                    sensor: false },
            success: function (details)
            {
                var details = details.result;
                that.$('#business_details').val(
                    details.id + "|" +
                    details.name + "|" +       
                    details.formatted_address + "|" +
                    details.formatted_phone_number + "|" +
                    details.website + "|" +
                    details.geometry.location.lat + "|" +
                    details.geometry.location.lng
                )
            }
        })
    },

    getLocation: function ()
    {
        var that = this;
        var success = function (pos)
        {
            that.coords = pos.coords.latitude + "," + pos.coords.longitude;
            that.getNearbyPlaces();
        }

        var error = function ()
        {
            // ask user for location
        };

        navigator.geolocation.getCurrentPosition(success, error);
    },

    getNearbyPlaces: function ()
    {
        var that = this;
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            data: { key: this.google_key,
                    sensor: false,
                    location: this.coords,
                    rankby: "distance",
                    types: "bar|restaurant" },
            success: function (businesses)
            {
                that.model.set('businesses', businesses['results']);
            },
        });
    },

    searchBusinesses: function (e)
    {
        var that = this;
        if (e.target.value.length > 2 && this.coords && this.google_key) {
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
                data: { key: this.google_key,
                        input: e.target.value,
                        sensor: false,
                        location: this.coords,
                        radius: 16000,
                        types: "establishment" },
                success: function (results)
                {
                    var businesses = [];
                    results.predictions.forEach(function (business) {
                        var details = business.description.split(", ");
                        businesses.push({
                            name: details[0],
                            vicinity: details[1] + ", " + details[2],
                            reference: business.reference,
                        })
                    });
                    that.model.set('businesses', businesses);
                }
            });
        }
    },

    render: function ()
    {
        this.$el.html(this.template({ form: this.model.toJSON() }));

        if (this.$('#business').val()) {
            this.getBusinessDetails();
        }

        return this;
    }

});
