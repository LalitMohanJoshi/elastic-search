
const { Client } = require("@elastic/elasticsearch");
const constants = require("../configs/constant");

const createEsClient = (() => {
    try {
        const esc_options = {};
        esc_options['cloud'] = { id: constants.esCloudId };
        esc_options['auth'] = { apiKey: constants.esApiKey };

        global.esClient = new Client(esc_options);
        // console.log("esClient : " + JSON.stringify(esClient));
        console.log("esClient : connected ");
    } catch (error) {
        console.log("createEsClient Error : ", error.stack);
    }
});


module.exports = {
    createEsClient
}
