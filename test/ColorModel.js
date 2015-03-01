'use strict';
var ColorModel = require('../lib/models/ColorModel');

describe('ColorModel', function() {

    beforeEach(function() { });
    afterEach(function() { });

    describe('getItemsCount()', function() {
        it('should return 0 after initialization', function(){
            var colorView = new ColorModel({ className: 'red' });
            expect(colorView.getItemsCount()).to.equal(0);
        });
    });

});
