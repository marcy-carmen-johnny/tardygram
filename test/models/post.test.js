
const { getToken } = require('../dataHelpers');
const app = require('../../lib/app');
const request = require('supertest');


describe('Post model', () => {
   
    it('gets a post', () => {
        return request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${getToken()}`)
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
