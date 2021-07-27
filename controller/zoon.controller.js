const db = require("../models");
const zoondb = db.zoon;
const { testVal, update } = require("../validation/zoon.validation");
exports.create = async (req, res) => {
    try {
        let validate = await testVal.validateAsync(req.body);

        let newData = await zoondb.create(validate);
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

        let newData = await zoondb.findAll();

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
        let newData = await zoondb.findOne({
            where: {
                id: id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });
        return res.status(201).json({
            error: false,
            message: "successfully updated the details",
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
        let newData = await zoondb.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });

        const updateData = await zoondb.update({
            zoon_name: validate.zoon_name,
            zoon_no: validate.zoon_no
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
        let newData = await zoondb.findOne({
            where: {
                id: id
            }
        });

        if (!newData) return res.status(400).json({ message: "not found" });

        const updateData = await zoondb.destroy({
            where: {
                id: id
            }
        });

        return res.status(201).json({
            error: false,
            message: "successfully deleted"
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
  let newData = await zoondb.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} All Zoons were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Zoons."
      });
    });
};
exports.findAllActive = async (req, res) => {
  let newData = await zoondb.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving zoons."
      });
    });
};