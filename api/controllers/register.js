const User = require('../models/user');

const register = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({error: 'Missing required fields.'});
  } else {
    const re = /[^a-zA-Z0-9]/;
    if (re.test(req.body.username) || re.test(req.body.password)) {
      res.status(400).json({error: 'Invalid characters in username or password.'});
    }
  }
  User.find({username: req.body.username})
      .exec()
      .then((existing) => {
        if (existing.length !== 0) {
          res.status(409).json({error: 'Username already exists.'});
        } else {
          const user = new User({
            username: req.body.username,
          });
          user.setPassword(req.body.password);
          user.save()
              .then(() => res.status(200).send())
              .catch((err) => res.status(500).json(err));
        }
      });
};

module.exports = {register};
