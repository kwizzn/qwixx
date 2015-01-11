'use strict';

var packageJSON = require('../../package.json');
var _ = require('underscore');

module.exports = {
    exists: function (value, fallback) {
        return value || fallback;
    },

    ifEqual: function (options) {
        var params = _.extend({}, options.hash);

        if(params.v1 === params.v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    ifCond: function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },

    json: function (key, json) {
        if (!key || !json) {
            return;
        }

        return 'var ' + key + '=' + JSON.stringify(json) + ';';
    },

    package: function (key) {
        return packageJSON[key];
    },

    price: function (amount, currency) {
        if (!amount) {
            return '';
        }
        amount = amount.toFixed(2);
        switch (currency) {
            case 'USD':
                return '$' + amount;
        }
        return amount;
    },

    discount: function (dealPrice, regularPrice, listPrice) {
        if (!dealPrice || !regularPrice || !listPrice) {
            return;
        }
        if (dealPrice >= listPrice) {
            return;
        }
        return Math.round((1 - dealPrice / (listPrice || regularPrice)) * 100) +'%';
    }
};
