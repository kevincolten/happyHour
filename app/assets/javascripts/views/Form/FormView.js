define(['backbone', '../../models/SpecialModels', 'tpl!../../templates/Form/Form.tpl', "serializeJSON"], 

function(Backbone, SpecialModels, FormTemplate) {

    var FormView = Backbone.View.extend({

        template: FormTemplate,

        attributes: {
            "data-page": "form"
        },

        events: {
            'submit form': 'formSubmit',
            'change #businesses': 'getBusinessDetails',
            'change #start-range': 'convertStartTime',
            'change #end-range': 'convertEndTime',
            'change #price-slider': 'insertPrice',
            'click #add-business': 'addBusiness',
            'click #to-list': 'toList'

        },

        initialize: function (options)
        {
            this.listenTo(this.model, 'sync', this.render);
            this.model.fetch();
            this.coords = "";
            this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw";

            if (options.params) {
                var reference = options.params.business_reference;
                this.getBusinessDetails(reference);
            }

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
            this.$(".ui-slider:lt(2)").remove();
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

        getBusinessDetails: function (business_reference)
        {
            var that = this;
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/details/json",
                data: { key: this.google_key,
                        reference: business_reference,
                        sensor: false },
                success: function (details)
                {
                    var details = details.result;
                    that.$('#business-details').val(
                        details.id + "|" +
                        details.name + "|" +       
                        details.formatted_address + "|" +
                        details.formatted_phone_number + "|" +
                        details.website + "|" +
                        details.geometry.location.lat + "|" +
                        details.geometry.location.lng
                    )
                    that.$('#add-business').html(details.name);
                }
            })
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
