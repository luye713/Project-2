const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comments: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

const villagerSchema = new Schema({
    id: Number,
    name: String,
    personality: String,
    "birthday-string": String,
    species: String,
    gender: String,
    "catch-phrase": String,
    icon_uri: String,
    image_uri: String,
    comments: [commentSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Villager', villagerSchema);