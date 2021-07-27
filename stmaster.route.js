const express = require('express'); 
const route = express.Router(); 


const stmaster = require("../controllers/stmaster.controller"); 
const {auth} = require("../auth/tokenDecode");


route.post('/create-store', stmaster.createStore);
route.post('/update-store', stmaster.update);

route.post('/list-store', stmaster.listStoreMaster);
route.post('/detail-store', stmaster.detailsStoreMaster);



module.exports = route;