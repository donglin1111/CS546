const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require("bcryptjs");
const uuidv4 = require('uuid/v4');

const saltround = 5;
let exportedMethods = {
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) throw 'No users in system!';
        return userList;
    },
    async addUser(bodypart) {
        const username = bodypart.username;
        const firstname = bodypart.firstname;
        const lastname = bodypart.lastname;
        const hashedpassword = bodypart.hashedPassword;
        if (!username) throw "The user name for user is null";
        if (typeof username !== "string") throw "The user name for user must be a string";
        if (!firstname) throw "The first name for user is null";
        if (typeof firstname !== "string") throw "The first name for user must be a string";
        if (!lastname) throw "The last name for user is null";
        if (typeof lastname !== "string") throw "The last name for user must be a string";
        if (!hashedpassword) throw "The password for user must be a string";
        const userCollection = await users();
        const newUser = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            hashedpassword: hashedpassword,
            _id: uuidv4()
        };
        const newInsertInformation = await userCollection.insertOne(newUser);
        if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
        return await this.getUserById(newInsertInformation.insertedId);
    },
    async getUserById(id) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });
        if (!user) throw 'User not found';
        return user;
    },
    async addPostToUser(userId, postId, postTitle) {
        let currentUser = await this.getUserById(userId);
        console.log(currentUser);

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne({ _id: userId }, { $addToSet: { posts: { id: postId, title: postTitle } } });

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

        return await this.getUserById(userId);
    },
    async removeUser(id) {
        const userCollection = await users();
        const deletionInfo = await userCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete user with id of ${id}`;
        }
        return true;
    },

    async updateUser(id, bodypart) {
        const user = await this.getUserById(id);
        const userUpdateInfo = {
            firstName: bodypart.firstName,
            lastName: bodypart.lastName,
        };
        // firstName = bodypart.firstName;
        // lastName = bodypart.lastName;
        // DateofBirth = bodypart.DateofBirth;
        // SSN = bodypart.SSN;
        // Email = bodypart.Email;
        // PhoneNum = bodypart.PhoneNum;
        // Gender = bodypart.Gender;
        // address = bodypart.address;
        // State = bodypart.State;
        // Zipcode = bodypart.Zipcode;
        // IsDealer = bodypart.IsDealer;
        // Age = bodypart.Age;
        // hashedPassword = bodypart.hashedPassword;
        // purchaseHistory = bodypart.purchaseHistory;
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne({ _id: id }, { $set: userUpdateInfo });
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        return await this.getUserById(id);
    }
};
module.exports = exportedMethods;