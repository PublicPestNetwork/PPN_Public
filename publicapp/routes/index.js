var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
  index_controller.index_get(req, res, next);
});

router.post('/', function(req, res, next) {
  index_controller.index_post(req, res, next);
});

module.exports = router;
