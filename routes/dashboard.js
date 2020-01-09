var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});


router.get('/recharge', function(req, res, next) {
  res.render('dashboard/recharge');
});

router.get('/booking', function(req, res, next) {
  res.render('dashboard/booking');
});

router.get('/deal', function(req, res, next) {
  res.render('dashboard/deal');
});


router.get('/affiliates', function(req, res, next) {
  res.render('dashboard/affiliates');
});


router.get('/discount', function(req, res, next) {
  res.render('dashboard/discount');
});


router.get('/merchant', function(req, res, next) {
  res.render('dashboard/merchant');
});

router.get('/services', function(req, res, next) {
  res.render('dashboard/services');
});

router.get('/account', function(req, res, next) {
  res.render('dashboard/account');
});








module.exports = router;