const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const orderSchema = new Schema({
    addres: {
        name: String,
        surname: String,
        city: String,
        street: String,
        streetNumber: Number, 
        postCode: Number,
        phoneNumber: Number,
        email: {
            type: String,
            required: 'Email is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }
    },
    paymentComplete: Boolean,
    products : [Schema.Types.ObjectId],
    productsAmount : [Number],
    orderDate: {
        required: true,
        type: Date,
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order