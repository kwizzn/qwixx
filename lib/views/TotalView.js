'use strict';

var Backbone = require('backbone'),
    SumView = require('./SumView'),
    TotalModel = require('../models/TotalModel');

module.exports = Backbone.View.extend({

    className: 'form-group totalRow',

    initialize: function(options) {
        this.model = new TotalModel(options);
        this.sumView = new SumView({ model: this.model, className: 'result total' });
    },

    render: function() {
        this.$el.html(this.sumView.render().el);
        return this;
    }

});
