require('dotenv').config();
require('../../lib/utils/connect')();
const { getUser, getPost } = require('../dataHelpers');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const Post = require('../../lib/models/Post');
const request = require('supertest');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('Post model', () => {
   
    it('gets a post', () => {
        return getUser({ username: '6happy' })
            .then(user => {
                return request(app)
                    .post('/posts')
                    .send({
                        photoUrl: 'photo',
                        caption: 'caption',
                        tags: ['happy', 'sad']
                    })
                    .then(res => {
                        expect(res.body).toEqual({
                            user: expect.any(String),
                            photoUrl: 'photo',
                            caption: 'caption',
                            tags: ['happy', 'sad'],
                            _id: expect.any(String),
                            __v: 0    
                        });
                    });
            });
    });

});
