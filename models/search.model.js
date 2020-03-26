const mongoose = require('mongoose');
const searchSchema = new mongoose.Schema({
  searchItem: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 0
  },
}, {
  timestamps: true,
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
