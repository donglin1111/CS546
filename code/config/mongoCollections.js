const dbConnection = require("./mongoConnection");
let getCollectionFn = collection => {
    let _col = undefined;

    return async() => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

/* Now, you can list your collections here: */
module.exports = {
    users: getCollectionFn("Users"),
    cars: getCollectionFn("Cars"),
    grade: getCollectionFn("Grade"),
    interior: getCollectionFn("Interior"),
    options: getCollectionFn("Options"),
    comment: getCollectionFn("Comment")
};