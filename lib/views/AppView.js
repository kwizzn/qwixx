'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = window.$ = Backbone.$ = require('jquery'),
    template = require('../../templates/app.hbs');

module.exports = Backbone.View.extend({

    el: 'body',
    className: 'container-fluid',
    template: template,

    render: function() {
        this.$el.html(this.template());
        return this;
    }

});
