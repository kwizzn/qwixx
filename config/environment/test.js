'use strict';

// Config for NODE_ENV=test
module.exports.config = {
    urls: {
        cdn: '//test-deals-cdn.type10.com'
    },
    elasticsearch: {
        indices: {
            app   : 'type10deals_test'
        }
    }
};
