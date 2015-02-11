'use strict';

var ColorModel = require('./ColorModel'),
    _ = require('underscore');

module.exports = ColorModel.extend({

    defaults: {
         1: false,
         2: false,
         3: false,
         4: false
    },

    checkItem: function(val) {
        this.set(val, !this.get(val));
        window.localStorage.setItem(this.color, JSON.stringify(this.toJSON()));
    },

    getItemsCount: function() {
        return _(this.attributes).countBy(function(val) { return val === true; }).true || 0;
    },

    getTotal: function() {
        return this.getItemsCount() * -5;
    }

});
