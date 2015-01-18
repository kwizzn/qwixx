'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'button',

    events: {
        click: 'click'
    },

    initialize: function(options) {
        this.active = options.active;
        this.disabled = options.disabled;
    },

    render: function() {
        this.$el.html(this.model !== '99' ? this.model : '<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>');
        if (this.active) {
            this.$el.addClass('active');
        } else if (this.disabled) {
            this.$el.addClass('disabled');
        }
        return this;
    },

    click: function() {
        this.trigger('click', this.model);
    }

});
