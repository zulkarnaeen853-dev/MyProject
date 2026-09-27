const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const dbConfiguration = require('./src/configurations/dbConfiguration');
const routes = require('./src/routes');

app.use(express.json());
app.use(cors());
app.use(routes)
app.use('/uploads', express.static('uploads'))
dbConfiguration()







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});