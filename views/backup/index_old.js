var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var uid = require('rand-token').uid;
var app = express();
var request = require("request");
/* GET home page. */


router.get('/', function (req, res, next) {
  var token = req.cookies.token;
  if (token == undefined) {
    res.render('index', { user: 0, login: "Login" });
  } else {
    var sql = "SELECT * FROM users WHERE token=?";
    db.query(sql, [token], function (err, result) {
      if (result.length == 0) {
        r = 0;
        check(r);
      }
      if (result.length == 1) {
        req.session.user = result[0].id;
        r = 1;
        check(r);
      }
    });
    function check(r) {
      if (r == 1) {
        //var num=getamu();
        res.render('index', { user: r, login: "My Account" });
      }
      if (r == 0) {
        res.render('index', { user: r, login: "Login" });
      }
    }
  }
  function getamu(id){
    var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?";
    db.query(sql, [id], function (err, result) {
        console.log(result);
    });
  }
});



router.get('/login', function (req, res, next) {
  var token = req.cookies.token;
  console.log(token);
  res.render('login');
});
router.post('/login', function (req, res, next) {
  var mobile = req.body.mobile;
  var pass = req.body.password;
  var sql = "SELECT * FROM users WHERE mobile = ? AND password = ?";
  db.query(sql, [mobile, pass], function (err, result) {
    if (result == undefined) {
      res.render('login');
    }
    else {
      req.session.user = result[0].id;
      res.cookie('token', result[0].token);
      res.redirect('/users');
    }
  });
});

router.get('/register', function (req, res, next) {
  var token = uid(16);
  res.render('register', { token: token });
});

router.post('/register', function (req, res, next) {
  var sql = "INSERT INTO users (username, email,password,mobile,token) VALUES ('" + req.body.username + "', '" + req.body.email + "','" + req.body.password + "','" + req.body.mobile + "','" + req.body.token + "')";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/login');
    }
  });
});

/*
*  Ajax Login Code
*/
router.post("/ajaxlogin", function (req, res, next) {
  var mobile = req.body.mobile;
  var pass = req.body.password;
  var sql = "SELECT * FROM users WHERE mobile = ? AND password = ?";
  db.query(sql, [mobile, pass], function (err, result, fields) {
    if (result.length == 0) {
      res.json({ status: 500 });
    }
    if (result.length == 1) {
      req.session.user = result[0].id;
      res.cookie('token', result[0].token);
      res.json({ status: 200 });
    }
  });
});

/*
 *  Get Oprator Code
*/

router.post("/getoprator", function (req, res, next) {
  var service = req.body.service;
  var sql = "SELECT * FROM operator_code WHERE service = ? ";
  db.query(sql, [service], function (err, result, fields) {
    if (result.length == 0) {
      res.json({ status: 500 });
    }
    if (result.length == 1) {
      res.json({ status: 200, data: result });
    }
  });
});


/*
* Find Number Detail and oprator
*/

router.post("/detail", function (req, res, next) {
  var url = "http://api.rechapi.com/mob_details.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" +req.body.service;
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    var service= json.data.service;
    var sql = "SELECT * FROM operator_code WHERE service = ? ";
    db.query(sql, [service], function (err, result, fields) {
      res.json({ data: result});
    });
  });
});


module.exports = router;
