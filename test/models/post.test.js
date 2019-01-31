require('dotenv').config();
require('../../lib/utils/connect')();
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const Post = require('../../lib/models/Post');
const request = require('supertest');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('Post model', () => {
    // const createPost = username => {
    //     return createUser(username) 
    //         .then(createUser => {
    //             return request(app)
    //                 .post('/auth/signin')
    //                 .send({ username: createUser._id, password: 'password' });
    //         })
    //         .then(res => {
    //             console.log('banana', res.body);
    //             return res.body;
    //         });
            
    // };

    // const createUser = username => {
    //     return User.create({
    //         username, 
    //         password: 'password'
    //     })
    //         .then(res =>  res.body);
    // };
    // beforeAll(() => {
    //     connect();
    // });
    // beforeEach(done => {
    //     mongoose.connection.dropDatabase(done);
    // });
    // afterAll(done => {
    //     mongoose.connection.close(done);
    // });
    it('tests model for post', () => {
        return createPost('userrrrrr')
            .then(res => {
                expect(res.body).toBeTruthy();
            });
        // const post = new Post([{ username: createUser._id, password: 'password' }, { post: { tags: ([]), caption: '', photoUrl: '' } }]);
        // expect(post.toJSON()).toEqual(
        //     { username: createUser._id },
        //     { post: 
        //     { tags: ([]), caption: '', photoUrl: '' }, _id: expect.any(Types.ObjectId) }
        // );
    });

});
