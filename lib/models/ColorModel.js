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
        12: false,
        99: false
    },

    initialize: function(attr, options) {
        options = options || {};
        this.color = options.color;
        var value = window.localStorage.getItem(this.color);
        if (value) {
            this.set(JSON.parse(value));
        }
    },

    checkItem: function(val) {
        this.set(val, !this.get(val));
        if (val === 12) {
            this.set(99, true);
        }
        window.localStorage.setItem(this.color, JSON.stringify(this.toJSON()));
    },

    getItemsCount: function() {
        return _(this.attributes).countBy(function(val, key) {
            if (key === '99') {
                return this.get(12);
            }
            return val === true;
        }, this).true || 0;
    },

    getTotal: function() {
        var count = this.getItemsCount();
        return count + count * (count -1) / 2;
    }

});
