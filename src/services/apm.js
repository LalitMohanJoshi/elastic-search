const constants = require('../configs/constant');
const elasticApm = require('elastic-apm-node')

const startApmService = (() => {
    let apm = elasticApm.start({
        serviceName: constants.ELASTIC_APM_SERVICE_NAME,
        secretToken: constants.ELASTIC_APM_SECRET_TOKEN,
        serverUrl: constants.ELASTIC_APM_SERVER_URL,
        environment: 'my-environment'
    });
});

module.exports = startApmService;