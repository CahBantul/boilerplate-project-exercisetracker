const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
  console.log(`your app running at http://localhost:${PORT}`);
});
