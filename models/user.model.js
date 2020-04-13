const mongoose = require("mongoose");

var FridgeSchema = new mongoose.Schema({
  foodName: String,
  foodID: Number,
  quantity: Number
});

var FavoriteSchema = new mongoose.Schema({
  recipeTitle: { type: String, required: true },
  recipeURL: { type: String, required: true },
  ingredients: [String]
});
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3
    },
    fridge: [FridgeSchema],
    favorites: [FavoriteSchema]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
