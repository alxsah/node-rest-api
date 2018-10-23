const User = require('../models/user');

const register = (req, res) => {
  const user = new User({
    username: req.body.username,
  });
  console.log(user);

  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      res.status(500).json(err);
    }
    const token = user.generateJwt();
    res.status(200).json({token});
  });
};

module.exports = {register};
