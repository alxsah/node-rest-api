const User = require('../models/user');

const register = (req, res) => {
  User.find({username: req.body.username})
      .exec()
      .then((existing) => {
        if (existing.length !== 0) {
          res.status(409).send('Error: Username already exists.');
        } else {
          const user = new User({
            username: req.body.username,
          });
          user.setPassword(req.body.password);
          user.save()
              .then(() => {
                const token = user.generateJwt();
                res.status(200).json({token});
              })
              .catch((err) => res.status(500).json(err));
        }
      });
};

module.exports = {register};
