
module.exports = (sequelize, Sequelize) => {

    const Rack = sequelize.define("rack_master", {
        rack_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rack_no: {
            type: Sequelize.INTEGER,
            defaultStatus: 0
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Rack;
}

