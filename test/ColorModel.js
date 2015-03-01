'use strict';
var ColorModel = require('../lib/models/ColorModel');

describe('ColorModel', function() {

    beforeEach(function() { });
    afterEach(function() { });

    describe('getItemsCount()', function() {
        it('should return 0 after initialization', function(){
            var colorModel = new ColorModel(null, { color: 'red' });
            expect(colorModel.getItemsCount()).to.equal(0);
        });
    });

});
