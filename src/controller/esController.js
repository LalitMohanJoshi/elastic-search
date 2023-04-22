const { uuid } = require("uuidv4");
const indicesList = require("../configs/indices");

const dashboard = ((req, res) => {
    res.send("Elastic Search Route is working fine");
})

const getData = (async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;

    try {
        const esClientObj = global.esClient;
        const objBody = req.body;
        const dId = objBody.id;

        let dObj = await esClientObj.get({
            index: indicesList.game_of_thrones,
            id: dId,
        });
        console.log("getData : ", dObj);

        objResponse['status'] = true;
        objResponse['message'] = dObj;

    } catch (error) {
        console.log("getData Error: ", error.stack);
        // objResponse['error'] = "getData Error";
        objResponse['message'] = "No Record Found";

    }
    res.send(objResponse);
});

const insertData = (async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;

    try {
        const esClientObj = global.esClient;
        const objBody = req.body;
        
        delete objBody.id;

        objBody.enId = uuid();
        objBody.time = new Date(Date.now()).toISOString()

        let insObj = await esClientObj.index({
            index: indicesList.game_of_thrones,
            document: objBody
        });
        console.log("insertData : ", insObj);

        objResponse['status'] = true;
        objResponse['message'] = insObj;

    } catch (error) {
        console.log("insertData Error: ", error.stack);
        objResponse['error'] = "insertData Error: ";
    }
    res.send(objResponse);
});

const updateData = (async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;

    try {
        const esClientObj = global.esClient;
        const objBody = req.body;
        const dId = objBody.id;
        delete objBody.id;

        let updObj = await esClientObj.index({
            index: indicesList.game_of_thrones,
            id: dId,
            document: objBody
        });
        console.log("updateData : ", updObj);

        objResponse['status'] = true;
        objResponse['message'] = updObj;

    } catch (error) {
        console.log("updateData Error: ", error.stack);
        objResponse['error'] = "updateData Error: ";
    }
    res.send(objResponse);
});

const deleteData = (async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;

    try {
        const esClientObj = global.esClient;
        const objBody = req.body;
        const dId = objBody.id;

        let insObj = await esClientObj.delete({
            index: indicesList.game_of_thrones,
            id: dId,
        });
        console.log("deleteData : ", insObj);

        objResponse['status'] = true;
        objResponse['message'] = insObj;

    } catch (error) {
        console.log("deleteData Error: ", error.stack);
        objResponse['error'] = "deleteData Error: ";
    }
    res.send(objResponse);
});

const searchData = (async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;
    try {
        const esClientObj = global.esClient;

        const schObj = req.body;

        let objData = await esClientObj.search({
            index: indicesList.game_of_thrones,
            query: {
                match: schObj
            }
        });
        console.log("searchData : ", objData);

        objResponse['status'] = true;
        objResponse['message'] = objData;
    } catch (error) {
        console.log("searchData Error: ", error.stack);
        objResponse['error'] = "searchData Error: ";
    }
    res.send(objResponse);
});

module.exports = {
    dashboard,
    getData,
    insertData,
    searchData,
    updateData,
    deleteData
}