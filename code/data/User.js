const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.users;
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require("bcryptjs");
const saltround = 5;
async function addUser(bodypart) {
    const userName = bodypart.Username;
    const firstName = bodypart.Firstname;
    const lastName = bodypart.Lastname;
    const Password = bodypart.Password;
    const hashedPassword = await bcrypt.hash(Password, saltround);
    if (!userName) throw "The user name for user is null";
    if (typeof userName !== "string") throw "The user name for user must be a string";
    if (!firstName) throw "The first name for user is null";
    if (typeof firstName !== "string") throw "The first name for user must be a string";
    if (!lastName) throw "The last name for user is null";
    if (typeof lastName !== "string") throw "The last name for user must be a string";
    if (!hashedPassword) throw "The password for user must be a string";
    const userCollection = await user();
    const newUser = {
        username: userName,
        firstName: firstName,
        lastName: lastName,
        hashedPassword: hashedPassword,
    };
    const newUserInformation = await userCollection.insertOne(newUser);
    const newId = newUserInformation.insertedId;
    const createUser = await getUserById(newId)
    return createUser;
}
async function getUserById(id) {
    if (!id) throw 'You must provide an id to search the user';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const getUser = await user();
    const Userinfo = await getUser.findOne({ _id: id });
    if (!Userinfo) throw "User cannot find."
    return Userinfo;
}
async function removeUser(id) {
    if (!id) throw 'You must provide an id for the User';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const removeuser = await user();
    const deletInfo = await removeuser.removeOne({ _id: id });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the user with id";
    }
    return true;
}
async function updateUser(id, bodypart) {
    if (!id) throw 'You must provide an id for the User';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    firstName = bodypart.firstName;
    lastName = bodypart.lastName;
    DateofBirth = bodypart.DateofBirth;
    SSN = bodypart.SSN;
    Email = bodypart.Email;
    PhoneNum = bodypart.PhoneNum;
    Gender = bodypart.Gender;
    address = bodypart.address;
    State = bodypart.State;
    Zipcode = bodypart.Zipcode;
    IsDealer = bodypart.IsDealer;
    Age = bodypart.Age;
    hashedPassword = bodypart.hashedPassword;
    purchaseHistory = bodypart.purchaseHistory;
    if (!firstName) throw "The first name for user is null";
    if (typeof firstName !== "string") throw "The first name for user must be a string";
    if (!lastName) throw "The last name for user is null";
    if (typeof lastName !== "string") throw "The first name for user must be a string";
    if (!DateofBirth) throw "The date of birth is null";
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(DateofBirth))) throw "The Date of birth is not in format"
    if (typeof DateofBirth !== "string") throw "The first name for user must be a string";
    if (!SSN) throw "SSN number is null";
    if (typeof SSN !== "string") throw "The SSN number must be a string";
    if (!Email) throw "Email for user is null";
    if (typeof Email !== "string") throw "The Email must be a string";
    if (!PhoneNum) throw "Phonenumber is null";
    if (typeof PhoneNum !== "string") throw "The Phonenumber must be a string";
    if (!Gender) throw "Gender for user is null";
    if (typeof Gender !== "string") throw "The Gender must be a string";
    if (!address) throw "address for user is null";
    if (typeof address !== "string") throw "The address must be a string";
    if (!State) throw "Email for user is null";
    if (typeof State !== "string") throw "The State must be a string";
    if (!Zipcode) throw "Zipcode for user is null";
    if (typeof Zipcode !== "string") throw "The Zipcode must be a string";
    if (!Age) throw "Age for user is null";
    if (typeof Age !== "string") throw "The Age must be a string";

    if (!hashedPassword) throw "hashedPassword for user is null";
    const updateUser = {
        firstName: firstName,
        lastName: lastName,
        DateofBirth: DateofBirth,
        SSN: SSN,
        Email: Email,
        PhoneNum: PhoneNum,
        Gender: Gender,
        address: address,
        State: bodypart.State,
        Zipcode: Zipcode,
        IsDealer: IsDealer,
        Age: Age,
        hashedPassword: hashedPassword,
        purchaseHistory: bodypart.purchaseHistory
    };
    const userupdate = await user();
    const Userchange = userupdate.updateOne({ _id: id }, { $set: updateUser });
    if (Userchange.modifiedCount === 0) throw "Cannot update user by provide id"
    return Userchange;
}
module.exports = {
    addUser,
    getUserById,
    removeUser,
    updateUser
};