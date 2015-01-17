'use strict';

var Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.Model.extend({

    defaults: {
         2: false,
         3: false,
         4: false,
         5: false,
         6: false,
         7: false,
         8: false,
         9: false,
        10: false,
        11: false,
        12: false
    },

    checkItem: function(val) {
        this.set(val, true);
    },

    getItemsCount: function() {
        return _(this.attributes).countBy(function(val) { return val === true; }).true || 0;
    },

    // TODO: Improve with formula
    getTotal: function() {
        var scoreTable = {
            0: 0,
            1: 1,
            2: 3,
            3: 6,
            4: 10,
            5: 15,
            6: 21,
            7: 28,
            8: 36,
            9: 45,
            10: 55,
            11: 66,
            12: 78
        };
        return scoreTable[this.getItemsCount()];
    }

});
