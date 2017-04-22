var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

/* GET home page. */
router.get('/:resource', function (req, res, next) {

    var resource = req.params.resource;
    var controller = controllers[resource]

    if (controller === undefined) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }
    controller
        .get(req.query)
        .then(function (bookmarks) {
            res.send({
                confirmation: 'success',
                resource: bookmarks
            });
        })
        .catch(function (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })
        })

});

router.get('/:resource/:id', function (req, res, next) {
    var resource = req.params.resource;

    var controller = controllers[resource]
    if (controller === undefined) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }
    var id = req.params.id
    controller
        .getById(id)
        .then(function (bookmark) {
            res.send({
                confirmation: 'success',
                resource: bookmark
            });
        })
        .catch(function (err) {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })

});

router.post('/:resource/', function (req, res, next) {
    var resource = req.params.resource;

    var controller = controllers[resource]
    if (controller === undefined) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }

    controller
        .create(req.body)
        .then(function (bookmark) {
            /*console.log(`bookmark title is ${bookmark.title}`)
            if (bookmark.title === null) {
                res.redirect('/');
                alert('Unable to fetch title and description for the URL mentioned! Please enter manually');
            }*/
            res.send({
                confirmation: 'success',
                resource: bookmark
            });
        })
        .catch(function (err) {
            if(err === 'Data Not Found'){
                req.flash('error', 'Unable to fetch title and description for the URL mentioned! Please enter manually');
                res.redirect('/');
            }
            res.json({
                confirmation: 'fail',
                message: err
            })
        })

});

module.exports = router;
