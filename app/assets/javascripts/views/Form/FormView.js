define(['../Search/SearchView',
        '../../models/SpecialModels',
        '../../models/EventModels',
        'tpl!../../templates/Form/Form',
        "async!https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"],

function(SearchView, SpecialModels, EventModels, FormTemplate) {

    var FormView = Backbone.View.extend({

        template: FormTemplate,
        el: false,
        tagName: 'form',
        className: 'input-group',

        events: {
            'click .modal-launch': 'openModal',
            'click .icon-close': 'closeModal',
            'click .control-item.event-types': 'selectEventType',
            'click .event-tag': 'addEventTag',
            // select start time
            // select end time
            // 'click #to-list': 'toList',
            // 'click .listed-event': 'prefillForm',
            'click .control-item': 'selectType',
            'click #price-modal-btn': 'openPriceModal',
            'click #event-tags-modal-btn': 'openEventTagModal',
            'click .icon-list': 'goToList',
            'submit form': 'formSubmit',
        },

        initialize: function ()
        {
            this.special_model = new SpecialModels.Model();
            this.listedEvents = new EventModels.Collection();
            
            var map = new google.maps.Map($('<div></div>').get(0)); // has to have a node
            this.service = new google.maps.places.PlacesService(map);

            this.search_rendered = false;
            this.subscribe();
            this.model.fetch();
        },

        subscribe: function ()
        {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.special_model, "change:business_reference", this.getBusinessDetails);
            this.listenTo(this.special_model, "change:event_type_id", this.fetchEvents);
            this.listenTo(this.listedEvents, "sync", this.listEvents)
        },

        addEventTag: function(e)
        {
            e.preventDefault();
            var that = this;
            var existing_tag = _.find(this.special_model.get('event_tag_ids'), function (tag) {
                tag.id == $(e.currentTarget).attr('data-event-tag-id');
            })
            if (!existing_tag) {
                this.special_model.get('event_tag_ids').push($(e.currentTarget).attr('data-event-tag-id'));
                tag_labels = [];
                _.each(this.special_model.get('event_tag_ids'), function (tag_id) {
                    var tag = _.find(that.model.get('event_tags'), function (tag) {
                        return tag.id == tag_id;
                    });
                    tag_labels.push("#" + tag.label);
                });
                tag_labels.push("...");
                this.$('#event-tags').val(_.uniq(tag_labels).join(", "));
            }
            this.closeModal();
        },

        goToList: function (e)
        {
            window.history.back();
            return false;
        },

        openModal: function (e)
        {
            e.preventDefault();
            var modal_type = $(e.currentTarget).attr('data-modal');
            if (modal_type == 'business-modal') {
                var search_view = new SearchView({ model: this.special_model });
                if (!this.businessSearchRendered) {
                    this.$("#" + modal_type).append(search_view.el);
                    search_view.render();
                    this.search_rendered = true;
                }
            }
            this.$('#' + modal_type).addClass('active');
        },

        closeModal: function (e)
        {
            if (e) { 
                e.preventDefault();
            }
            this.$('.modal.active').removeClass('active');
        },

        radioCheckbox: function(e, button_type)
        {
            var target_classes = $(e.currentTarget).attr('class').split(" ");

            target_classes = _.map(target_classes, function (target_class) {
                return '.' + target_class;
            });

            if (button_type == "checkbox") {
                this.$(e.currentTarget).toggleClass('active');
            } else if (button_type == "radio") {
                this.$(target_classes.join("")).removeClass('active');
                this.$(e.currentTarget).addClass('active');
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
        },

        selectEventType: function(e)
        {
            e.preventDefault();
            this.radioCheckbox(e, 'radio');
            var event_type_id = this.$(e.currentTarget).attr('data-event-type-id');
            this.special_model.set('event_type_id', event_type_id);   
        },

        fetchEvents: function () {
            if (this.model.get('business_reference') && this.model.get('event_type_id')) {
                this.listedEvents.fetch({ data: { business_reference: this.model.get('business_reference'),
                                                  event_type_id: event_type_id }});
            }
        },

        listEvents: function()
        {
            // console.log("listing events");
            this.$('#business-events').html("");
            this.listedEvents.each(function(eventModel) {
                var details = [eventModel.get("event_name"),
                               _.pluck(eventModel.get('days'), 'name').join(", "),
                               eventModel.get('start_time_for') + " - " + eventModel.get('end_time_for')].join(" ");
                this.$('#business-events').append('<li><a href="#" class="listed-event" data-event-id="' + eventModel.id + '">' + details + '</a></li>')
            }, this)
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
            specialModel.save();
        },

        getBusinessDetails: function ()
        {
            var that = this;
            this.service.getDetails(
                { reference: this.model.get('business_reference') },
                function (place, status) {
                    that.$('#business-modal').removeClass('active');
                    that.$('#business-name').val(place.name);
                }
            );
        },

        render: function ()
        {
            this.$el.html(this.template({ model: this.model }));
            return this;
        }
    });
    return FormView;
});
