require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });


// PORT
const port = process.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Express World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})