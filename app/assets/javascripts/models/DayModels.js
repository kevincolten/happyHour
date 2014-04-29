define(['backbone', './EventModels'],

function(Backbone, EventModels) {
    
    var DayModels = {};

    DayModels.Model = Backbone.Model.extend({
        defaults: {
            day_name : "",
            events: []
        }
    });

    DayModels.Collection = Backbone.Collection.extend({

        model: DayModels.Model,

        url: 'api/days.json'

    });

    return DayModels;
});