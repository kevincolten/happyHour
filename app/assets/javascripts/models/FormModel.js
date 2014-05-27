define(['./BusinessModels'],

function(BusinessModels)
{
    var FormModel = Backbone.Model.extend({
        url: "/api/form.json",
        defaults: {
            event_types: [],
            event_tags: [],
            days: [],
            items: [],
            special_tags: []
        }
    });
    return FormModel;
});
