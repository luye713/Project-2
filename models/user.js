const mongoose = require('mongoose');
const Schema = mongoose.Schema



const userSchema = new Schema({
    //all of these valus we can pull out from the profile object in passport.js
    name: String,
    email: String,
    googleId: String,
    villagers: [{type: Schema.Types.ObjectId, ref: 'Villager'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)