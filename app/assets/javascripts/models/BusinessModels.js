define(['backbone'],

function(Backbone) {
    
    var BusinessModels = {};

    BusinessModels.Model = Backbone.Model.extend({
        url: 'api/businesses/:id',

        defaults: {
            reference: ""
        }
    });

    BusinessModels.Collection = Backbone.Collection.extend({

        model: BusinessModels.Model,

        url: 'api/businesses.json'
    });

    return BusinessModels;
});