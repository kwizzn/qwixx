'use strict';

var Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.Model.extend({

    initialize: function() {
        this.listenTo(this.get('red'), 'change', this.change);
        this.listenTo(this.get('yellow'), 'change', this.change);
        this.listenTo(this.get('green'), 'change', this.change);
        this.listenTo(this.get('blue'), 'change', this.change);
        this.listenTo(this.get('fail'), 'change', this.change);
    },

    change: function() {
        this.trigger('change', this);
    },

    getTotal: function() {
        return _(this.attributes).reduce(function(memo, model) { return memo + model.getTotal(); }, 0);
    }

});
