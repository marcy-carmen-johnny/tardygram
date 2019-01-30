const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        unique: true
    },
    photoUrl: {
        type: String,
        required: [true, 'photo required']
    },
    passwordHash: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.passwordHash;
        }
    }
});

// userSchema.methods.compare = function(pw) {
//   return compare(pw, this.passwordHash);
// };

// //find by token
// userSchema.statics.findByToken = function(token) {
//   return Promise.resolve(untokenize(token));
// };

userSchema.methods.authToken = function() {
    return tokenize(this.toJSON());
};

const User = mongoose.model('User', userSchema);

module.exports = User;
