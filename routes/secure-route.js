const express = require('express');
const router = express.Router();
require('../models/Author');
const mongoose = require('mongoose');
const Author = mongoose.model('author');
const bodyParser = require('body-parser');
//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user



router.get("/infos", (req, res) => {
  res.send({
    message: "Dziń dybry!",
    // user: req.user,
    // token: req.query.secret_token
  })
});

router.post("/addAuthor", (req,res) => {
  const auth = new Author({
    name: req.body.name,
    description: req.body.description

    // app.use(express.bodyParser({
    //         uploadDir: '/',
    //         keepExtensions: true
    //     }))
    //     app.use(express.limit('5mb'));
    //

  });

    auth.save();
    res.json(auth);
});

router.get("/authors", function(req, res) {
  Author.find(function(err, auth) {
    if (err) res.send(err);

    res.json(auth);
  });
});
router.delete("/deleteAuth/:id_auth", (req, res) => {
  Author.deleteOne({ id_auth: req.params._id }, er => {
    if (er) {
      console.log(er);
    }
    res.send({ info: "wybrane elementy zostały usunięte" });
  });
});
router.get("/:author_id", (req, res) => {
  Author.findById(req.params.auth_id, (er, cat) => {
    if (er) {
      res.send(er);
    }
    res.json(cat);
  });
});
router.put("/update/:auth_id", (req, res) => {
  Author.updateOne(
    {
      name: req.body.name,
      description: req.body.description
    },
    (er, upauth) => {
      if (er) {
        res.send(er);
      }
      res.send(upauth);
    }
  );
});



module.exports = router;
