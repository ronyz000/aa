const route = require("express").Router();
const Controller = require("../controller/rack.controller");



route.post("/create_rack", Controller.create);
route.post("/all_racks", Controller.list);
route.get("/rack_details/:id", Controller.details);
route.put("/edit_rack/:id", Controller.update);
route.delete("/deleteall_racks", Controller.deleteAll);
route.post("/active_racks", Controller.findAllActive);

module.exports = route;