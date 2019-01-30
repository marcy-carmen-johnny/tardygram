// const Tweet = require('../lib/models/Tweet');
const User = require('../../lib/models/User');

const seedData = () => {
    const user = [...Array(10)];
    return Promise.all(
        user.map((n, i) => {
            return User.create({
                username: `${i}test`, password: 'password2', photoUrl: 'photo1'
            })
                .then(users => res.send(users));
          })
    });


module.exports = seedData; 
