var express = require("express");
const esController = require("../controller/esController");
var router = express.Router();

router.get("/", esController.dashboard);

router.post("/create", esController.insertData);

router.post("/update", esController.updateData);

router.post("/delete", esController.deleteData);

router.post("/view", esController.getData);

router.post("/search", esController.searchData);

module.exports = router;