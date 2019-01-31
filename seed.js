require('dotenv').config();
require('./lib/utils/connect')();
const seedData = require('./test/seedData');
const mongoose = require('mongoose');

seedData()
    /* eslint-disable-next-line */
    .then(() => console.log('done'))
    .finally(() => mongoose.connection.close());
    
