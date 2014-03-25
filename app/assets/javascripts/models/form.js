HappyHour.Models.Form = Backbone.Model.extend({
    url: "/api/form.json",
    defaults: {
        businesses: [],
        event_types: [],
        event_tags: [],
        days: [],
        items: [],
        special_tags: []
    }
});
