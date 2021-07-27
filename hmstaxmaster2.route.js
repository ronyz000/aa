const express = require('express');
const router = express.Router();

const taxMaster=require("../controllers/hmstaxmaster2.controllers");
router.post("/create-taxmaster",taxMaster.createTaxMaster)
router.post("/update-taxmaster",taxMaster.updateTaxMaster)
router.post("/list-taxmaster",taxMaster.listTaxMaster)
router.post("/detail-taxmaster",taxMaster.detailTaxMaster)
module.exports = router;