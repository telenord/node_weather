const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

mongoose.connect('mongodb://localhost/nodeauth');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const User = mongoose.model('User', {
  username: {
    type: String,
    index: true
  },
  password: String,
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '${VALUE} is not valid email'
    }
  },
  password:{
    type: String,
    require: true,
    minlength: 6,
  },
  tokens:[{
    access: {
      type: String,
      require: true,
    },
    token:{
      type: String,
      require: true,
    }
  }],
});
