const Villager = require('../models/villager')
const rootURL = 'https://acnhapi.com/v1/'
const request = require('request');

module.exports = {
    index,
    show,
    showOne
}

function index(req, res) {
  
    // const villager = req.query.villager
    // if (!villager) {
    //   res.render('index', { villagerData: null})
    // } else {
        // request(`${rootURL}villagers/`, function(err, response, body) {
        //     //convert a json to javascriptss
        //     const villagerData = JSON.parse(body);
        //     // console.log(villagerData)
            
        //     res.render('villagers/villagers', { villagerData })
            
        // })
        res.render('villagers/villagers')
    }
// }
//default if GET for request.
//body is what we get back from the api, the response.
//this body is not a true json, it's just a response. we need to turn this reponse
//into an object that javascript can use - dot notation in view etc..
//json object is always "" keys.

function show(req, res) {
    request(`${rootURL}villagers/`, function(err, response, body) {
        //convert a json to javascriptss
        const villagerData = JSON.parse(body);
        
        //learned this method from https://sebhastian.com/javascript-filter-object/
        const asArray = Object.entries(villagerData)
        const filteredArr = asArray.filter(function ([key, value]) {
            return value.species === req.params.id
        });
        const villagers = Object.fromEntries(filteredArr);

        res.render('villagers/show', { villagers })
        
    })
}

function showOne(req, res) {
    request(`${rootURL}villagers/${req.params.id}`, function(err, response, body) {
        const villager = JSON.parse(body)
        res.render('villagers/showOne', { villager })
    });
}
