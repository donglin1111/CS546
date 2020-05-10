const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
<<<<<<< HEAD
const cars = data.cars;

car = {
    VIN: "7J3ZZ56Y78230003",
    Brand: "audi",
    Model: "Q8",
    VehicleType: "SUV",
    Timetomarket: "08/12/2020",
    Color: ["black", "blue", "white", "grey"],
    Use: "Yes"
}
=======
const users = data.users;
const grade= data.grade;
const cars = data.cars;

>>>>>>> d7e8ab5a61c3ed98252b5ff61464944521cebd95
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
<<<<<<< HEAD
    await cars.addCars(car);
    console.log(cars);
    // await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

    // await posts.addPost(
    //     'Using the seed',
    //     'We use the seed to have some initial data so we can just focus on servers this week', [],
    //     id
    // );
    // await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', [], id);
=======
    const newcar = await cars.addCars("7J3ZZ56Y78230003",
        "audi",
        "Q8",
        "SUV",
        "08/12/2020",
        ["black","blue","white","grey"],
        )
    carss = await newcar.getAllCarById();
    console.log(carss);
>>>>>>> d7e8ab5a61c3ed98252b5ff61464944521cebd95

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});