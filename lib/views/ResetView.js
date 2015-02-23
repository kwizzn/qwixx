'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'button',
    className: 'reset',
    attributes: {
        'data-type': 'reset'
    },

    events: {
        click: 'click'
    },

    render: function() {
        this.$el.text('Reset');
        return this;
    },

    click: function() {
        this.trigger('app:reset');
    }

});
