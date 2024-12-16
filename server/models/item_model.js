const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemType: {
        type: String,
        enum: ['Book', 'Movie'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfProcurement: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    bid: {
        type: String,
        required: true,
        min: 0
    },
    availability: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        enum: ['science', 'economics', 'fiction', 'children', 'personal development'],
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
});


module.exports = mongoose.model("Item", itemSchema);
