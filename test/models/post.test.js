
const { getToken, getPost, getPosts } = require('../dataHelpers');
const app = require('../../lib/app');
const request = require('supertest');


describe('Post model', () => {
    it('creates a post', () => {
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

    it('gets a post', () => {
        return request(app)
            .get('/posts')
            .then(res => {
                return Promise.all([
                    Promise.resolve(res.body),
                    getPosts()
                ]);
            })
            .then(([body, posts]) => {
                expect(body).toHaveLength(posts.length);
            });
    });
});
