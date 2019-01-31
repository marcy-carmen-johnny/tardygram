const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    handle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        photoUrl: String,
        caption: String,
        tags: Array
    }
});

module.exports = mongoose.model('Post', postSchema);

