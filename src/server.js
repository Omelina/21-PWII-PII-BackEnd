const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// Initializations
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(cors());
app.use(cors({
	domains: '*',
	methods: "*"
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/roles.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/categories.routes'));
app.use(require('./routes/resources.routes'));
app.use(require('./routes/news.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res) => {
// 	res.render("404");
// });

module.exports = app;