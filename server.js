require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo-app', { useNewUrlParser: true });

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(Server is running on port ${process.env.PORT || 5000});
});
