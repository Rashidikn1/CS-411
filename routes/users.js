const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({
    username: username,
    fridge: [],
    favorites: []
  });
  console.log(newUser);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/addfavorite").post((req, res) => {
  console.log("received");
  const recipe = {
    recipeTitle: req.body.recipeTitle,
    recipeURL: req.body.recipeURL,
    ingredients: req.body.ingredients
  };
  //console.log(req);

  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { favorites: recipe } }
  )
    .then(() => res.json("Recipe added to favorites"))
    .catch(err => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});

module.exports = router;
