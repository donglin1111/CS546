const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const newcar = data.cars;
const users = data.users;
const posts = data.posts;

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
    img: "Audi_Q8.jpg",
    Usedcar: true
}
car2 = {
    VIN: "SCBDG4ZG6LC076056",
    Brand: "Bentley",
    Model: "Continental GT V8 Convertible",
    VehicleType: "Convertible",
    Timetomarket: "01/12/2020",
    Color: ["black"],
    img: "Bentley_SCBDG4ZG6LC076056.jpg",
    Usedcar: false
}
car3 = {
    VIN: "WP0CB2A95KS136454",
    Brand: "Porsche",
    Model: "911 Carrera GTS",
    VehicleType: "Convertible",
    Timetomarket: "06/02/2019",
    img: "Porsche_WP0CB2A95KS136454.jpg",
    Color: ["red"],

    Usedcar: false
}
car4 = {
    VIN: "AK1CB2A95KS131234",
    Brand: "Lamborghini",
    Model: "Huracan EVO Spyder",
    VehicleType: "Convertible",
    Timetomarket: "02/01/2020",
    Color: ["red"],
    img: "Lamborghini_AK1CB2A95KS131234.jpg",
    Usedcar: false
}
car5 = {
    VIN: "YT9XC81B98A007066",
    Brand: "Koenigsegg",
    Model: "CCX",
    VehicleType: "Convertible",
    Timetomarket: "08/12/2008",
    Color: ["Silver"],
    img: "Koenigsegg_YT9XC81B98A007066.jpg",
    Usedcar: true
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
    const car2s = await newcar.addCars(car2);
    console.log(car2s);
    const car3s = await newcar.addCars(car3);
    console.log(car3s);
    const car4s = await newcar.addCars(car4);
    console.log(car4s);
    const car5s = await newcar.addCars(car5);
    console.log(car5s);
    await posts.addPost('Audi', "$750 Customer Cash + $750 Select Inventory Customer Cash + + $1,500 1st Three Month's Payment Ford Credit Bonus Cash");
    // await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

    // await posts.addPost(
    //     'Using the seed',
    //     'We use the seed to have some initial data so we can just focus on servers this week', [],
    //     id
    // );
    // await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', [], id);

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});