'use strict';

// Config for NODE_ENV= or NODE_ENV=dev
module.exports.config = {
    urls: {
        cdn: '//deals-cdn.type10.dev'
    },
    elasticsearch: {
        indices: {
            app   : 'type10deals'
        }
    }
};
