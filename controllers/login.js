const passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200).json({token});
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {login};
