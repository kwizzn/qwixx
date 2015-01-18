'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'button',

    events: {
        click: 'click'
    },

    initialize: function(options) {
        options = options || {};
        this.active = options.active;
        this.disabled = options.disabled;
        this.reverse = options.reverse;
        this.icon = options.icon;
    },

    render: function() {
        this.$el.html(this.getDisplayValue(this.model));
        if (this.active) {
            this.$el.addClass('active');
        } else if (this.disabled) {
            this.$el.addClass('disabled');
        }
        return this;
    },

    getDisplayValue: function(val) {
        if (this.icon) {
            return '<span class="glyphicon glyphicon-' + this.icon + '" aria-hidden="true"></span>';
        }
        if (this.model === '99') {
            return '<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>';
        }
        return this.reverse ? 14 - val : val;
    },

    click: function() {
        this.trigger('click', this.model);
    }

});
