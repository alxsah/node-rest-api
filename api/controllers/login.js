const passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.cookie('jwt', token, {path: '/', httpOnly: true});
      res.status(200).send();
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {login};
