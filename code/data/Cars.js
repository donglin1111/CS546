const mongoCollections = require('./mongoCollections');
const cars = mongoCollections.cars;
const grade = mongoCollections.grade;
const interior = mongoCollections.interior;
const comment = mongoCollections.comment;
const gradefunction = require('./Grade');
const interiorfunction = require('./Interior');
const optionsfunction = require('./Options');
const commentfunction = require('./Comment');
const ObjectID = require('mongodb').ObjectID;
async function addCars(bodypart) {
    const VIN = bodypart.VIN;
    const Brand = bodypart.Brand;
    const Model = bodypart.Model;
    const VehicleType = bodypart.VehicleType;
    const Timetomarket = bodypart.Timetomarket;
    const Color = bodypart.Color;
    const Usedcar = bodypart.Use;
    if (!VIN) throw "VIN cannot be null";
    if (typeof VIN !== "string") throw "The VIN for Cars must be a string";
    if (!Brand) throw "Brand cannot be null";
    if (typeof Brand !== "string") throw "The VIN for Cars must be a string";
    if (!Model) throw "Model cannot be null";
    if (typeof Model !== "string") throw "The Model for Cars must be a string";
    if (!VehicleType) throw "VehicleType cannot be null";
    if (typeof VehicleType !== "string") throw "The VehicleType for Cars must be a string";
    if (!Timetomarket) throw "Timetomarket cannot be null";
    Timearry = Timetomarket.split('/');
    if (Timearry.length > 3) throw "Wrong type of Time format";
    d = parseInt(Timearry[0]);
    m = parseInt(Timearry[1]);
    y = parseInt(Timearry[2]);
    if (m > 12 || m < 1) throw "The month is invalid of Timetomarket";
    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
        if (d > 31) throw "The day is invalid of Timetomarket";
    }
    if (m == 4 || m == 6 || m == 9 || m == 11) {
        if (d > 30) throw "The day is invalid of Timetomarket";
    }
    if (m == 2) {
        if (d > 28) throw "The day is invalid of Timetomarket";
    }
    if (!Color) throw "Color cannot be null";
    if (!Usedcar) throw "Usedcar is null";
    const Grade = gradefunction.getAllGradeById(VIN);
    const Interior = interiorfunction.getAllInteriorById(VIN);
    const Options = optionsfunction.getAllOptionsById(VIN);
    const Comment = commentfunction.getAllCommentById(VIN);
    var newCar = {
        VIN: VIN,
        Brand: Brand,
        Model: Model,
        VehicleType: VehicleType,
        Timetomarket: Timetomarket,
        Color: Color,
        Usedcar: Usedcar,
        Grade: Grade,
        Options: Options,
        Interior: Interior,
        Comment: Comment
    };
    const carCollection = await cars();
    const carInfo = await carCollection.insertOne(newCar);
    const newId = carInfo.insertedId;
    const createCar = await getCarById(newId)
    return createCar;
};
async function getCarById(id) {
    if (!id) throw 'You must provide an id to search the user';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const carCollection = await cars();
    const carInfo = await carCollection.findOne({ _id: id });
    if (!carInfo) throw "Cars cannot find."
    return carInfo;
};
async function getAllCar() {
    if (!VIN) throw 'You must provide an VIN to search the grade';
    const carCollection = await cars();
    const carInfo = await carCollection.find({}).toArray();
    //if(!carInfo) return "Cars cannot find.";
    return carInfo;
};
async function removeOneCar(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the grade';
    const carCollection = await cars();
    const deletInfo = await carCollection.removeOne({ VIN: VIN });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete car with provide VIN";
    }
    return true;
};
async function updateCar(id, bodypart) {
    if (!id) throw 'You must provide an id for the Car';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const VIN = bodypart.VIN;
    const Brand = bodypart.Brand;
    const Model = bodypart.Model;
    const VehicleType = bodypart.VehicleType;
    const Timetomarket = bodypart.Timetomarket;
    const Color = bodypart.Color;
    if (!VIN) throw "VIN cannot be null";
    if (typeof VIN !== "string") throw "The VIN for Cars must be a string";
    if (!Brand) throw "Brand cannot be null";
    if (typeof Brand !== "string") throw "The VIN for Cars must be a string";
    if (!Model) throw "Model cannot be null";
    if (typeof Model !== "string") throw "The Model for Cars must be a string";
    if (!VehicleType) throw "VehicleType cannot be null";
    if (typeof VehicleType !== "string") throw "The VehicleType for Cars must be a string";
    if (!Timetomarket) throw "Timetomarket cannot be null";
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(Timetomarket))) throw "The Timetomarket for Cars must be a string";
    if (!Color) throw "Color cannot be null";
    if (!Array.isArray(Color)) throw "The VehicleType for Cars must be a string";
    const Grade = gradefunction.getAllGradeById(VIN);
    const Interior = interiorfunction.getAllInteriorById(VIN);
    const Options = optionsfunction.getAllOptionsById(VIN);
    const Comment = commentfunction.getAllCommentById(VIN);
    var updateCar = {
        VIN: VIN,
        Brand: Brand,
        Model: Model,
        VehicleType: VehicleType,
        Timetomarket: Timetomarket,
        Color: Color,
        Grade: Grade,
        Options: Options,
        Interior: Interior,
        Comment: Comment
    };
    const carCollection = await cars();
    const carchange = await carCollection.updateOne({ _id: id }, { $set: updateCar });;
    if (carchange.modifiedCount === 0) throw "Cannot update grade by provide id";
    return carchange;
};
module.exports = {
    addCars,
    getAllCar,
    removeOneCar,
    updateCar
};