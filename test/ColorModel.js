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
            defaults[2] = defaults[4] = true;
            window.localStorage.setItem('red', JSON.stringify(defaults));

            var colorModel = new ColorModel(null, { color: 'red' });
            expect(colorModel.get(2)).to.be.true;
            expect(colorModel.get(4)).to.be.true;
        });
    });

    describe('checkItem()', function() {
        it('should check the value correctly and save to local storage', function(){
            var colorModel = new ColorModel(null, { color: 'red' });
            colorModel.checkItem(8);
            expect(colorModel.get(8)).to.be.true;

            expect(colorModel.get(8)).to.be.true;
            var stored = JSON.parse(window.localStorage.getItem('red'));
            expect(stored[8]).to.be.true;
        });
    });

    describe('getItemsCount()', function() {
        it('should return 0 after initialization', function(){
            var colorModel = new ColorModel(null, { color: 'red' });
            expect(colorModel.getItemsCount()).to.equal(0);
        });

        it('should return 0 after initialization', function(){
            var defaults = _(ColorModel.prototype.defaults).clone();
            defaults[2] = defaults[4] = defaults[6] = true;

            var colorModel = new ColorModel(defaults, { color: 'red' });
            expect(colorModel.getItemsCount()).to.equal(3);
        });
    });

    describe('getTotal()', function() {
        it('should return the score', function(){
            var defaults = _(ColorModel.prototype.defaults).clone();
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(0);
            defaults[2] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(1);
            defaults[3] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(3);
            defaults[4] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(6);
            defaults[5] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(10);
            defaults[6] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(15);
            defaults[7] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(21);
            defaults[8] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(28);
            defaults[9] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(36);
            defaults[10] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(45);
            defaults[11] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(55);
            defaults[12] = true;
            expect(new ColorModel(defaults, { color: 'red' }).getTotal()).to.equal(78); // Because "close" is true as well
        });
    });

});
