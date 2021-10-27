const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    adminUser: {
        type: Number,
        required: true,
    },
    repositoryName: {
        type: String,
        required: false,
    }
}, {timestamps: true})

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;

