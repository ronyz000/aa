const httpStatus = require('http-status');
const Models = require('../models/index');
const Sequelize = require("sequelize");
const {create,update}= require("../validations/hmstaxmaster2.validation")

// Create Tax Master
exports.createTaxMaster = async (req, res, next) => {
    try {
        
        let validate = await create.validateAsync(req.body)
        
        let Create = []
        for (let i = 0; i < validate.children.length; i++) {
            Create[i]=await Models.hmstaxmaster.create({
                organizationId: validate.organizationId,
                    groupId: validate.groupId,
                    businessId: validate.businessId,
                    taxType: validate.taxType,
                    taxCategory: validate.children[i].taxCategory,
                    taxPercentage: validate.children[i].taxPercentage,
                    taxDescription: validate.children[i].taxDescription,
                    effectiveFromDate: validate.children[i].effectiveFromDate,
                    effectiveToDate: validate.children[i].effectiveToDate,
                    formName: validate.formName,
                    terminalId: validate.terminalId,
                    isActive: validate.children[i].isActive
            })
        }
        return res.status(200).json({
            error: false,
            message: "Successfully Tax Master Is Created...!",
            result: Create
        });
    } catch (err) {
        next(err)
    }
}

// update Tax Details
exports.updateTaxMaster = async (req, res, next) => {
    try {
        let validate = await update.validateAsync(req.body);
        let Update = []
        for (let i = 0; i < validate.children.length; i++) {
            Update[i] = await Models.hmstaxmaster.update({
                organizationId: validate.organizationId,
                groupId: validate.groupId,
                businessId: validate.businessId,
                taxType: validate.taxType,
                taxCategory: validate.children[i].taxCategory,
                taxDescription: validate.children[i].taxDescription,
                taxPercentage: validate.children[i].taxPercentage,
                effectiveFromDate: validate.children[i].effectiveFromDate,
                effectiveToDate: validate.children[i].effectiveToDate,
                formName: validate.formName,
                terminalId: validate.terminalId,
                isActive: validate.children[i].isActive
        }, {
            where: {
                id: validate.taxId
            }
        });
    }
        
    return res.status(200).json({
        error: false,
        message: "Successfully Tax Master Is Updated...!",
        result: Update
    });
} 
catch (err) {
    next(err);
}
}

// List all Entries
exports.listTaxMaster = async (req, res, next) => {
    try {
        const {page}  = req.body //pagination
        if (!page) {
            const list = await Models.hmstaxmaster.findAll({});
            for (let i = 0; i < list.length; i++) {
                let taxtype = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxType}});
                    list[i].dataValues.taxTypeValue = (taxtype) ? taxtype.dataValues.applicationCodeDesc : null;
                let taxCat = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxCategory}});
                    list[i].dataValues.taxCatValue = (taxCat) ? taxCat.dataValues.applicationCodeDesc : null;
                    let taxPer = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxPercentage}});
                    list[i].dataValues.taxPerValue = (taxPer) ? taxPer.dataValues.applicationCodeDesc : null;
            }
            return res.status(200).json({
                error: false,
                message: "Successfully Fetched the List Of Tax Masters...!",
                result: list,
                pageCount: list.length
            });
        } else {
            let limit = 10;
            let offset = 0 + (page - 1) * limit;
            const count = await Models.hmstaxmaster.count({});
            const list = await Models.hmstaxmaster.findAll({
                limit: limit,
                offset: offset,
            });
            for (let i = 0; i < list.length; i++) {
                let taxtype = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxType}});
                    list[i].dataValues.taxTypeValue = (taxtype) ? taxtype.dataValues.applicationCodeDesc : null;
                let taxCat = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxCategory}});
                    list[i].dataValues.taxCatValue = (taxCat) ? taxCat.dataValues.applicationCodeDesc : null;
                    let taxPer = await Models.hmssystemcode.findOne({ where: { id: list[i].dataValues.taxPercentage}});
                    list[i].dataValues.taxPerValue = (taxPer) ? taxPer.dataValues.applicationCodeDesc : null;
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

// Get by taxtype
exports.detailTaxMaster = async (req, res) => {
    try {
        const taxtype = req.body.taxType;
        console.log(taxtype)
        const storeMasterDetails = await Models.hmstaxmaster.findAll({
            where: {
                taxType: taxtype
            }
        });
        console.log(storeMasterDetails)
        for (let i = 0; i < storeMasterDetails.length; i++) {
            let taxtype = await Models.hmssystemcode.findOne({ where: { id: storeMasterDetails[i].dataValues.taxType}});
                storeMasterDetails[i].dataValues.taxTypeValue = (taxtype) ? taxtype.dataValues.applicationCodeDesc : null;
            let taxCat = await Models.hmssystemcode.findOne({ where: { id: storeMasterDetails[i].dataValues.taxCategory}});
                storeMasterDetails[i].dataValues.taxCatValue = (taxCat) ? taxCat.dataValues.applicationCodeDesc : null;
                let taxPer = await Models.hmssystemcode.findOne({ where: { id: storeMasterDetails[i].dataValues.taxPercentage}});
                storeMasterDetails[i].dataValues.taxPerValue = (taxPer) ? taxPer.dataValues.applicationCodeDesc : null;
        }
        if (storeMasterDetails.length==0) return res.status(200).json({ error: true, message: "No Details Found..!" });
        return res.status(200).json({
            error: false,
            message: "Successfully Fetched the Details Of Tax Masters with taxtype :"+storeMasterDetails[0].dataValues.taxTypeValue,
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


// exports.detailTaxMaster = async (req, res) => {
//     try {
//         const taxType = req.body.taxType;
//         console.log(req.body.taxType)
//         const taxMasterDetails = await Models.hmstaxmaster.findAll({
//             where: {
//                 taxType: taxType
//             }
//         });
//         let result = {
//             taxType : taxMasterDetails[0].dataValues.taxType,
//             children: []
//         };
//         for (let i = 0; i < taxMasterDetails.length; i++) {
//             let data = taxMasterDetails[i].dataValues;
//             let {id, taxCategory, taxDescription, effectiveFromDate, effectiveToDate, isActive } = data;
//             console.log(data)
//             let obje = {id, taxCategory, taxDescription, effectiveFromDate, effectiveToDate, isActive};
//             result.children.push(obje);
//         } 
//       return res.status(200).json({
//             error: false,
//             message: "Successfully Fetched the Details Of Store Masters with taxType",
//             result: result
//         });
//     } catch (error) {
//         return res.status(200).json({
//             error: true,
//             message: "Something Went Wrong",
//             err: error
//         });
//     }
// }