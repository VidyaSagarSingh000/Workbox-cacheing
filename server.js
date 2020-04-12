const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());
app.use(cors());

const publicVapidKeys =
  "BN5FobRashUcNaTXxIfVmYlBuI79vEfPflFXn9Ond48Tg1kMp0TJf1bdXZB1Ef6-LO6N70S_aTMEqTXu6U1iB3g";
const privateVapidKeys = "0NyZCtnbpb4JJVLscrp5FbIlS0RL3holJF2V-cOqE3w";

webPush.setVapidDetails(
  "mailto:test@terst.com",
  publicVapidKeys,
  privateVapidKeys
);

//subscribe route
app.post("/subscribe", (req, res) => {
  //get push subscription object
  const subscription = req.body;

  //send status 201 resource created
  res.status(201).json({});

  //create payload
  const payload = JSON.stringify({ title: "push-test" });

  //pass object into send Notification
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 8080;

app.listen(port, () => console.log(`server listening at ${port}`));
