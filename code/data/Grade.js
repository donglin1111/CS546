const mongoCollections = require('../config/mongoCollections');
const grade = mongoCollections.grade;
const ObjectID = require('mongodb').ObjectID;
async function addGrade(bodypart){
    VIN = bodypart.VIN;
    Name = bodypart.Name;
    Details = bodypart.Details;
    Price = bodypart.Price;
    if(!Name) throw "The name for grading is null";
    if(typeof Name !== "string") throw "The name of grading is not a string";
    if(!Array.isArray(Details)) throw "The Deatils is not a list";
    if(!Price) throw "The price for the grading cannot be null";
    if(typeof Price !== "string") throw "The price of grading is not a string";
    var newGrade = {
        VIN: VIN,
        Name: Name,
        Details: Details,
        Price: Price
    };
    const gradeCollection = await grade();
    const gradeInfo = gradeCollection.insertOne(newGrade);
    const newId = gradeInfo.insertedId;
    const createGrade = await getGradeById(newId);
    return createGrade;
}
async function getGradeById(id) {
    if (!id) throw 'You must provide an id to search the grade';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const gradeCollection = await grade();
    const gradeInfo = await gradeCollection.findOne({ _id: id });
    if(!gradeInfo) throw "Grade cannot find."
    return gradeInfo;
}
async function getAllGradeById(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the grade';
    const gradeCollection = await grade();
    const gradeInfo = gradeCollection.find({ VIN: VIN }).toArray();
    //if(!gradeInfo) return "Cannot find grade for the car.";
    return gradeInfo;
}
async function removeGrade(id) {
    if (!id) throw 'You must provide an id to search the grade';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const gradeCollection = await grade();
    const deletInfo = await gradeCollection.removeOne({ _id: id });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the grade with id";
    }
    return true;
}
async function removeAllGrade(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the grade';
    const gradeCollection = await grade();
    const deletInfo = await gradeCollection.remove({ VIN: VIN });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the grade list with provide VIN";
    }
    return true;
}
async function updateGrade(id,bodypart){
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const Name = bodypart.Name;
    const Details = bodypart.Details;
    const Price = bodypart.Price;
    if(!Name) throw "The name for grading is null";
    if(typeof Name !== "string") throw "The name of grading is not a string";
    if(!Array.isArray(Details)) throw "The Deatils is not a list";
    if(!Price) throw "The price for the grading cannot be null";
    if(typeof Price !== "string") throw "The price of grading is not a string";
    var updategrade = {
        Name: Name,
        Details: Details,
        Price: Price
    };
    const gradeCollection = await grade();
    const gradechange = gradeCollection.updateOne({ _id: id }, { $set: updategrade });
    if(gradechange.modifiedCount === 0) throw "Cannot update grade by provide id";
    return gradechange;
}
module.exports = {
    addGrade,
    getGradeById,
    getAllGradeById,
    removeGrade,
    removeAllGrade,
    updateGrade
};