'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'button',

    initialize: function(options) {
        this.value = options.value;
        this.active = options.active;
        this.disabled = options.disabled;
    },

    render: function() {
        this.$el.html(this.value);
        if (this.active) {
            this.$el.addClass('active');
        } else if (this.disabled) {
            this.$el.addClass('disabled');
        }
        return this;
    }

});
