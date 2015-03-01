'use strict';
var _ = require('underscore'),
    ColorModel = require('../lib/models/ColorModel');

describe('ColorModel', function() {

    beforeEach(function() { });

    afterEach(function() {
        window.localStorage.clear();
    });

    describe('initialize()', function() {
        it('should restore correctly from local storage', function(){
            var defaults = _(ColorModel.prototype.defaults).clone();
            defaults[2] = defaults[4] = defaults[6] = true;
            window.localStorage.setItem('red', JSON.stringify(defaults));

            var colorModel = new ColorModel(null, { color: 'red' });
            expect(colorModel.get(2)).to.be.true;
            expect(colorModel.get(4)).to.be.true;
            expect(colorModel.get(6)).to.be.true;
        });
    });

    describe('getItemsCount()', function() {
        it('should return 0 after initialization', function(){
            var colorModel = new ColorModel(null, { color: 'red' });
            expect(colorModel.getItemsCount()).to.equal(0);
        });
    });

});
