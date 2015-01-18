'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'span',

    initialize: function() {
        this.value = this.model.getTotal();
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.model.getTotal());
        return this;
    }

});
