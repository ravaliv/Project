var express = require('express')
var forum = express()
var expmongodb = require('express-mongo-db');
var credientials = require('./credientials')
forum.use(expmongodb(credientials.database.url));
forum.set('view engine', 'ejs')
var title = require('./map/title')
var userdetails = require('./map/userdetails')
var expressVlid = require('express-validator')
forum.use(expressVlid())
var bodyParse = require('body-parser')
forum.use(bodyParse.urlencoded({extended: true}))
forum.use(bodyParse.json())
var Overmethod = require('method-override')
forum.use(Overmethod(function (req, res)
{
	if(req.body && typeof req.body === 'object' && '_method' in req.body){
		var method = req.body._method
		delete req.body._method
		return method
	}
}))
var flash = require('express-flash')
var parse_cookie= require('cookie-parser')
var session = require('express-session')
forum.use(parse_cookie('keyboard cat'))
forum.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 60000}
}))
forum.use(flash())
forum.use('/', title)
forum.use('/userdetails', userdetails)
forum.listen(3000, function() {
	console.log('Server runnign at port 3000: http://127.0.0.1:3000')
	// body...
})