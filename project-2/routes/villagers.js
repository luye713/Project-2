var express = require('express');
var router = express.Router();


const villagersCtrl = require('../controllers/villagers')

/* GET home page. */
router.get('/', villagersCtrl.index);
router.get('/:id', villagersCtrl.show)
router.get('/:species/:id', villagersCtrl.showOne)
router.post('/:id/:id', villagersCtrl.create)
router.delete('/:id/:id', villagersCtrl.delete)
router.get('/:id/:id/:comment', villagersCtrl.updateForm)
router.put('/:id/:id/:comment', villagersCtrl.update)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}


module.exports = router;
