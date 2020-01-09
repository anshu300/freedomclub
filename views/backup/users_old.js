var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var uniqid = require('uniqid');
var formidable = require('formidable');
var moment = require('moment');
var fs = require('fs');
var app = express();
var path = require('path');
var request = require("request");
/* GET users listing. */


router.get('/', function (req, res, next) {
  var token = req.cookies.token;
  if (token == undefined) {
    res.redirect('/login');
  }
  else {
    res.render('users/home');
  }

});


router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], function (err, result) {
    if (err) {
      throw err;
    } else {
      res.render('users/edit', {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
        password: result[0].password,
        mobile: result[0].mobile,
        address: result[0].address,
        login: "My Account"
      });
    }
  });
});

router.post('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var user = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var sql = "UPDATE users set username =? , email =?, password=?, mobile= ? ,address=? WHERE id = ?";
  db.query(sql, [user, email, pass, mobile, address, id], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      //console.log(result);
      res.redirect('/users/profile');
    }
  });
});

router.get('/test', function (req, res, next) {
  console.log(__dirname + '/public/images/');
  res.render('users/test');
});

router.post('/test', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    console.log(oldpath);
    // var newpath = '/images/' + files.filetoupload.name;
    var newpath = __dirname + '/public/img/' + files.filetoupload.name;
    console.log(newpath);
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
});


router.get('/profile', function (req, res, next) {
  var uid = req.session.user;
  request.get("http://freedomclub.in/current_user?id="+uid,(error, response, body) =>{
    var json = JSON.parse(body);
    if(json.status==200){
      res.render('users/profile', {
        id: json.username.id,
        username: json.username.first_name,
        password: json.username.password,
        email:json.username.email,
        mobile: json.username.username,
        address: json.username.address,
        login: "My Account"
      });      
    }
  });
});

router.get('/partner', function (req, res, next) {
  res.render('users/partner', { login: "My Account" });
});


router.post("/partner", function (req, res, next) {
  var sql = "INSERT INTO partner (user_id,vendor_type, mobile_no,company_name,country,state,city,place,pin_code,industry,sub_industry,full_address,pan_no,gst_no,addhar_no,account_no,bank_name,branch,ifsc_code,payment_type) VALUES ('" + req.body.user_id + "', '" + req.body.vendor_type + "', '" + req.body.mobile_no + "','" + req.body.company_name + "','" + req.body.country + "','" + req.body.state + "','" + req.body.city + "','" + req.body.place + "','" + req.body.pin_code + "','" + req.body.industry + "','" + req.body.sub_industry + "','" + req.body.full_address + "','" + req.body.pan_no + "','" + req.body.gst_no + "','" + req.body.addhar_no + "','" + req.body.account_no + "','" + req.body.bank_name + "','" + req.body.branch + "','" + req.body.ifsc_code + "','" + req.body.payment_type + "')";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send("save data");
    }
  });
});


router.get('/wallet', function (req, res, next) {
  var uid = req.session.user;
  var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      res.render('users/wallet', { TotalAmount: result[0].Amount, login: "My Account" });
    }
  });
});

router.post('/wallet', function (req, res, next) {
  console.log(req.session.user);
  var deposit = {
    "user_id": req.session.user,
    "deposit": req.body.deposit,
    "txn_id": uniqid.process(),
  }
  db.query('INSERT INTO wallet SET ?', deposit, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      res.send({
        "code": 200,
        "success": "Add Amount sucessfully",
        "amount": req.body.deposit
      });
    }
  });
});

// ==========================Rechage Code Her  =================================//

router.get("/recharge", function (req, res, next) {
  var uid = req.session.user;
  var sql = "SELECT * FROM recharge where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      res.send({
        "code": 400,
        "error": err
      })
    } else {
      res.render('users/recharge', { result: result, login: "My Account" });
    }
  });
});

router.post("/recharge", function (req, res, next) {
  var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + req.body.mobile + "&amount=" + req.body.amount + "&opid=" + req.body.oprator + "&urid=66C02462A2211022C&opvalue1=#opvalue1&opvalue2=#opvalue2";
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.data.status == "FAILED") {
        res.send({
          "result":json
        });
    }
    else {
      var recharge = {
        "user_id": req.session.user,
        "recharge_type": req.body.rechage_type,
        "sim_type": req.body.r_type,
        "mobile_no": req.body.mobile,
        "oprator": req.body.oprator,
        "amount": req.body.amount,
        "status": "success",
      }
      db.query('INSERT INTO recharge SET ?', recharge, function (error, results, fields) {
        if (error) {
          console.log("error ocurred", error);
          res.send({
            "code": 400,
            "failed": "error ocurred",
            "error": error
          })
        } else {
          res.send({
            "code": 200,
            "success": "Add Amount sucessfully",
            "result": results
          });
        }
      });
    }
  });
});

router.get("/dthrecharge",function(req, res, next){
    console.log(req.body); 
});


router.get("/logout", function (req, res, next) {
  res.clearCookie('token');
  res.redirect("/login");
});












module.exports = router;
