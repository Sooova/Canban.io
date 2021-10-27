const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // creationDate: {
    //     type: Date,
    //     required: true,
    // },
    state: {
        type: String,
        required: true,
    },
    workspaceID: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

const Card = mongoose.model('Card', cardsSchema);
module.exports = Card;

