const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const getUserById = (uid) =>
    MongoClient.connect(url)
    .then((db) => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        return dbo.collection("users").findOne({"uid": uid});
    })
    .catch((err) => {
        console.log("Error connecting to database.")
    });

const addBooking = (uid, booking) => 
    MongoClient.connect(url)
    .then((db) => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        return dbo.collection("users").findOne({"uid": uid}).then((user) => {
            console.log(booking);
            user.bookings.push(booking);
            console.log(user.bookings);
            return dbo.collection("users").replaceOne({"uid": uid}, {...user});
        });
    })
    .catch((err) => {
        console.log("Error connecting to database:");
        console.log(err);
    });

module.exports = {getUserById, addBooking};
