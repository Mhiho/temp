const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/test', (req, res)=>{
  res.json({message: "Połączenie między apką a serwerem działa"})
  // res.redirect('/login');
})
//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({
    message : 'Signup successful',
    user : req.user
  });
});
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


router.post('/monkeyenter', passport.authenticate('monkeyenter', { session : false }) , async (req, res, next) => {
  res.json({
    message : 'Konto zostało utworzone',
    user : req.user,
    "token": req.user.token
  });
});
router.post('/bigmonkey', async (req,res, next)=>{
  passport.authenticate('bigmonkey', async (err,user,info) => { try {
    if(err || !user){
      const error = new Error('Błąd!')
      return next(error);
    }
    req.login(user, {session: false }, async (error) =>{
      if(error) return next(error)

      const body = { _id: user._id, email: user.email};
      const token = jwt.sign({ user: body}, 'top_secret');
      return res.json({ token });
    }); } catch (error) {
      return next(error)
    }
  })(req,res,next);
})
module.exports = router;
