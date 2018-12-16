const express = require('express');
const router = express.Router();
require('../models/Author');
const mongoose = require('mongoose');
const Author = mongoose.model('author');



router.get("/info", (req, res) => {
  res.send(req.user)
});


module.exports = router
