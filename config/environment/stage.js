'use strict';

// Config for NODE_ENV=stage
module.exports.config = {
    urls: {
        cdn: '//stage-deals-cdn.type10.com'
    },
    elasticsearch: {
        indices: {
            app   : 'type10deals_stage'
        }
    }
};
