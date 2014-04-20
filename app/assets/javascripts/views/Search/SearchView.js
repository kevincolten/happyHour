define(['backbone', "tpl!../../templates/Search/Search.tpl"], 

function(Backbone, SearchTemplate) {

    var SearchView = Backbone.View.extend({

        template: SearchTemplate,

        events: {
            'keyup input': 'searchBusinesses',
            'click a': 'selectBusiness'
        },

        initialize: function ()
        {
            this.coords = "",
            this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw",
            this.getLocation();
        },

        getLocation: function ()
        {
            var that = this;
            console.log("hello");
            var success = function (pos)
            {
                that.coords = pos.coords.latitude + "," + pos.coords.longitude;
                console.log(that.coords);
                that.getNearbyPlaces();
            }

            var error = function ()
            {
                console.log("error");
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

        selectBusiness: function (e)
        {

            var reference = this.$(e.currentTarget).attr('data-reference')
            Backbone.history.navigate('form?business_reference=' + reference, {trigger: true});
        },

        buildBusinessList: function (businesses)
        {
            var businessOptions = _.map(businesses, function(business) {
                return '<li><a href="#form" data-reference="' + business.reference + '">' + business.name + '</a></li>'
            })
            this.$('#business-list').html(businessOptions).filterable().listview();
        },

        render: function ()
        {
            this.coords = "",
            this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw",
            this.getLocation();
            this.$el.html(this.template());
            return this;
        }
    });
    return SearchView;
});
