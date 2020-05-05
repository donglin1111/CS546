const mongoCollections = require('./mongoCollections');
const interior = mongoCollections.interior;
const ObjectID = require('mongodb').ObjectID;
async function addInterior(bodypart) {
    const Name = bodypart.Name;
    const Color = bodypart.Color;
    const DecorativeInlays = bodypart.DecorativeInlays;
    const Price = bodypart.Price;
    if (!Name) throw "The name of interitor cannot be null in interitor";
    if (typeof Name !== "string") throw "The name must be a string in interitor";
    if (!Color) throw "Color is null in interitor";
    if (!Array.isArray(Color)) throw "The color should be an array in interitor";
    if (!DecorativeInlays) throw "The Decorative details are null in interitor";
    if (!Array.isArray(DecorativeInlays)) throw "The Decorative details must be arrays"
    if (!Price) throw "The price of interitor cannot be null";
    if (typeof Price !== "string") throw "The Price must be a string in interitor";
    var newInterior = {
        Name: Name,
        Color: Color,
        DecorativeInlays: DecorativeInlays,
        Price: Price
    };
    const interiorCollection = await interior();
    const interiorInfo = interiorCollection.insertOne(newInterior);
    const newId = interiorInfo.insertedId;
    const createInterior = await getGradeById(newId);
    return createInterior;
}
async function getInteriorById(id) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const interiorCollection = await interior();
    const interiorInfo = await interiorCollection.findOne({ _id: id });
    if (!interiorInfo) throw "Interior cannot find."
    return interiorInfo;
}
async function getAllInteriorById(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the interior';
    const interiorCollection = await interior();
    const interiorInfo = interiorCollection.find({ VIN: VIN }).toArray();
    //if(!interiorInfo) return "Cannot find interior for the car.";
    return interiorInfo;
}
async function removeInterior(id) {
    if (!id) throw 'You must provide an id to search the grade';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const interiorCollection = await grade();
    const deletInfo = await interiorCollection.removeOne({ _id: id });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the grade with id";
    }
    return true;
}
async function removeAllinterior(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the grade';
    const interiorCollection = await interior();
    const deletInfo = await interiorCollection.remove({ VIN: VIN });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the interior list with provide VIN";
    }
    return true;
}
async function updateInterior(id, bodypart) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const Name = bodypart.Name;
    const Color = bodypart.Color;
    const DecorativeInlays = bodypart.DecorativeInlays;
    const Price = bodypart.Price;
    if (!Name) throw "The name of interitor cannot be null in interitor";
    if (typeof Name !== "string") throw "The name must be a string in interitor";
    if (!Color) throw "Color is null in interitor";
    if (!Array.isArray(Color)) throw "The color should be an array in interitor";
    if (!DecorativeInlays) throw "The Decorative details are null in interitor";
    if (!Array.isArray(DecorativeInlays)) throw "The Decorative details must be arrays"
    if (!Price) throw "The price of interitor cannot be null";
    if (typeof Price !== "string") throw "The Price must be a string in interitor";
    var updateinterior = {
        Name: Name,
        Color: Color,
        DecorativeInlays: DecorativeInlays,
        Price: Price
    };
    const interiorCollection = await interior();
    const interiorchange = interiorCollection.updateOne({ _id: id }, { $set: updateinterior });
    if (interiorchange.modifiedCount === 0) throw "Cannot update interior by provide id";
    return interiorchange;
}
module.exports = {
    addInterior,
    getInteriorById,
    getAllInteriorById,
    removeInterior,
    removeAllinterior,
    updateInterior
};