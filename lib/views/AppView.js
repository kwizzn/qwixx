'use strict';

var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    template = require('../../templates/app.hbs'),
    ColorView = require('./ColorView'),
    FailView = require('./FailView'),
    TotalView = require('./TotalView');

module.exports = Backbone.View.extend({

    el: 'body',
    className: 'container-fluid',
    template: template,

    initialize: function() {
        this.redColorView = new ColorView({ className: 'red' });
        this.yellowColorView = new ColorView({ className: 'yellow' });
        this.greenColorView = new ColorView({ className: 'green' });
        this.blueColorView = new ColorView({ className: 'blue' });
        this.failView = new FailView({ className: 'grey' });
        this.totalView = new TotalView({
            red: this.redColorView.model,
            yellow: this.yellowColorView.model,
            green: this.greenColorView.model,
            blue: this.blueColorView.model,
            fail: this.failView.model
        });
    },

    render: function() {
        this.$el.html(this.template());
        this.$('#container').append(this.redColorView.render().el);
        this.$('#container').append(this.yellowColorView.render().el);
        this.$('#container').append(this.greenColorView.render().el);
        this.$('#container').append(this.blueColorView.render().el);
        this.$('#container').append(this.failView.render().el);
        this.$('#container').append(this.totalView.render().el);
        return this;
    }

});