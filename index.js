const express = require("express");
const {connectToMongoDb} = require("./connection");


const urlRoute = require("./routes/url");
const URL = require("./models/url");


const app = express();
const PORT = 1001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then (()=>console.log("MongoDb Connected!"));

  app.use(express.json());
app.use ("/url", urlRoute);

app.get("/:shortId", async(req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },
   {
     $push : {
    visitHistory : {
      timestamps: Date.now(),
    }
  },
 },
);
  res.redirect(entry.redirectURL);

});

app.listen(PORT, () => console.log(`Server Started at port : ${PORT}`));