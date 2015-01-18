'use strict';

var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    template = require('../../templates/app.hbs'),
    ColorRowView = require('./ColorRowView'),
    FailView = require('./FailView'),
    TotalView = require('./TotalView');

module.exports = Backbone.View.extend({

    el: 'body',
    className: 'container-fluid',
    template: template,

    initialize: function() {
        this.redColorRowView = new ColorRowView({ className: 'red' });
        this.yellowColorRowView = new ColorRowView({ className: 'yellow' });
        this.greenColorRowView = new ColorRowView({ className: 'green' });
        this.blueColorRowView = new ColorRowView({ className: 'blue' });
        this.failView = new FailView({ className: 'grey' });
        this.totalView = new TotalView({
            red: this.redColorRowView.model,
            yellow: this.yellowColorRowView.model,
            green: this.greenColorRowView.model,
            blue: this.blueColorRowView.model,
            fail: this.failView.model
        });
    },

    render: function() {
        this.$el.html(this.template());
        this.$('#container').append(this.redColorRowView.render().el);
        this.$('#container').append(this.yellowColorRowView.render().el);
        this.$('#container').append(this.greenColorRowView.render().el);
        this.$('#container').append(this.blueColorRowView.render().el);
        this.$('#container').append(this.failView.render().el);
        this.$('#container').append(this.totalView.render().el);
        return this;
    }

});
