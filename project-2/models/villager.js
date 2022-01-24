const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const villagerSchema = new Schema({
    name: String,
    personality: String,
    "birthday-string": String,
    species: String,
    gender: String,
    "catch-phrase": String,
    icon_uri: String,
    image_uri: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})


module.exports = mongoose.model('Villager', villagerSchema);