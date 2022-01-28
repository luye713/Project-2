const Villager = require('../models/villager')
const User = require('../models/user')
const rootURL = 'https://acnhapi.com/v1/'
const request = require('request');

let user;
let commentData;

module.exports = {
    index,
    show,
    showOne,
    create,
    delete: deleteOne,
    updateForm,
    update
}


function getUserStatus(incoming) {
    if (incoming) return incoming;
    else return null;
}

function index(req, res) {
    user = getUserStatus(req.user);
    res.render('villagers/villagers', { user })
}


function show(req, res) {

    user = getUserStatus(req.user)

    request(`${rootURL}villagers/`, function(err, response, body) {
        //convert a json to javascriptss
        const villagerData = JSON.parse(body);
        
        //learned this method from https://sebhastian.com/javascript-filter-object/
        const asArray = Object.entries(villagerData)
        const filteredArr = asArray.filter(function ([key, value]) {
            return value.species === req.params.id
        });
        const villagers = Object.fromEntries(filteredArr);

        res.render('villagers/show', { villagers, user })
    })

}

async function showOne(req, res) {
    console.log(req.params);
    user = getUserStatus(req.user);
    console.log("user in showOne controller is", user);
    commentData = [];
    let comments;
    let villager = await Villager.find({ id: req.params.id} )
        if (villager.length !== 0 ) {
            villager = villager[0]
            comments = villager.comments
            if (comments.length !== 0) {
                for (let i=0; i < comments.length; i++) {
                    let foundUser = await User.findById(comments[i].user)
                        commentData.push({ comment: comments[i], user: foundUser })
                        if (i == comments.length-1) {
                            // console.log(commentData, user)
                            res.render('villagers/showOne', { villager, user, commentData})
                        }
                }
            } else {
                res.render('villagers/showOne', { villager, user, commentData})
            }
        } else {
            request(`${rootURL}villagers/${req.params.id}`, function(err, response, body) {
                const oldVillager = JSON.parse(body)
                const villager = new Villager(oldVillager)
                    villager.name = oldVillager.name["name-USen"];
                    
                    villager.save(function(err) {
                        res.render('villagers/showOne', { villager, user, commentData})

                    });
                })
        }
   
}

function create(req, res) {

    user = getUserStatus(req.user);

        if (user) {
            Villager.find({ id: req.params.id }, function(err, villager) {
                console.log("create comments", req.body)
                villager = villager[0]

                //duplicate villagers id
                if (user.villagers)
                console.log(user)
                user.villagers.push(villager)
                user.save()
                console.log(user)

                req.body.user = req.user._id
                villager.comments.push(req.body)
                villager.save(function(err) {
                    res.redirect(`/villagers/${villager.species}/${villager.id}`)
                })
            })
        } else {
        Villager.find({ id: req.params.id }, function(err, villager) {
            villager = villager[0]
            res.redirect(`/villagers/${villager.species}/${villager.id}`)
        })
    }

}

function deleteOne(req, res) {
    user = getUserStatus(req.user);
    // console.log(req.query)
    Villager.find({ id: req.params.id }, function(err, villager) {
        villager = villager[0];
        // console.log(villager.comments)
        let comments = villager.comments;
            for (let i=0; i < comments.length; i++) {
                // if ((comments[i].user == user.id) && (req.query.comment == comments[i].id)) 
                if (req.query.comment == comments[i].id) {
                    console.log("before", comments)
                    comments.splice(i, 1)
                    //comments[i].comments=req.body.comments
                   console.log("after", comments)
                } 
            }
            villager.save(function(err) {
                res.redirect(`/villagers/${villager.species}/${villager.id}`)    
            })
})
}

function updateForm(req, res) {
    user = getUserStatus(req.user);
    Villager.find({ id: req.params.id }, function(err, villager) {
        villager = villager[0];
        let comments = villager.comments;
        comments.forEach(function(comment) {
            if (req.params.comment == comment.id) {
                let oldComment = comment;
                res.render('villagers/comment', { user, villager, oldComment} )
            }
        })
})
}

function update(req, res) {
    Villager.find({ id: req.params.id }, function(err, villager) {
        villager = villager[0];
        let comments = villager.comments;
        comments.forEach(function(comment) {
            if (req.params.comment == comment.id) {
                comment.comments = req.body.newComment          
            }
            })
            villager.save(function(err) {
                res.redirect(`/villagers/${villager.species}/${villager.id}`)  
            })
})
}
