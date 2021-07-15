//Connecting to the database
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/college", {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("database  is connected")
})