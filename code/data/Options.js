const mongoCollections = require('./mongoCollections');
const options = mongoCollections.options;
const ObjectID = require('mongodb').ObjectID;
async function addOptions(bodypart) {
    const Name = bodypart.Name;
    const Include = bodypart.Include;
    const Price = bodypart.Price;
    if (!Name) throw "Name cannot be null in options";
    if (typeof Name !== "string") throw "Name is not a string type in options";
    if (!Include) throw "Include is null in options";
    if (!Array.isArray(Include)) throw "The include part is not array in options";
    if (!Price) throw "Price is null in options";
    if (typeof Price !== "string") throw "The Price is not a string in options";
    var newOptions = {
        Name: Name,
        Include: Include,
        Price: Price
    };
    const optionsCollection = await options();
    const optionsInfo = optionsCollection.insertOne(newOptions);
    const newId = optionsInfo.insertedId;
    const createOptions = await getOptionsById(newId);
    return createOptions;
}
async function getOptionsById(id) {
    if (!id) throw 'You must provide an id to search the option';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const optionsCollection = await options();
    const optionsInfo = await optionsCollection.findOne({ _id: id });
    if (!optionsInfo) throw "options cannot find."
    return optionsInfo;
}
async function getAllOptionsById(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the option';
    const optionsCollection = await options();
    const optionsInfo = optionsCollection.find({ VIN: VIN }).toArray();
    //if(!optionsInfo) return "Cannot find optione for the car.";
    return optionsInfo;
}
async function removeOptionsById(id) {
    if (!id) throw 'You must provide an id to search the grade';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const optionsCollection = await options();
    const deletInfo = await optionsCollection.removeOne({ _id: id });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the option with id";
    }
    return true;
}
async function removeAllOptions(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the option';
    const optionsCollection = await options();
    const deletInfo = await optionsCollection.remove({ VIN: VIN });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the option list with provide VIN";
    }
    return true;
}
async function updateOptions(id, bodypart) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const Name = bodypart.Name;
    const Include = bodypart.Include;
    const Price = bodypart.Price;
    if (!Name) throw "Name cannot be null in options";
    if (typeof Name !== "string") throw "Name is not a string type in options";
    if (!Include) throw "Include is null in options";
    if (!Array.isArray(Include)) throw "The include part is not array in options";
    if (!Price) throw "Price is null in options";
    if (typeof Price !== "string") throw "The Price is not a string in options";
    var updateOptions = {
        Name: Name,
        Include: Include,
        Price: Price
    };
    const optionsCollection = await options();
    const optionschange = optionsCollection.updateOne({ _id: id }, { $set: updateOptions });
    if (optionschange.modifiedCount === 0) throw "Cannot update grade by provide id";
    return optionschange;
}
module.exports = {
    addOptions,
    getOptionsById,
    getAllOptionsById,
    removeOptionsById,
    removeAllOptions,
    updateOptions
};