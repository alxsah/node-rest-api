const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

const logError = err => console.log("Error connecting to database: ", err);

const getUserById = uid =>
    MongoClient.connect(url)
    .then(db => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        return dbo.collection("users").findOne({"_id": oid});
    })
    .catch(err => {
        logError(err);
    });

const getBookingsByUid = uid => 
    MongoClient.connect(url)
    .then(db => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        return dbo.collection("users").findOne({"_id": oid})
        .then(user => 
            dbo.collection("bookings").find({"_id": {"$in": user.bookings }}).toArray()
        )
    })
    .catch(err => {
        logError(err);
    });

const addBooking = (uid, booking) => 
    MongoClient.connect(url)
    .then(db => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        return dbo.collection("bookings").insert(booking)
            .then(() => dbo.collection("users").findOne({"_id": oid}))
            .then(user => {
                user.bookings.push(booking._id);
                return dbo.collection("users").replaceOne({"_id": oid}, user);
            })
    })
    .catch(err => {
        logError(err);
    });

    const deleteBooking = (uid, bookingId) => 
    MongoClient.connect(url)
    .then(db => {
        console.log("Connected to database!");
        const dbo = db.db("mydb");
        const oid = mongo.ObjectId(uid);
        const bookingOid = mongo.ObjectId(bookingId);

        return dbo.collection("bookings").deleteOne({"_id": bookingOid})
            .then(() => dbo.collection("users").findOne({"_id": oid}))
            .then(user => {
                const bookingIdIndex = user.bookings.indexOf(bookingId);
                users.bookings.splice(bookingId, 1);
                return dbo.collection("users").replaceOne({"_id": oid}, user);
            })
    })
    .catch(err => {
        logError(err);
    });

module.exports = {getUserById, addBooking, getBookingsByUid, deleteBooking};
