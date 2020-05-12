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
    VIN: "WA1BVAF17KD009168",
    Brand: "Audi",
    Model: "Q8",
    VehicleType: "Premium Plus",
    Timetomarket: "08/12/2020",
    Years: "2015",
    Exterior: "Black",
    Interior: "Black",
    Style: "SUV",
    Price: "$60,998",
    Mileage: "11000",
    img: "Audi_Q8.jpg",
    Usedcar: true
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
    Color: "Red",
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
    VehicleType: " ",
    Timetomarket: "08/12/2008",
    Years: "2008",
    Exterior: "Silver",
    Interior: "Blue",
    Style: "Convertible",
    Price: "$1,595,000",
    Mileage: "2229",
    img: "Koenigsegg_YT9XC81B98A007066.jpg",
    Usedcar: true
}
car6 = {
    VIN: "SCBET9ZA2F8049209",
    Brand: "Bentley",
    Model: "Flying Spur",
    VehicleType: "V8",
    Timetomarket: "08/12/2015",
    Years: "2015",
    Exterior: "White Sand Metallic",
    Interior: "Linen",
    Style: "Sedan",
    Price: "$103,995",
    Mileage: "7546",
    img: "Bentley_SCBET9ZA2F8049209.jpg",
    Usedcar: true
}
car7 = {
    VIN: "SLA689X52KU114058",
    Brand: "Rolls-Royce",
    Model: "Cullinan",
    VehicleType: "AWD",
    Timetomarket: "08/12/2019",
    Years: "2019",
    Exterior: "Arctic White",
    Interior: "Seashell",
    Style: "SUV",
    Price: "$417,675",
    Mileage: "22",
    img: "2019_Rolls-Royce_Cullinan.jpg",
    Usedcar: false
}
car8 = {
    VIN: "VF9SP3V34LM795264",
    Brand: "Bugatti",
    Model: "Chiron",
    VehicleType: "Sport",
    Timetomarket: "08/12/2020",
    Years: "2020",
    Exterior: "Black Carbon",
    Interior: "French Blue",
    Style: "Coupe",
    Price: "CALL FOR PRICE",
    Mileage: "249",
    img: "2020_Bugatti_Chiron.jpg",
    Usedcar: false
}
car9 = {
    VIN: "YT9XC81B98A007346",
    Brand: "Toyota",
    Model: "CHR",
    VehicleType: "Convertible",
    Timetomarket: "08/12/2008",
    Color: "Silver",
    Years: "2018",    
    Exterior: "Aerodynamic rear lower diffuser",   
    Interior: "Automatic climate control system",
    Style: "Covertible",
    Price: "$ 70,500",
    Mileage: "15",
    Usedcar: false,
    img: "img/car14.jpg"
}

car10 = {
    VIN:"7J3ZZ56Y78230007",
    Brand:"Tata",
    Model:"Harrier",
    VehicleType:"SUV", 
    Timetomarket: "23/11/2020",
    Color: "Beige",
    Years: "2014",
    Exterior: "Black",
    Interior: "Brown",
    Style: "SUV",
    Price: "$ 32,450",
    Mileage: "15", 
    Usedcar: false,
    img: "img/car5.jpg"
}

car11 = {
    VIN:"7J3ZZ56Y78230006",
    Brand:"Toyota",
    Model:"4D Runner",
    VehicleType:"SR5", 
    Timetomarket: "06/11/2020",
    Color: "Red",
    Years: "2015",
    Exterior: "Silver",
    Interior: "Black",
    Style: "SUV",
    Price: "$ 42,450",
    Mileage: "25",    
    Usedcar: false,
    img: "img/car4.jpg"
}

car12 ={
    VIN:"7J3ZZ56Y78230005",
    Brand:"Mercedes",
    Model:"AMG",
    VehicleType:"Coupe", 
    Timetomarket: "07/12/2020",
    Color: "Orange",
    Years: "2008",
    Exterior: "Silver",
    Interior: "Black",
    Style: "Coupe",
    Price: "$ 1,30,000",
    Mileage: "25",    
    Usedcar: true,
    img: "img/car3.jpg"
}

car13 = {
    VIN:"7J3ZZ56Y782300040",
    Brand:"Audi",
    Model:"Q8",
    VehicleType:"ABT", 
    Timetomarket: "08/12/2020",
    Color: "Black",
    Years: "2008",
    Exterior: "Silver",
    Interior: "Black",
    Style: "SUV",
    Price: "$1,595,000",
    Mileage: "25",    
    Usedcar: true,
    img: "img/car6.jpg"
 }

 car14 = {
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
    Mileage: "30",
    img: "Koenigsegg_YT9XC81B98A007066.jpg",
    Usedcar: false
}
car15 = {
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

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const admin1s = await users.addUser(admin1);
    const admin2s = await users.addUser(admin2);
    const car1s = await newcar.addCars(car1);
    const car2s = await newcar.addCars(car2);
    const car3s = await newcar.addCars(car3);
    const car4s = await newcar.addCars(car4);
    const car5s = await newcar.addCars(car5);
    const car6s = await newcar.addCars(car6);
    const car7s = await newcar.addCars(car7);
    const car8s = await newcar.addCars(car8);
    const car9s = await newcar.addCars(car9);
    const car10s = await newcar.addCars(car10);
    const car11s = await newcar.addCars(car11);
    const car12s = await newcar.addCars(car12);
    const car13s = await newcar.addCars(car13);
    const car14s = await newcar.addCars(car14);
    const car15s = await newcar.addCars(car15);
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