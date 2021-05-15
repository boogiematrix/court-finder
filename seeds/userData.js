const { User } = require('../models');

const userdata = [
  {
    name: 'Bijan',  
    email: 'aaaa@test.com',
    password: 'aaaaaaaa',
    
  },
  {
    name:'Dan',  
    email: 'bbbb@test.com',
    password: 'bbbbbbbb',
    
  },
  {
    name:'Nicholas',  
    email: 'cccc@test.com',
    password: 'cccccccc',
    
  },
  {
      name: 'Davis',
      email:'dddd@test.com',
      password:'dddddddd'
  }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
