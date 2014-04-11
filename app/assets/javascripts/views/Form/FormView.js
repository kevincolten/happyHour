define(['backbone', 'tpl!../../templates/Form/Form.tpl'], 

function(Backbone, FormTemplate) {

    var FormView = Backbone.View.extend({

        template: FormTemplate,

        events: {
            'submit form': 'formSubmit',
            'change #businesses': 'getBusinessDetails',
            'change #start-range': 'convertStartTime',
            'change #end-range': 'convertEndTime',
            'change #price-slider': 'insertPrice',

        },

        initialize: function (options)
        {
            this.listenTo(this.model, 'sync', this.buildForm);
            this.coords = "";
            this.google_key = "AIzaSyCeuEvuGpwUDfUj4ICs1wcLMMYktV7f3Cw";
        },

        formSubmit: function(e) {
            e.preventDefault();
            $.ajax({ type: "POST",
                     url: "api/specials",
                     data: this.$('form').serialize() });
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
                return '<input type="radio" name="special[item_ids][]" value="' + item.id + '" id="' + item.name + '"><label for="' + item.name + '">' + item.name + '</label>';
            });

            var specialTagOptions = _.map(this.model.get('special_tags'), function (special_tag) {
                return '<input type="checkbox" name="special[special_tag_ids][]" value="' + special_tag.id + '" id="' + special_tag.label + '"><label for="' + special_tag.label + '">#' + special_tag.label + '</label>';
            });

            this.$('#event-types .ui-controlgroup-controls').html(eventTypeOptions).trigger('create');
            this.$('#event-types .ui-controlgroup-controls').children().first().children('label').addClass('ui-first-child');
            this.$('#event-types .ui-controlgroup-controls').children().last().children('label').addClass('ui-last-child');
            this.$('#event-tags .ui-controlgroup-controls').html(eventTagOptions).trigger('create');
            this.$('#event-days .ui-controlgroup-controls').html(eventDaysOptions).trigger('create');
            this.$('#event-days .ui-controlgroup-controls').children().first().children('label').addClass('ui-first-child');
            this.$('#event-days .ui-controlgroup-controls').children().last().children('label').addClass('ui-last-child');
            this.$('#items .ui-controlgroup-controls').html(itemOptions).trigger('create');
            this.$('#special-tags .ui-controlgroup-controls').html(specialTagOptions).trigger('create');

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

        getBusinessDetails: function (e)
        {
            var that = this;
            var business_reference = this.$('#business').val();
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/details/json",
                data: { key: this.google_key,
                        reference: business_reference,
                        sensor: false },
                success: function (details)
                {
                    var details = details.result;
                    that.$('#business_details').val(
                        details.id + "|" +
                        details.name + "|" +       
                        details.formatted_address + "|" +
                        details.formatted_phone_number + "|" +
                        details.website + "|" +
                        details.geometry.location.lat + "|" +
                        details.geometry.location.lng
                    )
                }
            })
        },

        render: function ()
        {
            this.$el.html(this.template({hello: "hello"}));
            this.$('#price').val('$3.50');
            this.$('#add-business').html(this.business);
            return this;
        }
    });
    return FormView;
});
