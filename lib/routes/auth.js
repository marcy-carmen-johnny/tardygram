const { Router } = require('express');
const User = require('../../lib/models/User');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

module.exports = Router()
    .post('/signup', (req, res, next) => {
        const { username, password, photoUrl } = req.body;
        User
            .create({ username, password, photoUrl })
            .then(user => res.send({ user, token: user.authToken() }))
            .catch(next);
    });
  
