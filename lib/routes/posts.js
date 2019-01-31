const { Router } = require('express');
const Post = require('../../lib/models/Post');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

const patcher = (body, fields) => {
    return Object.keys(body)
        .reduce((acc, key) => {
            if(fields.includes(key) && body[key]) {
                acc[key] = body[key];
            }
            return acc;
        }, {});
};
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
    })

    .get('/', (req, res, next) => {
        Post
            .find()
            .then(posts => res.send(posts))
            .catch(next);
    
    })

    .get('/:id', (req, res, next) => {
        const _id = req.params.id;
        Post
            .findById(_id)
            .then(foundPost => {
                if(!foundPost) {
                    return next(new HttpError(404, `no post found with ${_id}`));

                } 
                res.send(foundPost);
            })

            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        const patched = patcher(req.body, 'caption');
        Post
            .findByIdAndUpdate(req.params.id, patched, { new: true })
            .then(post => {
                res.send(post);
            })
            .catch(next);
    });


