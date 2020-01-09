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
var multer  =   require('multer');

var storage = multer.diskStorage(
  {
      destination: 'public/img/',
      filename: function ( req, file, cb ) {
          //req.body is empty... here is where req.body.new_file_name doesn't exists
          cb( null, file.originalname );
      }
  }
);

var upload = multer( { storage: storage } );





/* GET users listing. */


router.get('/', function (req, res, next) {
  var token = req.cookies.token;
  if (token == undefined) {
    res.redirect('/login');
  }
  else {
    var sql = "SELECT * FROM users where id=?";
    db.query(sql, [token], function (err, result) {
        req.session.profile=result[0].profile_pic;
        res.render('users/home',{profile:result[0].profile_pic});        
    });
    
  }
});


/*
* Uprdate profile
*/



router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var img=req.session.profile;
  request.get("http://freedomclub.in/current_user?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.status == 200) {
      console.log(json);
      res.render('users/edit', {
        id: json.username.id,
        username: json.username.first_name,
        email: json.username.email,
        mobile: json.username.username,
        pincode: json.username.pincode,
        country: json.username.country,
        state: json.username.state,
        city: json.username.city,
        address: json.username.address,
        login: "My Account",
        profile:img
      });
    }
  });  
});

router.post('/edit/:id', function (req, res, next) {
   console.log(req.body);
  var id = req.params.id;
  var user = req.body.username;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var pincode = req.body.pincode;
  var country = req.body.country;
  var state = req.body.state;
  var city = req.body.city;
  var address = req.body.address;
  request.post({ url: 'http://www.freedomclub.in/api_update_user/', form: {id:id,username:mobile,email:email,first_name:user,pincode:pincode,country:country,state:state,city:city,address:address} }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
  });
});

router.get('/test', function (req, res, next) {
  res.render('users/test',{img:"about.jpg"});
});

router.post('/test', upload.any(), function (req, res, next) {
  res.render('users/test',{img:req.files[0].filename});
  //res.send(req.files[0].filename);
});

/*
* Get Profile data
/*/
router.get('/profile', function (req, res, next) {
  var uid = req.session.user;
  var img=req.session.profile;
  request.get("http://freedomclub.in/current_user?id=" + uid, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.status == 200) {
      res.render('users/profile', {
        id: json.username.id,
        username: json.username.first_name,
        email: json.username.email,
        mobile: json.username.username,
        pincode: json.username.pincode,
        country: json.username.country,
        state: json.username.state,
        city: json.username.city,
        address: json.username.address,
        login: "My Account",
        profile:img
      });
    }
  });
});




/*
* Profile Update
*/

router.post('/profile', upload.any(), function (req, res, next) {
  var uid =req.session.user;
  var profile=req.files[0].filename;
  var sql = "UPDATE users set profile_pic =? WHERE id = ?";
  db.query(sql, [profile, uid], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      req.session.profile=profile;
      res.redirect('/users/profile');
    }
});
});

/*
* partner page
*/
router.get('/partner', function (req, res, next) {
  var img=req.session.profile;
  res.render('users/partner', { login: "My Account",profile :img});
});


router.post("/partner", function (req, res, next) {
  console.log(req.body);
  request.post({ url: 'http://freedomclub.in/add_new_vendor/', form: { user_id: req.body.user_id, other_no: req.body.mobile_no, vendor_type: req.body.vendor_type, vendor_country: req.body.country, vendor_state: req.body.state, vendor_city: req.body.city, vendor_pincode: req.body.pin_code, vendor_address: req.body.full_address, vendor_panno: req.body.pan_no, vendor_gstno: req.body.gst_no, vendor_category: req.body.industry, vendor_subcategory: req.body.sub_industry, vendor_adharno: req.body.addhar_no, vendor_office_add: "oof", vendor_account_no: req.body.account_no, vendor_bank_name: req.body.bank_name, vendor_asso_name: '', vendor_bank_branch: '', vendor_bank_ifsc: req.body.ifsc_code, vendor_payment_type: req.body.payment_type } }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
  });
  //var sql = "INSERT INTO partner (user_id,vendor_type, mobile_no,company_name,country,state,city,place,pin_code,industry,sub_industry,full_address,pan_no,gst_no,addhar_no,account_no,bank_name,branch,ifsc_code,payment_type) VALUES ( '" +  + "', '" + req.body.mobile_no + "','" + req.body.company_name + +  + "','" + req.body.place +  + req.body.industry + "','" +  +   + "','" +  + "','" +  + "','" +  + "','" + req.body.branch + "','" +  + "','" +  + "')";

});


router.get('/wallet', function (req, res, next) {
  var uid = req.session.user;
  var img=req.session.profile;
  var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      res.render('users/wallet', { TotalAmount: result[0].Amount, login: "My Account",profile:img});
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
  var img=req.session.profile;
  var sql = "SELECT * FROM recharge where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      res.send({
        "code": 400,
        "error": err
      })
    } else {
      res.render('users/recharge', { result: result, login: "My Account",profile:img});
    }
  });
});

router.post("/recharge", function (req, res, next) {
  var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + req.body.mobile + "&amount=" + req.body.amount + "&opid=" + req.body.oprator + "&urid=66C02462A2211022C&opvalue1=#opvalue1&opvalue2=#opvalue2";
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.data.status == "FAILED") {
      // res.send({
      //   "result":json
      // });

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

router.get("/dthrecharge", function (req, res, next) {
  console.log(req.body);
});


router.get("/logout", function (req, res, next) {
  res.clearCookie('token');
  res.redirect("/login");
});


/*
*Listing of user bill
*/

router.get("/bill", function (req, res, next) {
  var img=req.session.profile;
  var url = "http://freedomclub.in/api_tfivgpvlist_byid?id=10 ";
  request.get(url, (error, response, body) => {
          var result=JSON.parse(body);
          var data=result.data;
         res.render('users/bill', { result: data, login: "My Account",profile:img});    
  });
});


/*
*Listing of 10% GPV bill
*/

router.get("/ten_gpvlist", function (req, res, next) {
  var img=req.session.profile;
  var url = "http://freedomclub.in/api_tengpvlist_byid/?id=10 ";
  request.get(url, (error, response, body) => {
          var result=JSON.parse(body);
          var data=result.data;
         res.render('users/ten_gpvlist', { result: data, login: "My Account",profile:img});    
  });
});


/*
*Listing of 20% GPV bill
*/

router.get("/twnty_fivegpvlist", function (req, res, next) {
  var img=req.session.profile;
  var url = "http://freedomclub.in/api_tfivgpvlist_byid?id=10";
  request.get(url, (error, response, body) => {
          var result=JSON.parse(body);
          var data=result.data;
         res.render('users/twnty_fivegpvlist', { result: data, login: "My Account",profile:img});    
  });
});


/*
*Listing of 50% GPV bill
*/

router.get("/fifty_gpvlist", function (req, res, next) {
  var img=req.session.profile;
  var url = "http://freedomclub.in/api_tfifgpvlist_byid?id=10";
  request.get(url, (error, response, body) => {
          var result=JSON.parse(body);
          var data=result.data;
         res.render('users/twnty_fivegpvlist', { result: data, login: "My Account",profile:img});    
  });
});



/*
*Listing of 50% GPV bill
*/

router.get("/hundred_gpvlist", function (req, res, next) {
  var img=req.session.profile;
  var url = "http://freedomclub.in/api_tfifgpvlist_byid?id=10";
  request.get(url, (error, response, body) => {
          var result=JSON.parse(body);
          var data=result.data;
         res.render('users/twnty_fivegpvlist', { result: data, login: "My Account",profile:img});    
  });
});








module.exports = router;
