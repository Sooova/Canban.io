const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    adminUser: {
        type: String,
        required: true,
    },
    repositoryName: {
        type: String,
        required: false,
    },
    workspaceColor: {
        type: String, 
        required: true,
    }
}, {timestamps: true})

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;

