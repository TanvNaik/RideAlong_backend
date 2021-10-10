require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");

// PORT
const port = process.env.PORT || 3000;


// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  }).catch((error)=>{
    console.log(error)
  });




app.get('/', (req, res) => {
  res.send('Helloo');
})

