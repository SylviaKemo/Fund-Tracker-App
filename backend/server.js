require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");



const authRoutes = require("./routes/authRoute")
 

const app = express();  


app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRoutes);



// connect to db
mongoose.connect(process.env.MONGO_URL) // #3
 .then(() => {
      //  listen for requests
      app.listen(process.env.PORT, () => {
        console.log("Connected to the db $ listening to port", process.env.PORT);
      });
    })
    .catch((err) => {
        console.log(err)
    })
