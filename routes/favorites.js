const router = require("express").Router();
let User = require("../models/user.model");
router.route("/").get((req, res) => {
  // we need to retrieve the list of favorites from the mongo
  console.log("pls print");

  User.findOne({ username: "test" }, "favorites", function(err, favorites) {
    res.send(favorites);
  });
});
module.exports = router;
