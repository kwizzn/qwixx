'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    FailModel = require('../models/FailModel'),
    ButtonView = require('./ButtonView'),
    SumView = require('./SumView');

module.exports = Backbone.View.extend({

    model: FailModel,

    events: {
        'click button': 'checkItem'
    },

    initialize: function() {
        this.model = new FailModel();
        this.sumView = new SumView({ model: this.model, className: 'result' });
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.empty();
        _(this.model.attributes).each(function(val, key) {
            var disabled = key <= this.getLastItemIndex() || key > this.getLastItemIndex() + 1;
            var buttonView = new ButtonView({ model: key, active: val, disabled: disabled, icon: 'ban-circle' });
            this.listenTo(buttonView, 'click', this.checkItem);
            this.$el.append(buttonView.render().el);
        }, this);

        this.$el.append(this.sumView.render().el);
        this.$el.addClass('colorRow');

        return this;
    },

    getLastItemIndex: function() {
        var lastItemIndex = 0;
        _(this.model.attributes).each(function(val, key) {
            if (val) {
                lastItemIndex = parseInt(key);
            }
        }, this);
        return lastItemIndex;
    },

    checkItem: function(val) {
        val = parseInt(val);
        this.model.checkItem(val);
    }

});
