const db = require("../models");
const rackdb = db.rack;
const { testVal, update } = require("../validation/rack.validation");
exports.create = async (req, res) => {
    try {
        let validate = await testVal.validateAsync(req.body);

        let newData = await rackdb.create(validate);
console.log(newData)
        return res.status(201).json({
            message: "successfully created",
            result: newData
        });

    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            err: err.err || err
        });
    }
}
exports.list = async (req, res) => {
    try {

        let newData = await rackdb.findAll();

        return res.status(201).json({
            message: "All Zoon list",
            result: newData
        });

    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            err: err
        });
    }
}
exports.details = async (req, res) => {
    try {
        let { id } = req.body;
        let newData = await rackdb.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });
        return res.status(201).json({
            error: false,
            message: "successfully details",
            result: newData
        });

    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            err: err
        });
    }
}
exports.update = async (req, res) => {
    try {
        let validate = await update.validateAsync(req.body);
        let newData = await rackdb.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });

        const updateData = await rackdb.update({
            rack_name: validate.rack_name,
            rack_no: validate.rack_no
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(201).json({
            error: false,
            message: "successfully updated details",
            result: updateData
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            err: err.err || err
        });
    }
}
exports.delete = async (req, res) => {
    try {
        const {id} = req.body;
        let newData = await rackdb.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });

        const updateData = await rackdb.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(201).json({
            error: false,
            message: "successfully  deleted"
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Something went wrong",
            err: err
        });
    }
}
exports.deleteAll = async (req, res) => {
  let newData = await rackdb.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} All Racks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Zoons."
      });
    });
};
exports.findAllActive = async (req, res) => {
  let newData = await rackdb.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving racks."
      });
    });
};