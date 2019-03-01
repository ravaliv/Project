var express = require('express')
var forum = express()

forum.get('/', function(req, res){
	res.render('title', {title: 'My forum application'})
})

module.exports=forum;