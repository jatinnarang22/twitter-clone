// const passport = require("passport");
// const {postSchema} = require("./schema");
// const {userSchema} = require("./schema");

// const isLoggedIn = (req,res,next)=>{f
//     if(!req.isAuthenticated()){
//         return res.redirect('/login');
//     }
//     next();
// } 
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

// module.exports = {isLoggedIn} ;