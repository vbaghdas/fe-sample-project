"use strict"
var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    _id: Number,
    filename: String,
    price: Number,
    name: String
});

var Products = mongoose.model('Products', productsSchema);
module.exports = Products;