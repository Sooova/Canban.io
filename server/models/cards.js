const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    workspaceID: {
        type: Number,
        required: true,
    }
})

const Cards = mongoose.model('Cards', cardsSchema);
module.exports = Cards;

