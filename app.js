require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express
const app = express();

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/mongo3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// // Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/users', require('./routes/web/users'));

// // Home route
app.get('/', (req, res) => {
  res.render('pages/index');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});