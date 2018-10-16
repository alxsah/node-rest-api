const mongo = require('mongodb');
const config = require('./config.json');

const MongoClient = mongo.MongoClient;

const url = `mongodb://${config.development.mongo_hostname}:${config.development.mongo_port}/`;

const logError = (err) => console.log('Error connecting to database: ', err);
const logSuccess = () => console.log('Connected to database!');

const getBookings = (booking) =>
  MongoClient.connect(url)
      .then((db) => {
        const dbo = db.db(config.development.database);
        logSuccess();
        return dbo.collection(config.development.collection).find().toArray();
      })
      .catch((err) => {
        logError(err);
      });

const postBooking = (booking) =>
  MongoClient.connect(url)
      .then((db) => {
        const dbo = db.db(config.development.database);
        logSuccess();
        return dbo.collection(config.development.collection).insertOne(booking);
      })
      .catch((err) => {
        logError(err);
      });

const deleteBooking = (bookingId) =>
  MongoClient.connect(url)
      .then((db) => {
        const dbo = db.db(config.development.database);
        const mongoId = new mongo.ObjectId(bookingId);
        logSuccess();
        const deleteQuery = {_id: mongoId};
        return dbo.collection(config.development.collection).deleteOne(deleteQuery);
      })
      .catch((err) => {
        logError(err);
      });

const updateBooking = (bookingId, newBooking) =>
  MongoClient.connect(url)
      .then((db) => {
        const dbo = db.db(config.development.database);
        const mongoId = new mongo.ObjectId(bookingId);
        logSuccess();
        const updateQuery = {_id: mongoId};
        return dbo.collection(config.development.collection).replaceOne(updateQuery, newBooking);
      })
      .catch((err) => {
        logError(err);
      });

module.exports = {getBookings, postBooking, deleteBooking, updateBooking};
