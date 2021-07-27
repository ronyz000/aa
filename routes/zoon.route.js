const route = require("express").Router();
const Controller = require("../controller/zoon.controller");



route.post("/create_zoon", Controller.create);
route.get("/all_zoons", Controller.list);
route.post("/zoon_details/:id", Controller.details);
route.put("/edit_zoon/:id", Controller.update);
route.delete("/delete_zoon/:id", Controller.delete);
route.delete("/deleteall_zoons", Controller.deleteAll);
route.get("/active_zoons", Controller.findAllActive);

module.exports = route;