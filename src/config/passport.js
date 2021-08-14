const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	// Match Email's user
	const user = await User.findOne({email});
	if (!user) {
		return done(null, false, 'Not user Found');
	} else {
		if(user.status){
			// Match password's user
			const match = await user.matchPassword(password);
			if (match) {
				return done(null, user);
			} else {
				return done(null, false, 'Incorrect password');
			}
		}
		return done(null, false, 'Account is not confirm');
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	})
});