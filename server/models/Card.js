const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    workspaceID: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Card = mongoose.model('Card', cardsSchema);
module.exports = Card;

