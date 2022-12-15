var express = require('express');
var router = express.Router();
var path = require('path');

// /* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(process.cwd(), './src/index.html'), {title: 'CMS'});

    //res.sendFile(path.join(__dirname, 'cms/index.html'), { title: 'CMS'});
    //res.sendFile(, '/index.html', { title: 'CMS'}));
    //res.sendFile('../../../src/index.html', { title: 'CMS'});
});

module.exports = router;