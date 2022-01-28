const user = require('../models/user');
const User = require('../models/user');
const Villager = require('../models/villager');

module.exports = {
    index,
}

function index(req, res, next) {
  if (req.user) {
    let user = req.user;
    res.render('users', { user });
  } else {
      res.redirect('/villagers');
  };   
};

