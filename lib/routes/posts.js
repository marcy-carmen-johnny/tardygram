const { Router } = require('express');
const Post = require('../../lib/models/Post');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
    .post('/', ensureAuth, (req, res, next) => {
        const { photoUrl, caption, tags } = req.body;
        Post
            .create({
                user: req.user._id,
                photoUrl, 
                caption, 
                tags
            })
            .then(post => res.send(post))
            .catch(next);
    });
