const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const userController = require('./controllers/User');
const exerciseController = require('./controllers/Exercise');
const logController = require('./controllers//Log');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', userController.getAllUsers);
app.post('/api/users', userController.postUser);
app.post('/api/users/:_id/exercises', exerciseController.postExercise);
app.get('/api/users/:_id/logs', logController.getLogs);

app.listen(PORT, () => {
  console.log(`your app running at http://localhost:${PORT}`);
});
