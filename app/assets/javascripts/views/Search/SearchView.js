define(['backbone'], 

function(Backbone) {

    var SearchView = Backbone.View.extend({

        template: _.template("../../templates/Search/Search.jst"),

        events: {
            'keyup input': 'searchBusinesses'
        },

        initialize: function ()
        {
            this.coords = "",
            this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw",
            this.getLocation();
            this.$('#businessList').trigger('create');
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
                    that.buildBusinessList(businesses['results']);
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
                        that.buildBusinessList(businesses);
                    }
                });
            } else if (!e.target.value) {
                this.getNearbyPlaces();
            }
        },

        insertBusiness: function (e)
        {
            HappyHour.Store.currentBusiness = this.$(e.currentTarget).attr('data-reference');
            Backbone.history.navigate('form', {trigger: true});
        },

        buildBusinessList: function (businesses)
        {
            var businessOptions = _.map(businesses, function(business) {
                return '<li><a href="#form" data-reference="' + business.reference + '">' + business.name + '</a></li>'
            })
            this.$('#businessList').html(businessOptions).listview('refresh');
        },

        render: function ()
        {
            this.$el.html(this.template());
            return this;
        }
    });
    return SearchView;
});
