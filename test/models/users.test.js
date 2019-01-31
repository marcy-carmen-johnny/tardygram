require('dotenv').config();
require('../../lib/utils/connect')();
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const request = require('supertest');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User Model', () => {
    const createUser = (username) => {
        return User.create({
            username, 
            password: 'password'
        })
            .then(res =>  res.body);
    };
    beforeAll(() => {
        connect();
    });
    beforeEach(done => {
        mongoose.connection.dropDatabase(done);
    });
    afterAll(done => {
        mongoose.connection.close(done);
    });
    it('test a model', () => {
        const user = new User({ username: 'test1' });
        expect(user.toJSON()).toEqual({ username: 'test1', _id: expect.any(Types.ObjectId) });
    });
    it('allows a user to sign up', () => {
        return createUser('test1')
            .then(() => {
                return request(app) 
                    .post('/auth/signup')
                    .send({ username: 'test2', password: 'password' });
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: {
                        _id: expect.any(String),
                        username: 'test2'
                    },
                    token: expect.any(String)
                });
            });
    });

    it('allows user to sign in', () => {
        return createUser('meeee1')
            .then(() => {
                return request(app)
                    .post('/auth/signin')
                    .send({ username: 'meeee1', password: 'password' });
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    user: {
                        _id: expect.any(String),
                        username: 'meeee1',
                    },
                    token: expect.any(String)
                });
            });
    });

    it('has verify route', () => {
        return createUser('weeee1')
            .then(() => {
                return request(app)
                    .post('/auth/signin')
                    .send({ username: 'weeee1', password: 'password' })
                    .then(res => res.body.token);
            })
            .then(token => {
                console.log('token', token);
                return request(app)
                    .get('/auth/verify')
                    .set('Authorization', `Bearer ${token}`);                    
            })
            .then(res => {
                expect(res.body).toEqual({
                    username: 'weeee1',
                    _id: expect.any(String)
                });
            }); 
    });
});
