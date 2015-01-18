'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    FailModel = require('../models/FailModel'),
    ColorItemView = require('./ColorItemView'),
    SumView = require('./SumView');

module.exports = Backbone.View.extend({

    model: FailModel,

    events: {
        'click button': 'checkItem'
    },

    initialize: function() {
        this.model = new FailModel();
        this.sumView = new SumView({ model: this.model, className: 'result' });
        this.setLastItemIndex();
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.empty();
        _(this.model.attributes).each(function(val, key) {
            var colorItemView = new ColorItemView({ model: this.model, value: key, active: val, disabled: key <= this.lastItemIndex });
            this.$el.append(colorItemView.render().el);
        }, this);

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
