var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join('/index.html'), {title: 'WeLearn CMS'})
    res.sendFile(path.join(process.cwd(), 'docs/index.html'), {title: '*** WeLearn CMS ***'})
});

module.exports = router;