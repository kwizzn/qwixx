'use strict';

// Config for NODE_ENV=int
module.exports.config = {
    urls: {
        cdn: '//int-deals-cdn.type10.com'
    },
    elasticsearch: {
        indices: {
            app   : 'type10deals_int'
        }
    }
};
