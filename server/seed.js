const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected for seeding...');
  seedUsers();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seedUsers = async () => {
  const users = [
    { name: 'John Doe', avatar: '/images/john-doe.png' },  // Local image path
    { name: 'Jane Smith', avatar: '/images/jane-smith.png' },  // Local image path
    { name: 'Alice Johnson', avatar: '/images/alice-johnson.png' },  // Local image path
    { name: 'Michael Brown', avatar: '/images/michael-brown.png' }  // Local image path
  ];

  try {
    await User.insertMany(users);
    console.log('Users inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error inserting users:', error);
    process.exit(1);
  }
};
