require('dotenv').config();
require('../../lib/utils/connect')();


const User = require('../../lib/models/User');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User Model', () => {
    const createUser = (username) => {
        return User.create({
            username, 
            password: 'password', 
            photoUrl: 'photo'
        });
    };
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });

    afterAll(done => {
        mongoose.connection.close(done);
    });

    
});
