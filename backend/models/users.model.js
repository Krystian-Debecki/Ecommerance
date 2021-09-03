const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Username is required',
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: 'Pass is required',
    },
    email: {
        type: String,
        required: 'Email is required',
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, 'Please fill a valid email address']
    },
    basket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    inBasket: [Number],
    favorites: Array,
    history: Array,
})



const User = mongoose.model('User', UserSchema)


module.exports = User