const User = require('../model/user');

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, age, occupation } = req.body;
    const user = new User({
      email,
      password,
      name,
      age,
      occupation,
    });
    await user.save();
    res.status(201).json(user);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, age, occupation } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, occupation },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.deleteUser = async (req, res) => {
    try {
      const { name, age, occupation } = req.body;
      const user = await User.findByIdAndDelete(
        req.params.id,
      );
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).send('User Deleted Successfully');
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const match = user.checkpass(password);

    if (!match) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    
    res.json(user);
  }
   catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
