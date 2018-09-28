const db = require("../db.js");

const appRouter = app => {
  app.get("/", (req, res) => {
    res.status(200).send("rest API test");
  });

  // Get all bookings for UID
  app.get("/users/:uid/bookings", (req, res) => {
    console.log("getting bookings for UID ", req.params.uid);
    db.getBookingsByUid(req.params.uid).then(bookings => {
        console.log(bookings);
        res.status(200).send(bookings);
    })
    .catch(err => {
        console.log(err);
    })
  });

  // Add booking to a UID
  app.post("/users/:uid/bookings", (req, res) => {
    console.log("posting booking for UID ", req.params.uid);
    db.addBooking(req.params.uid, req.body.booking).then(() => {
        res.status(200).send("Success!");
    })
  });

  // Delete booking
  app.delete("/users/:uid/bookings/:bookingId", (req, res) => {
    console.log("deleting booking with ID ", req.params.bookingId);
    db.deleteBooking(req.params.uid, req.params.bookingId).then(() => {
        res.status(200).send("Success!");
    })
    .catch(err => {
        console.log(err);
    })
  });
}

module.exports = appRouter;