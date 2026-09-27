const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    picture: {
        type: String,
        trim: true
    },
    name: { 
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});


module.exports = mongoose.model('User', userSchema);