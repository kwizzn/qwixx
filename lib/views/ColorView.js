'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    ColorModel = require('../models/ColorModel'),
    ButtonView = require('./ButtonView'),
    SumView = require('./SumView');

module.exports = Backbone.View.extend({

    model: ColorModel,

    events: {
        'click button': 'checkItem'
    },

    initialize: function() {
        this.model = new ColorModel();
        this.sumView = new SumView({ model: this.model, className: 'result' });
        this.setLastItemIndex();
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.empty();
        _(this.model.attributes).each(function(val, key) {
            var buttonView = new ButtonView({ model: this.model, value: key, active: val, disabled: key <= this.lastItemIndex });
            this.$el.append(buttonView.render().el);
        }, this);

        var lockRow = this.model.getItemsCount() >= 5 && this.model.get(12);
        var buttonView = new ButtonView({ value: '<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>', active: lockRow, disabled: true });
        this.$el.append(buttonView.render().el);

        this.$el.append(this.sumView.render().el);
        this.$el.addClass('colorRow');

        return this;
    },

    setLastItemIndex: function() {
        this.lastItemIndex = 0;
        _(this.model.attributes).each(function(val, key) {
            if (val) {
                this.lastItemIndex = key;
            }
        }, this);
    },

    checkItem: function(ev) {
        var val = parseInt(ev.target.innerHTML);
        this.lastItemIndex = val;
        this.model.checkItem(ev.target.innerHTML);
    }

});
