var express = require('express');
var router = express.Router();
var path = require('path');


router.use(express.static(__dirname + '/dist/cms'));

// PathLocationStrategy
router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/cms/index.html'));
})

// /* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/cms/index.html'), {title: 'CMS'});

    

    //res.sendFile(path.join(__dirname, 'cms/index.html'), { title: 'CMS'});
    //res.sendFile(, '/index.html', { title: 'CMS'}));
    //res.sendFile('../../../src/index.html', { title: 'CMS'});
});

module.exports = router;