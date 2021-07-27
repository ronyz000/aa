
module.exports = (sequelize, Sequelize) => {

    const Zoon = sequelize.define("zoon_master", {
        zoon_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        zoon_no: {
            type: Sequelize.INTEGER,
            defaultStatus: 0
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        }
    });
    return Zoon;
}

