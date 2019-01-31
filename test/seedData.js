const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const seedData = () => {
    const users = [...Array(10)];
    const arr = [...Array(100)];
    return Promise.all(
        users.map((n, i) => {
            return User.create({
                username: `${i}happy`, password: 'password1'
            });
        }))
        .then(users => {
            return Promise.all(
                arr.map(() => {
                    return Post.create({ 
                        username: chance.pickone(users)._id,
                        comment: chance.sentence()
                    });
                })
            );
        });
};

console.log('done');

module.exports = seedData; 
