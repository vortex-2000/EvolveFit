const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    calories: {
        type: Number,
    },
    protein: {
        type: Number,
    },
    carb: {
        type: Number,
    },
    fat: {
        type: Number,
    },
    acceptedUnits: {
        type: String,
        enum: ['ml', 'liter', 'kg','g','item']
    },
    itemWeight: {
        type: Number,
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;