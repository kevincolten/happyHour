define(["backbone",
        "tpl!../../templates/Search/Search",
        "async!https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"], 

function(Backbone, SearchTemplate) {

    var SearchView = Backbone.View.extend({

        template: SearchTemplate,

        attributes: {
            "data-page": "search"
        },

        events: {
            'keyup input': 'searchBusinesses',
            'click a': 'selectBusiness'
        },

        initialize: function ()
        {
            this.coords = undefined;
            var map = new google.maps.Map($('<div></div>').get(0)); // has to have a node
            this.service = new google.maps.places.PlacesService(map);
        },

        getLocation: function ()
        {
            var that = this;
            var success = function (pos)
            {
                that.coords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
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
            
            var request = { location: this.coords,
                            radius: '8000',
                            types: ['bar', 'restaurant'],
                            rankby: google.maps.places.RankBy.DISTANCE };

            this.service.nearbySearch(request, function (results, status) {
                that.buildBusinessList(results);
            });
        },

        searchBusinesses: function (e)
        {
            var that = this;

            if (e.target.value.length > 2 && this.coords) {
                var request = {
                    location: that.coords,
                    radius: '8000',
                    types: ['bar', 'restaurant'],
                    query: e.target.value };

                that.service.textSearch(request, function (results, status) {
                    if (results.length) {
                        that.buildBusinessList(results);
                    }
                });

            } else if (!e.target.value) {
                this.getNearbyPlaces();
            }
        },

        selectBusiness: function (e)
        {

            var reference = this.$(e.currentTarget).attr('data-reference')
            Backbone.history.navigate('form?business_reference=' + reference, { trigger: true });
        },

        buildBusinessList: function (businesses)
        {
            var businessOptions = _.map(businesses, function(business) {
                return '<li><a href="#form" data-reference="' + business.reference + '">' + business.name + '</a></li>'
            })
            this.$('#business-list').html(businessOptions);
        },

        render: function ()
        {
            this.$el.html(this.template());
            this.getLocation();
            return this;
        }
    });
    return SearchView;
});
