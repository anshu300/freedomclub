var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

router.post('/review', function (req, res, next) {
    var data = {
      "name":req.body.name,
      "email":req.body.email,
      "mobile":req.body.mobile,
      "city":req.body.city,
      "product_id":req.body.id,
      "review":req.body.review,
      "star":req.body.star
    }
    db.query('INSERT INTO review SET ?', data, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
      }
    });
  });

  router.post('/likes', function (req, res, next) {
    var data = {
      "user_id":1,
      "review_id":req.body.id,
      "likes":1
    }
    db.query('INSERT INTO likes SET ?', data, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
      }
    });
  });
/*
* dislike
*/
  router.post('/dislike', function (req, res, next) {
    var data = {
      "user_id":1,
      "review_id":req.body.id,
      "likes":0
    }
    db.query('INSERT INTO likes SET ?', data, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
      }
    });
  });
  
  module.exports = router;