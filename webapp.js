(function() {
    'use strict';

    var AppView = require('./lib/views/AppView');

    function stopScrolling(ev) {
        ev.preventDefault();
    }

    function start() {
        document.addEventListener('touchstart', stopScrolling, false);
        document.addEventListener('touchstart', stopScrolling, false);

        window.app = {
            appView: new AppView()
        };
        window.app.appView.render();
    }

    start();

}(window));
