const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./models/user');
const MonkeyModel = require('./models/monkey');



mongoose.connect("mongodb://localhost:27017/DB");
// mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');
require('./auth/auth2');

app.use( bodyParser.urlencoded({ extended : false }) );



const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-route');
const userRoutes = require('./routes/user-routes');

app.use('/api', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/monkey', passport.authenticate('jwt', { session : false }), secureRoute );
app.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);


//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Port otwarty, do dzieła!')
});
