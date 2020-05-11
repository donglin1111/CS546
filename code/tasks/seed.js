const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const newcar = data.cars;
const users = data.users;

admin1 = {
    username: 'admin1',
    firstname: "Harry",
    lastname: "Potter",
    password: "admin1"
}
admin2 = {
    username: 'admin2',
    firstname: "Donglin",
    lastname: "Yang",
    password: "admin2"
}

car1 = {
    VIN: "7J3ZZ56Y78230003",
    Brand: "audi",
    Model: "Q8",
    VehicleType: "SUV",
    Timetomarket: "08/12/2020",
    Color: ["black", "blue", "white", "grey"],
    Usedcar: "Yes"
}
async function main() {
    const db = await dbConnection();

    await db.dropDatabase();
    const admin1s = await users.addUser(admin1);
    console.log(admin1s);
    const admin2s = await users.addUser(admin2);
    console.log(admin2s);
    const car1s = await newcar.addCars(car1);
    console.log(car1s);
    // await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

    // await posts.addPost(
    //     'Using the seed',
    //     'We use the seed to have some initial data so we can just focus on servers this week', [],
    //     id
    // );
    // await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', [], id);

    // const aiden = await users.addUser('Aiden', 'Hill');
    // await posts.addPost("Aiden's First Post", "I'm 6 months old, I can't blog1", [], aiden._id);
    // await posts.addPost(
    //     "Aiden's Second Post",
    //     "I'm still 6 months old, I told you already, I can't blog1", [],
    //     aiden._id
    // );
    console.log('Done seeding database');
    await db.serverConfig.close();
}

main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});