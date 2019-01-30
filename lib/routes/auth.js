const { Router } = require('express');
const User = require('../../lib/models/User');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

module.exports = Router()
    .post('/signup', (req, res, next) => {
        const { username, password } = req.body;
        User
            .create({ username, password })
            .then(user => res.send({ user, token: user.authToken() }))
            .catch(next);
    })

    .post('/signin', (req, res, next) => {
        const { username, password } = req.body;
        User
            .findOne({ username })
            .then(user => {
                if(!user){
                    return next(new HttpError(401, 'Invalid username or password'));
                } 
                console.log('this', password);
                return Promise.all([
                    Promise.resolve(user),
                    user.compare(password)
                ]);

            })
            .then(([user, correct]) => {
                if(correct){
                    res.send({ user, token: user.authToken() });
                }
            })
            .catch(next);

    });
  
