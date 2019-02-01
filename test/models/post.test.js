
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
    it('gets post by id', () => {
        return getPost()
            .then(post => {
                return Promise.all([
                    Promise.resolve(post),
                    request(app)
                        .get(`/posts/${post._id}`)

                ]);

            })
            .then(res => {
                expect(res.body).toEqual({
                    user: expect.any(String),
                    __v: 0,
                    _id: expect.any(String),
                    caption: expect.any(String),
                    photoUrl: expect.any(String),
                    tags: expect.any(Array)
                });

            });
    });
    it('updates a post by id', () => {
        return getPost()
            .then(post => {
                console.log('Here', post._id);
                return request(app)
                    .patch(`/posts/${post._id}`)
                    // .set('Authorization', `Bearer ${getToken()}`)
                    .send({
                        // photoUrl: 'photo',
                        caption: 'caption1'
                        // tags: ['happy', 'sad']  
                    });

            })
            .then(res => {
                console.log('user', res.body.caption);
                expect(res.body).toEqual({
                    photoUrl: expect.any(String),
                    caption: 'caption1',
                    tags: expect.any(Array),
                    _id: expect.any(String),
                    user: expect.any(String),
                    __v: 0
                });
            });
    });
});
