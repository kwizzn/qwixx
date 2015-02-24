(function() {
    'use strict';

    var AppView = require('./lib/views/AppView');

    function start() {
        window.app = {
            appView: new AppView()
        };
        window.app.appView.render();
    }

    start();

}(window));
