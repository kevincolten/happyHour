define(['backbone'],

function(Backbone) {
    
    var SpecialModels = {};

    SpecialModels.Model = Backbone.Model.extend({
        url: 'api/specials/',
    });

    SpecialModels.Collection = Backbone.Collection.extend({

        model: SpecialModels.Model,

        url: 'api/specials.json'
    });

    return SpecialModels;
});