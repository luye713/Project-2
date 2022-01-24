const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    // user: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

const userSchema = new Schema({
    //all of these valus we can pull out from the profile object in passport.js
    name: String,
    email: String,
    comments: [commentSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)