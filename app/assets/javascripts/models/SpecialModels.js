define(['backbone'],

function(Backbone) {
    
    var SpecialModels = {};

    SpecialModels.Model = Backbone.Model.extend({
        url: 'api/specials/',

        defaults: {
            business_reference: undefined,
            business_naem: undefined,
            event_id: undefined,
            event_type_id: undefined,
            event_tag_ids: [],
            event_day_ids:[],
            off: undefined,
            item_id: undefined,
            price: undefined,
            start_time: undefined,
            end_time: undefined,
            special_tag_ids: []
        }
    });

    SpecialModels.Collection = Backbone.Collection.extend({

        model: SpecialModels.Model,

        url: 'api/specials.json'
    });

    return SpecialModels;
});