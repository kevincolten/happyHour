define(['backbone'],

function(Backbone) {
    
    var EventModels = {};

    EventModels.Model = Backbone.Model.extend({
        url: 'api/events/:id'
    });

    EventModels.Collection = Backbone.Collection.extend({

        model: EventModels.Model,
        url: 'api/events.json'
        
    });

    return EventModels;
});