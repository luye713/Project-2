const user = require('../models/user');
const User = require('../models/user');
const Villager = require('../models/villager');

module.exports = {
    index,
}

// function index(req, res, next) {
//   if (req.user) {
//     let user = req.user;
//     res.render('users', { user});
//   } else {
//       res.redirect('/villagers')
//   }   
//   }

function getUserStatus(incoming) {
  if (incoming) return incoming;
  else return null;
}

function index(req, res) {
  let user = getUserStatus(req.user);
  let allComments = [];
  let userComments = [];

  User.findById(user.id).populate({path: 'villagers', populate: {path: 'comments.comments'}}).exec(function(err, villager) {
   
    // User.findById(user.id).populate('villagers').exec(function(err, villager) {
    // console.log(villager.villagers)
      // Villager.find({_id: {$nin:user.villagers}}).populate('comments').exec(function(err, comment) {
        
        console.log(villager)
        res.render("users", { user, villager })
      })

  // })
  // User.findById(user.id, function(err, user) {
  //   let villagers = user.villagers
  //   villagers.forEach(function(villagerId) {
  //     console.log(villagerId)
  //     Villager.find({ _id: villagerId}, function(err, results) {
  //       console.log(results)
  //       allComments.push(results[0].comments)
  //       console.log("after push", allComments)
      
  //     })
  //   })
    // res.render('users', { user, allComments })
    
    // console.log("dfsagfsggargarggragr")
 
    // allComments.forEach(function(comments) {
    //   console.log("daefsdegfsrg", comments)
    //   comments.forEach(function(comment) {
    //     if (comment.user == user._id) {
    //         userComments.push(comment.comments)
    //         console.log("final???", userComments)
    //     }
    //   })
   
    //   })


}
  // )}