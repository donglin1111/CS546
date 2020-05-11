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
    Brand: "audi",
    Model: "Q8",
    VehicleType: "SUV",
    Timetomarket: "08/12/2020",
    Years:"2010",
    Exterior: "Silver",
    Interior: "Yello",
    Style: "comfort",
    Price: "5000",
    img: "Audi_Q8.jpg",
    Usedcar: true
}
car2 = {
    VIN: "SCBDG4ZG6LC076056",
    Brand: "Bentley",
    Model: "Continental GT V8 Convertible",
    VehicleType: "Convertible",
    Timetomarket: "01/12/2020",
    Years:"2020",
    Exterior: "Silver",
    Interior: "Yello",
    Style: "comfort",
    Price: "15000",
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
    Years:"2014",
    Exterior: "Silver",
    Interior: "Yello",
    Style: "comfort",
    Price: "15000",
    Usedcar: false
}
car4 = {
    VIN: "AK1CB2A95KS131234",
    Brand: "Lamborghini",
    Model: "Huracan EVO Spyder",
    VehicleType: "Convertible",
    Timetomarket: "02/01/2020",
    Years:"2017",
    Exterior: "Red",
    Interior: "Blue",
    Style: "comfort",
    Price: "10000",
    img: "Lamborghini_AK1CB2A95KS131234.jpg",
    Usedcar: false
}
car5 = {
    VIN: "YT9XC81B98A007066",
    Brand: "Koenigsegg",
    Model: "CCX",
    VehicleType: "Convertible",
    Timetomarket: "08/12/2008",
    Years:"2020",
    Exterior: "Silver",
    Interior: "Yello",
    Style: "comfort",
    Price: "15000",
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