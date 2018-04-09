var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StudentSchema = new Schema({
    name: String,
    gender: String,
    age: Number,
    profile_photo: String
})

module.exports = mongoose.model('Student', StudentSchema)