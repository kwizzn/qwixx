'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'span',
    value: 0,

    initialize: function() {
        this.listenTo(this.model, 'change', this.setValue);
    },

    setValue: function() {
        this.value = this.model.getTotal();
        this.render();
    },

    render: function() {
        this.$el.html(this.value);
        return this;
    }

});
