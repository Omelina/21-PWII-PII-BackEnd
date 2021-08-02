const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Role = require('../models/Role');
const User = require('../models/User');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	// Match Email's user
	const user = await User.findOne({email});
	if (!user) {
		return done(null, false, {message: 'Not user Found'});
	} else {
		// Match password's user
		const match = await user.matchPassword(password);
		if (match) {
			return done(null, user);
		} else {
			return done(null, false, {message: 'Incorrect password'});
		}
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