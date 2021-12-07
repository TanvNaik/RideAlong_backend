require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Routes
const authenticateRoute = require("./routes/authentication");
const userRoute = require("./routes/user");


// PORT
const port = process.env.PORT || 3000;


// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  }).catch((error)=>{
    console.log(error)
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// Routes
app.use("/api", authenticateRoute);
app.use("/api", userRoute);


app.get('/', (req, res) => {
  res.send('Helloo');
})

