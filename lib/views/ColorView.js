'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    ColorModel = require('../models/ColorModel'),
    ButtonView = require('./ButtonView'),
    SumView = require('./SumView');

module.exports = Backbone.View.extend({

    model: ColorModel,

    initialize: function(options) {
        options = options || {};
        this.model = new ColorModel();
        this.sumView = new SumView({ model: this.model, className: 'result' });
        this.reverse = options.reverse;
        this.setLastItemIndex();
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.empty();

        _(this.model.attributes).each(function(val, key) {
            var disabled = key <= this.lastItemIndex;
            if (key === '12' && this.model.getItemsCount() < 5) {
                disabled = true;
            }
            var buttonView = new ButtonView({ model: key, active: val, disabled: disabled, reverse: this.reverse });
            this.listenTo(buttonView, 'click', this.checkItem);
            this.$el.append(buttonView.render().el);
        }, this);

        this.$el.append(this.sumView.render().el).addClass('colorRow');

        return this;
    },

    setLastItemIndex: function() {
        this.lastItemIndex = 0;
        _(this.model.attributes).each(function(val, key) {
            if (val) {
                this.lastItemIndex = parseInt(key);
            }
        }, this);
    },

    checkItem: function(val) {
        val = parseInt(val);
        this.lastItemIndex = val;
        this.model.checkItem(val);
    }

});
