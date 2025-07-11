const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Display all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('pages/users', { users });
  } catch (err) {
    res.redirect('/');
  }
});

// Display form to add new user
router.get('/add', (req, res) => {
  res.render('pages/add-user');
});

// Process add form
router.post('/add', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  });

  try {
    await user.save();
    res.redirect('/users');
  } catch (err) {
    res.render('pages/add-user', {
      error: err.message,
      user: req.body
    });
  }
});

// Other web routes (edit, delete) would go here

module.exports = router;