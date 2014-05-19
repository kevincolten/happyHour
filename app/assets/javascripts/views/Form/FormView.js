define(['backbone', 
        '../../models/SpecialModels',
        '../../models/EventModels',
        'tpl!../../templates/Form/Form.html',
        'serializeJSON',
        "async!https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"],

function(Backbone, SpecialModels, EventModels, FormTemplate) {

    var FormView = Backbone.View.extend({

        template: FormTemplate,

        attributes: {
            "data-page": "form"
        },

        events: {
            'submit form': 'formSubmit',
            'change #businesses': 'getBusinessDetails',
            'change #event-types [type="radio"]': 'fetchEvents',
            'change #start-range': 'convertStartTime',
            'change #end-range': 'convertEndTime',
            'change #price-slider': 'insertPrice',
            'click #add-business': 'addBusiness',
            'click #to-list': 'toList',
            'click .listed-event': 'prefillForm'

        },

        initialize: function (options)
        {
            this.listenTo(this.model, 'sync', this.render);
            this.model.fetch();
            // this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw";
            this.selectedEventId = "";

            if (options.params) {
                var reference = options.params.business_reference;
                var map = new google.maps.Map($('<div></div>').get(0)); // has to have a node
                this.service = new google.maps.places.PlacesService(map);
                this.getBusinessDetails(reference);
            }
        },

        prefillForm: function(e)
        {
            e.preventDefault();
            var that = this;
            this.selectedEventId = $(e.currentTarget).attr('data-event-id');
            var selectedListEvent = this.listedEvents.get(this.selectedEventId);
            _.each(selectedListEvent.get('days'), function(day) {
                that.$('#' + day.name).click();
            });
            this.$('#start-range').val(selectedListEvent.get('start_min'));
            this.$('#end-range').val(selectedListEvent.get('end_min'));
            this.$('#time').rangeslider('refresh');
            _.each(selectedListEvent.get('event_tags'), function(tag) {
                that.$('#' + tag.label).click();
            });
            this.$('#event-specials').html("");
            _.each(selectedListEvent.get('specials'), function(special) {
                var details = [special.item, special.price].join(" ");
                this.$('#event-specials').append('<li><a href="#">' + details + '</a></li>')
            }, this)
            this.$('#event-specials').listview({inset: true, icon: 'carat-d'}).listview("refresh").show();


        },

        fetchEvents: function(e)
        {
            if (this.$('#business-details').val()) {
                var event_type_id = this.$(e.currentTarget).val();
                this.listedEvents = new EventModels.Collection();
                this.listenTo(this.listedEvents, "sync", this.listEvents)
                this.listedEvents.fetch({ data: { business_id: this.$('#business-details').val().split("|")[0],
                                                  event_type_id: event_type_id }});
            }
        },

        listEvents: function(events)
        {
            this.$('#business-events').html("");
            events.each(function(eventModel) {
                var details = [eventModel.get("event_name"),
                               _.pluck(eventModel.get('days'), 'name').join(", "),
                               eventModel.get('start_time_for') + " - " + eventModel.get('end_time_for')].join(" ");
                this.$('#business-events').append('<li><a href="#" class="listed-event" data-event-id="' + eventModel.id + '">' + details + '</a></li>')
            }, this)
            this.$('#business-events').listview({inset: true, icon: 'carat-d'}).listview("refresh").show();

        },

        toList: function(e)
        {
            e.preventDefault();
            Backbone.history.navigate('/?back=true', {trigger: true});
        },

        addBusiness: function (e) {
            e.preventDefault();
            Backbone.history.navigate('search', {trigger: true});
        },

        formSubmit: function (e) {
            e.preventDefault();
            var serializedForm = this.$('form').serializeJSON();
            if (this.selectedEventId) {
                serializedForm.event_id = this.selectedEventId;
            }
            var specialModel = new SpecialModels.Model(serializedForm);
            specialModel.save();
        },

        buildForm: function ()
        {
            var eventTypeOptions = _.map(this.model.get('event_types'), function (event_type) {
                return '<input type="radio" name="event[event_type_ids][]" value="' + event_type.id + '" id="' + event_type.name + '"><label for="' + event_type.name + '">' + event_type.name + '</label>';
            });

            var eventTagOptions = _.map(this.model.get('event_tags'), function (event_tag) {
                return '<input type="checkbox" name="event[event_tag_ids][]" value="' + event_tag.id + '" id="' + event_tag.label + '"><label for="' + event_tag.label + '">#' + event_tag.label + '</label>';
            });

            var eventDaysOptions = _.map(this.model.get('days'), function (event_day) {
                return '<input type="checkbox" name="event[event_day_ids][]" value="' + event_day.id + '" id="' + event_day.name + '"><label for="' + event_day.name + '">' + event_day.name + '</label>';
            });

            var itemOptions = _.map(this.model.get('items'), function (item) {
                return '<input type="radio" name="special[item_id]" value="' + item.id + '" id="' + item.name + '"><label for="' + item.name + '">' + item.name + '</label>';
            });

            var specialTagOptions = _.map(this.model.get('special_tags'), function (special_tag) {
                return '<input type="checkbox" name="special[special_tag_ids][]" value="' + special_tag.id + '" id="' + special_tag.label + '"><label for="' + special_tag.label + '">#' + special_tag.label + '</label>';
            });

            this.$('#event-types').html(eventTypeOptions);
            this.$('#event-tags').html(eventTagOptions);
            this.$('#event-days').html(eventDaysOptions);
            this.$('#items').html(itemOptions);
            this.$('#special-tags').html(specialTagOptions);

            this.activateWidgets();
        },

        activateWidgets: function(e)
        {
            this.$('#header').toolbar()

            this.$('#event-types').controlgroup();
            this.$('#event-tags').controlgroup();
            this.$('#event-days').controlgroup();
            this.$('#items').controlgroup();
            this.$('#special-tags').controlgroup();
            this.$('#price-slider').slider();
            this.$("[type='submit']").button();
            this.$("#price").textinput();
            this.$("#half").checkboxradio();
            this.$("#price-off").checkboxradio();
            this.$("#time").rangeslider();
            this.$(".ui-slider:lt(2)").hide();
            this.$("#start-time").textinput();
            this.$("#end-time").textinput();

            this.$('#price').val('$3.50');
            this.$('#add-business').html(this.business);
        },

        convertStartTime: function(e) {
            this.$('#start-time').val(this.convertTime(e.target.value));
        },

        convertEndTime: function(e) {
            this.$('#end-time').val(this.convertTime(e.target.value));
        },

        convertTime: function (minutes) {
            var minutes = parseInt(minutes);
            var hours = Math.floor(minutes / 60).toString();
            minutes = minutes - (hours * 60).toString();

            hours = ('0' + hours).slice(-2);
            minutes = ('0' + minutes).slice(-2);

            return hours+':'+minutes+':00';
        },

        insertPrice: function (e) {
            var price = parseFloat(e.target.value).toFixed(2);
            if (price != 0.00) {
                this.$('#price').val('$' + price);
            } else {
                this.$('#price').val('free!');
            }
        },

        getBusinessDetails: function (reference)
        {
            var that = this;
            this.service.getDetails({ reference: reference }, function (place, status) {
                that.$('#business-details').val(
                place.id + "|" +
                place.name + "|" +       
                place.formatted_address + "|" +
                place.formatted_phone_number + "|" +
                place.website + "|" +
                place.geometry.location.lat + "|" +
                place.geometry.location.lng
            )
            that.$('#add-business').html(place.name);
            });
        },

        render: function ()
        {
            this.$el.html(this.template());
            this.buildForm();
            return this;
        }
    });
    return FormView;
});
