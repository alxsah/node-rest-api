const db = require("../db.js");

const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("rest API test");
  });

  // Get all bookings for UID
  app.get("/bookings/:uid", (req, res) => {
    console.log("getting bookings for UID ", req.params.uid);
    db.getUserById(req.params.uid).then((userObj) => {
        res.status(200).send(userObj.bookings);
    });
  });

  // Add booking to a UID
  app.post("/bookings/:uid", (req, res) => {
    console.log("posting booking for UID ", req.params.uid);
    db.addBooking(req.params.uid, req.body.booking).then(() => {
        res.status(200).send("Success!");
    })
  });
}

module.exports = appRouter;