const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
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

const PostCardsSchema = mongoose.model('post', CardsSchema);
module.exports = PostCardsSchema;

