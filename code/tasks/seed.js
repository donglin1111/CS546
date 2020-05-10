const dbConnection = require('../data/mongoConnection');
const data = require('../data/');
const users = data.users;
const grade= data.grade;
const cars = data.cars;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const newcar = await cars.addCars("7J3ZZ56Y78230003",
        "audi",
        "Q8",
        "SUV",
        "08/12/2020",
        ["black","blue","white","grey"],
        )
    carss = await newcar.getAllCarById();
    console.log(carss);

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});