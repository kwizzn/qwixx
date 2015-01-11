var env = process.env.NODE_ENV || 'dev';

exports.get = function (env) {
    'use strict';
    return require('./' + env).config;
};

exports.name = env;
exports.current = exports.get(env);
