const express = require("express");
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const PORT=process.env.PORT||3000;
console.log( process.env.DBNAME)
mongoose.connect(
  process.env.DBNAME,
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/getUser", async (request, response) => {
    try {
       const result =await db.collection('UserInfo').find({}).toArray();
       console.log(result);
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/", async (request, response) => {
  try {
    response.send({name:"working"});
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/addUser", async (request, response) => {
  try {
     const result1 =await db.collection('UserInfo').insertOne({ name: "ramesh"})
     if(result1){
      const result =await db.collection('UserInfo').find().toArray();
      console.log(result);
      response.send(result);
     }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});
