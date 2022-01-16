require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require("path")

// Routes
const authenticateRoute = require("./routes/authentication");
const userRoute = require("./routes/user");
const rideRoute = require("./routes/ride")
const cityRoute = require("./routes/city")
const invoiceRoute = require("./routes/invoice")

// PORT
 const port = process.env.PORT || 3000;
 

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(port, "192.168.1.209", () => {
      console.log(`Example app listening at http://192.168.1.209:${port}`);
    })
  }).catch((error)=>{
    console.log(error)
  });


 

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/image", cors(),express.static(path.join(__dirname, '/uploads/images')))


// Routes
app.use("/api", authenticateRoute);
app.use("/api", userRoute);
app.use("/api", rideRoute);
 
app.use("/api", cityRoute);
app.use("/api", invoiceRoute);


app.get('/', (req, res) => {
  res.send('Helloo');
})

