const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

const logError = err => console.log("Error connecting to database: ", err);

const getUserById = uid =>
    MongoClient.connect(url)
    .then((db) => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        return dbo.collection("users").findOne({"_id": oid});
    })
    .catch((err) => {
        logError(err);
    });

const addBooking = (uid, booking) => 
    MongoClient.connect(url)
    .then(db => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        return dbo.collection("users").findOne({"_id": oid}).then((user) => {
            user.bookings.push(booking);
            return dbo.collection("users").replaceOne({"_id": oid}, {...user});
        });
    })
    .catch(err => {
        logError(err);
    });

module.exports = {getUserById, addBooking};
