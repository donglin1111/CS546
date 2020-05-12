const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const newcar = data.cars;
const users = data.users;
const posts = data.posts;

admin1 = {
    username: 'admin1',
    firstname: "Harry",
    lastname: "Potter",
    hashedPassword: "$2a$05$KBuYzqvuaEK/3lVyHi2Ele5Sn05iG5tebskQjte90PY.UOfLAh47u"
}
admin2 = {
    username: 'admin2',
    firstname: "Donglin",
    lastname: "Yang",
    hashedPassword: "$2a$05$9BSBli1pCgSQADNuv3lr4uhnOJcOreJUqhFP2sEUfT3a5.QOrH9Pi"
}

car1 = {
    VIN: "7J3ZZ56Y78230003",
    Brand: "Audi",
    Model: "Q8",
    VehicleType: "SUV",
    Timetomarket: "08/12/2020",
    Years: "2010",
    Exterior: "Silver",
    Interior: "Yello",
    Style: "comfort",
    Price: "$45000",
    Mileage: "21000",
    img: "Audi_Q8.jpg",
    Usedcar: false
}
car2 = {
    VIN: "SCBDG4ZG6LC076056",
    Brand: "Bentley",
    Model: "Continental",
    VehicleType: "GT V8 Convertible",
    Timetomarket: "01/12/2020",
    Years: "2020",
    Exterior: "Glacier White",
    Interior: "Hotspur",
    Style: "Convertible",
    Price: "$271,805",
    Mileage: "21",
    img: "Bentley_SCBDG4ZG6LC076056.jpg",
    Usedcar: false
}
car3 = {
    VIN: "WP0CB2A95KS136454",
    Brand: "Porsche",
    Model: "911",
    VehicleType: "Carrera GTS Cabriolet",
    Timetomarket: "06/02/2019",
    Years: "2019",
    Exterior: "Carmine Red",
    Interior: "Black",
    Style: "Convertible",
    Price: "$142,995",
    Mileage: "5",
    img: "Porsche_WP0CB2A95KS136454.jpg",
    Color: ["red"],
    Usedcar: false
}
car4 = {
    VIN: "ZHWUT4ZF1LLA13280",
    Brand: "Lamborghini",
    Model: "Huracan",
    VehicleType: "Huracan EVO Spyder",
    Timetomarket: "02/01/2020",
    Years: "2020",
    Exterior: "Rosso Mars",
    Interior: "Nero Ade",
    Style: "Convertible",
    Price: "CALL FOR PRICE",
    Mileage: "29",
    img: "Lamborghini_ZHWUT4ZF1LLA13280.jpg",
    Usedcar: false
}
car5 = {
    VIN: "YT9XC81B98A007066",
    Brand: "Koenigsegg",
    Model: "CCX",
    VehicleType: "CCX",
    Timetomarket: "08/12/2008",
    Years: "2008",
    Exterior: "Silver",
    Interior: "Blue",
    Style: "Convertible",
    Price: "$1,595,000",
    Mileage: "29",
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