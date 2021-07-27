const Model = require('../models/index');
const Sequelize = require('sequelize');
const { storeMasterCreate, updateStore } = require('../validations/stmaster.validation');
console.log("store accessed")
exports.createStore = async (req, res, next) => {
    try {
        let validate = await storeMasterCreate.validateAsync(req.body);
        let Details = []
        for (let i = 0; i < validate.children.length; i++) {
            Details[i] = await Model.hmsstoremaster.create({
                organizationId: validate.organizationId,
                groupId: validate.groupId,
                businessId: validate.businessId,
                storetype: validate.storetype,
                userId: validate.userId,
                formName: validate.formName,
                terminalId: validate.terminalId,
                storeDiscription: validate.children[i].storeDiscription,
                costCenterCode: validate.children[i].costCenterCode,
                storeIdentifierId: validate.children[i].storeIdentifierId,
                approvLimit: validate.children[i].approvLimit,
                specialityDiscription: validate.children[i].specialityDiscription,
                allowPOGRN:validate.children[i].allowPOGRN,
                isActive: validate.children[i].isActive,
            })
        }
        return res.status(200).json({
            error: false,
            message: "Successfully Store Master Is Created...!",
            result: Details
        });
    } catch (err) {
        next(err)
    }
}


exports.update = async (req, res, next) => {
    try {
        let validate = await updateStore.validateAsync(req.body);
        let updateData = []
        for (let i = 0; i < validate.children.length; i++) {
            updateData[i] = await Model.hmsstoremaster.update({
                organizationId: validate.organizationId,
                groupId: validate.groupId,
                businessId: validate.businessId,
                storetype: validate.storetype,
                userId: validate.userId,
                formName: validate.formName,
                terminalId: validate.terminalId,
                storeDiscription: validate.children[i].storeDiscription,
                costCenterCode: validate.children[i].costCenterCode,
                storeIdentifierId: validate.children[i].storeIdentifierId,
                approvLimit: validate.children[i].approvLimit,
                specialityDiscription: validate.children[i].specialityDiscription,
                allowPOGRN:validate.children[i].allowPOGRN,
                isActive: validate.children[i].isActive,
        }, {
            where: {
                id: validate.storeId
            }
        });
    }
        
        return res.status(200).json({
            error: false,
            message: "Successfully Store Master Is Updated...!",
            result: updateData
        });
    } 
    catch (err) {
        next(err);
    }
}

exports.listStoreMaster = async (req, res, next) => {
    try {
        const {page}  = req.body
        if(page==0){
            return res.status(200).json({
                error: false,
                message: "Enter valid page",
            });
        }
        if (!page) {
            const list = await Model.hmsstoremaster.findAll({});
            for (let i = 0; i < list.length; i++) {
                let storeDesc = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storeDiscription}});
                list[i].dataValues.storeDiscriptionValue = storeDesc ? storeDesc.dataValues.applicationCodeDesc :null;
                let costDesc = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.costCenterCode}});
                list[i].dataValues.costCenterDesValue = costDesc ? costDesc.dataValues.applicationCodeDesc :null;
                let storeIdentifier = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storeIdentifierId}});
                list[i].dataValues.storeIdValue = storeIdentifier ? storeIdentifier.dataValues.applicationCodeDesc :null;
                let storeType = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storetype}});
                list[i].dataValues.storeTypeValue = storeType ? storeType.dataValues.applicationCodeDesc :null;
                let specialitydesc = await Model.hmsdepartmentmaster.findOne({ where: { id: list[i].dataValues.specialityDiscription}});
                list[i].dataValues.specialityDescValue = specialitydesc ? specialitydesc.dataValues.departmentName :null;

            }
            return res.status(200).json({
                error: false,
                message: "Successfully Fetched the List Of Store Masters...!",
                result: list,
                pageCount: list.length
            });
        } else {
            let limit = 10;
            let offset = 0 + (page - 1) * limit;
            const count = await Model.hmsstoremaster.count({});
            const list = await Model.hmsstoremaster.findAll({
                limit: limit,
                offset: offset,
            });
            for (let i = 0; i < list.length; i++) {
                let storeDesc = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storeDiscription}});
                list[i].dataValues.storeDiscriptionValue = storeDesc ? storeDesc.dataValues.applicationCodeDesc :null;
                let costDesc = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.costCenterCode}});
                list[i].dataValues.costCenterDesValue = costDesc ? costDesc.dataValues.applicationCodeDesc :null;
                let storeIdentifier = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storeIdentifierId}});
                list[i].dataValues.storeIdValue = storeIdentifier ? storeIdentifier.dataValues.applicationCodeDesc :null;
                let storeType = await Model.hmssystemcode.findOne({ where: { id: list[i].dataValues.storetype}});
                list[i].dataValues.storeTypeValue = storeType ? storeType.dataValues.applicationCodeDesc :null;
                let specialitydesc = await Model.hmsdepartmentmaster.findOne({ where: { id: list[i].dataValues.specialityDiscription}});
                list[i].dataValues.specialityDescValue = specialitydesc ? specialitydesc.dataValues.departmentName :null;

            }
            if(list.length==0){
                return res.status(200).json({
                    error: false,
                    message: "No entries in this page " +page,
                    result: list,
                    page:page,
                    pageCount: count,
                    entries:list.length
                });
            }
            else{
                return res.status(200).json({
                    error: false,
                    message: "Entries in page "+page,
                    result: list,
                    pageCount: count,
                    page:page,
                    entries:list.length
                });
            }
            
            
        }
    } catch (err) {
        next(err)
    }
}
exports.detailsStoreMaster = async (req, res) => {
    try {
        const storetype = req.body.storetype;
        // console.log(req.body.storeId)
        const storeMasterDetails = await Model.hmsstoremaster.findAll({
            where: {
                storetype: storetype
            }
        });
        for (let i = 0; i < storeMasterDetails.length; i++) {
            var storeType = await Model.hmssystemcode.findOne({ where: { id: storeMasterDetails[i].dataValues.storetype}});
            storeMasterDetails[i].dataValues.storeTypeValue = storeType ? storeType.dataValues.applicationCodeDesc :null;
            

        }
        if (storeMasterDetails.length==0) return res.status(200).json({ error: true, message: "No Details Found..!" });
        return res.status(200).json({
            error: false,
            message: "Successfully Fetched the Details Of Store Masters with storetype :" +storeType.applicationCodeDesc,
            result: storeMasterDetails
        });
    } catch (error) {
        return res.status(200).json({
            error: true,
            message: "Something Went Wrong",
            err: error
        });
    }
}










