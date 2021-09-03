const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    img: String,
    price: Number,
    description: [String],
    left: Number,
    category: String,
    sale: Object

});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product',productSchema);

module.exports = Product
