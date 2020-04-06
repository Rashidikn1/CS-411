const router = require("express").Router();
let Search = require("../models/search.model");
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

router.route("/").post((req, res) => {
  // getting the string query from the request
  processingQuery = req.body.query;

  // For this API, we need to use x-www-form-urlencoded and put the paramters in the header
  axios
    .post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      qs.stringify({ query: processingQuery }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-app-id": process.env.NX_APP_ID,
          "x-app-key": process.env.NX_APP_KEY,
          "x-remote-user-id": 0
        }
      }
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});
module.exports = router;
