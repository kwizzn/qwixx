'use strict';

// Config for NODE_ENV=prod
module.exports.config = {
    urls: {
        cdn: '//deals-cdn.type10.com'
    },
    elasticsearch: {
        indices: {
            app   : 'type10deals'
        }
    }
};
