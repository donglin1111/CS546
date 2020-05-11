const mongoCollections = require('../config/mongoCollections');
const cars = mongoCollections.cars;
const uuidv4 = require('uuid/v4');
//const grade = mongoCollections.grade;
//const interior = mongoCollections.interior;
//const comment = mongoCollections.comment;
//const gradefunction = require('./Grade');
//const interiorfunction = require('./Interior');
//const optionsfunction = require('./Options');
//const commentfunction = require('./Comment');
let exportedMethods = {
    async addCars(bodypart) {
        const VIN = bodypart.VIN;
        const Brand = bodypart.Brand;
        const Model = bodypart.Model;
        const VehicleType = bodypart.VehicleType;
        const Timetomarket = bodypart.Timetomarket;
        const Years = bodypart.Years;
        const Exterior = bodypart.Exterior;
        const Usedcar = bodypart.Usedcar;
        const Interior = bodypart.Interior;
        const Price = bodypart.Price;
        const Style = bodypart.Style;
        const Carimage = bodypart.img;
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
        m = parseInt(Timearry[0]);
        d = parseInt(Timearry[1]);
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
        if (!Years) throw "Years cannot be null";
        years = parseInt(Years);
        if (!Exterior) throw "Exterior cannot be null";
        if (typeof Exterior !== "string") throw "The Exterior for Cars must be a string";
        if (!Interior) throw "Interior cannot be null";
        if (typeof Interior !== "string") throw "The Interior for Cars must be a string";

        if (!Price) throw "Price cannot be null";
        price = parseInt(Price);
        console.log(price);
        if (isNaN(price)) throw " The Price must be an number string for car";

        if (!Style) throw "Style cannot be null";
        if (typeof Style !== "string") throw "The Style for Cars must be a string";
        if (typeof Usedcar !== "boolean") throw "The Usedcar for Cars must be a boolean";
        if (!Carimage) throw "The image of car cannot be null";
        if (typeof Carimage !== "string") throw "The image for Cars must be a string";
        const carCollection = await cars();
        var newCar = {
            VIN: VIN,
            Brand: Brand,
            Model: Model,
            VehicleType: VehicleType,
            Timetomarket: Timetomarket,
            Years: Years,
            Usedcar: Usedcar,
            Exterior: Exterior,
            Interior: Interior,
            Style: Style,
            Price: Price,
            img: Carimage,
            _id: uuidv4()
        };
        const newInsertInformation = await carCollection.insertOne(newCar);
        if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
        return await this.getCarById(newInsertInformation.insertedId);
    },
    async getCarById(id) {
        const carCollection = await cars();
        const car = await carCollection.findOne({ _id: id });
        if (!car) throw 'Car not found';
        return car;
    },
    async getAllCar() {
        const carCollection = await cars();
        const carList = await carCollection.find({}).toArray();
        if (!carList) throw 'No cars in system!';
        return carList;
    },
    async removeOneCar(id) {
        const carCollection = await cars();
        const deletionInfo = await carCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete car with id of ${id}`;
        }
        return true;
    },
    async updateCar(id, bodypart) {
        const car = await this.getCarById(id);
        var updateCar = {
            VIN: bodypart.VIN,
            Brand: bodypart.Brand,
            Model: bodypart.Model,
            VehicleType: bodypart.VehicleType,
            Timetomarket: bodypart.Timetomarket,
            Years: bodypart.Years,
            Usedcar: bodypart.Usedcar,
            Exterior: bodypart.Exterior,
            Interior: bodypart.Interior,
            Style: bodypart.Style,
            Price: bodypart.Price,
            img: bodypart.Carimage,
        };
        const carCollection = await cars();
        const updateInfo = await carCollection.updateOne({ _id: id }, { $set: updateCar });
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        return await this.getCarById(id);
    }
}
module.exports = exportedMethods;