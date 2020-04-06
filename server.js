const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

//Allows for local environment variables instead of process, for testing

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "411project", "build")))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const nutritionRouter = require('./routes/nutrition');

app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/nutrition', nutritionRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "411project", "build", "index.html"));
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
