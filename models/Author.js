const mongoose = require('mongoose');
const {Schema} = mongoose;

const authorSchema = new Schema({
  name: String,
  description: String
})


const Author = mongoose.model("author", authorSchema);


module.exports = {Author};
