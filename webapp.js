(function() {
    'use strict';

    var AppView = require('./lib/views/AppView'),
        Backbone = require('backbone'),
        $ = window.$ = Backbone.$ = require('jquery'),
        _ = require('underscore')

    function start() {
        window.app = {
            appView: new AppView()
        };
        window.app.appView.render();
    }

    start();

}(window));
