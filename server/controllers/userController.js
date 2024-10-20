const User = require('../models/user');

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);  // Return all users as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getUsers };
