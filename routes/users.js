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
var multer = require('multer');
var numeral = require('numeral');

var storage = multer.diskStorage(
  {
    destination: 'public/profile/',
    filename: function (req, file, cb) {
      //req.body is empty... here is where req.body.new_file_name doesn't exists
      cb(null, file.originalname);
    }
  }
);

var bill = multer.diskStorage(
  {
    destination: 'public/bill_images/',
    filename: function (req, file, cb) {
      //req.body is empty... here is where req.body.new_file_name doesn't exists
      cb(null, file.originalname);
    }
  }
);

var upload = multer({ storage: storage });

var billupload = multer({ storage: bill });




/* GET users listing. */


router.get('/', function (req, res, next) {
  var token = req.cookies.token;
  console.log(token);
  if (token == undefined) {
    res.redirect('/login');
  }
  else {
    request.get("http://103.90.241.225:5000/current_user?id=" + token, (error, response, body) => {
      if (error) {
        //console.log(error);
        res.redirect('/login');
      } else {
        var json = JSON.parse(body);
        req.session.username = json.username.first_name;
        req.session.usersdata = json.username;
        //console.log(json.username);
        //req.session.usersdata({"username":json.username.first_name});
      }
    });
    var sql = "SELECT * FROM users where user_id=?";
    db.query(sql, [token], function (err, result) {
      if (result.length == 0) {
        var data = {
          "user_id": token,
          "profile_pic": "kaa3.jpg",
          "username": req.session.username
        }
        db.query('INSERT INTO users SET ?', data, function (err, result, fields) {
          if (err) {
            console.log(err);
          }
          else {
            req.session.profile = "avtar.png";
            res.render('users/home', { profile: "kaa3.jpg" });
          }
        });
      }
      if (result.length > 0) {
        request.get("http://103.90.241.225:5000/get_profile/?id=" + token, (error, response, body) => {
          if (error) {
            res.redirect('/login');
          } else {
            var json = JSON.parse(body);
            console.log(json);
            if (json.status == 200) {
              req.session.status = 200;
              req.session.profile = result[0].profile_pic;
              req.session.mid = json.data[0].id;  //merchant id
              req.session.vendor = json.data;
              req.session.vendor_type = json.data[0].vendor_type;
              req.session.pincode = json.data[0].vendor_pincode;
              console.log(req.session.pincode);
              req.session.commission = json.data[0].commission;
              var vid = req.session.vendor_type;
              res.render('users/home', { login: "My Account", profile: result[0].profile_pic, status: 200, vid: vid });
            }
            if (json.status == 500) {
              req.session.status = 500;
              req.session.profile = result[0].profile_pic;
              var vid = req.session.vendor_type;
              res.render('users/home', { login: "My Account", profile: result[0].profile_pic, status: 500, vid: vid });
            }
          }
        });
      }
    });
  }
});


/*
* Uprdate profile
*/



router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;

  request.get("http://103.90.241.225:5000/current_user?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.status == 200) {
      console.log(status);
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
        profile: img,
        vid: vid
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
  request.post({ url: 'http://www.freedomclub.in/api_update_user/', form: { id: id, username: mobile, email: email, first_name: user, pincode: pincode, country: country, state: state, city: city, address: address } }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
  });
});

router.get('/test', function (req, res, next) {
  request.get("http://enterprise.smsgupshup.com/GatewayAPI/rest?msg=Hi&v=1.1&userid=2000175776&password=4H0Uan7Nv&send_to=9616499322&msg_type=text", (error, response, body) => {
    var json = JSON.parse(body);
    console.log(json);
  });


  //res.render('users/test', { img: "about.jpg" });
});

router.post('/test', function (req, res, next) {
  res.render('users/test', { img: req.files[0].filename });
  //res.send(req.files[0].filename);
  //upload.any()
});

/*
* Get Profile data
/*/
router.get('/profile', function (req, res, next) {
  var uid = req.session.user;
  var img = req.session.profile;
  var vid = req.session.vendor_type;
  var status = req.session.status;
  var vendor = req.session.vendor;
  console.log(vendor);
  request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
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
        profile: img,
        status: status,
        vid: vid,
        vendor: vendor
      });
    }
  });
});




/*
* Profile Update
*/

router.post('/profile', upload.any(), function (req, res, next) {
  var uid = req.session.user;
  var profile = req.files[0].filename;
  var sql = "UPDATE users set profile_pic =? WHERE user_id = ?";
  db.query(sql, [profile, uid], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      req.session.profile = profile;
      res.redirect('/users/profile');
    }
  });
});

/*
* partner page
*/
router.get('/partner', function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  request.get("http://103.90.241.225:5000/api_industry_list/", (error, response, body) => {
    var json = JSON.parse(body);
    console.log(json.status);
    if (json.status == 200) {
      data = json.data;
      res.render('users/partner', { login: "My Account", profile: img, data: data, status: status, vid: vid });
    }
    else {
      res.render('users/partner', { login: "My Account", profile: img, status: status, vid: vid });
    }
  });
});


router.post("/partner", function (req, res, next) {
  var uid = req.session.user;
  console.log(req.body.vendor_type);
  console.log(uid);
  if (req.body.vendor_type == 5) {
    var url = 'http://103.90.241.225:5000/add_new_fsp/';
  }
  if (req.body.vendor_type == 6) {
    var url = 'http://103.90.241.225:5000/add_new_fp/';
  }
  if (req.body.vendor_type == 7) {
    var url = 'http://103.90.241.225:5000/add_new_fmp/';
  }
  if (req.body.vendor_type == 8) {
    var url = 'http://103.90.241.225:5000/add_new_vendor/';
  }
  request.post({
    url: url, form: {
      user_id: uid,
      commission: req.body.commission,
      vendor_name: req.body.vendor_name,
      other_no: req.body.mobile_no,
      vendor_type: req.body.vendor_type,
      vendor_country: req.body.country,
      vendor_state: req.body.state,
      vendor_city: req.body.city,
      vendor_pincode: req.body.pin_code,
      vendor_address: req.body.full_address,
      vendor_panno: req.body.pan_no,
      vendor_gstno: req.body.gst_no,
      vendor_category: req.body.vendor_category,
      vendor_subcategory: req.body.vendor_subcategory,
      vendor_sub_of_category: req.body.vendor_sub_of_category,
      vendor_subd_of_category: req.body.vendor_subd_of_category,
      vendor_adharno: req.body.addhar_no,
      vendor_office_add: "oof",
      vendor_account_no: req.body.vendor_account_no,
      vendor_bank_name: req.body.vendor_bank_name,
      vendor_asso_name: req.body.vendor_asso_name,
      vendor_bank_branch: req.body.vendor_bank_branch,
      vendor_bank_ifsc: req.body.vendor_bank_ifsc,
      vendor_payment_type: req.body.payment_type
    }
  }, function (err, httpResponse, body) {
    if (err) {

    } else {
      var json = JSON.parse(body);
      console.log(json);
      res.redirect('/users');
    }
  });
  //var sql = "INSERT INTO partner (user_id,vendor_type, mobile_no,company_name,country,state,city,place,pin_code,industry,sub_industry,full_address,pan_no,gst_no,addhar_no,account_no,bank_name,branch,ifsc_code,payment_type) VALUES ( '" +  + "', '" + req.body.mobile_no + "','" + req.body.company_name + +  + "','" + req.body.place +  + req.body.industry + "','" +  +   + "','" +  + "','" +  + "','" +  + "','" + req.body.branch + "','" +  + "','" +  + "')";

});

/*
* get Commision 
*/

router.post("/GetCommision", function (req, res, next) {
  var id = req.body.id;
  request.get("http://103.90.241.225:5000/api_by_id_industry_list/?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    res.json({ "data": json.data });
  });
});


/*
* get second commesion
*/

router.post("/GetSecondCommision", function (req, res, next) {
  var id = req.body.id;
  request.get("http://103.90.241.225:5000/api_by_id_subindustry_list/?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    res.json({ "data": json.data });
  });
});


/*
* get third commesion
*/

router.post("/GetthirdCommision", function (req, res, next) {
  var id = req.body.id;
  request.get("http://103.90.241.225:5000/api_by_id_subfindustry_list/?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    res.json({ "data": json.data });
  });
});

/*
* get fourth commesion
*/

router.post("/GetfourCommision", function (req, res, next) {
  var id = req.body.id;
  request.get("http://103.90.241.225:5000/api_by_id_subffindustry_list?id=" + id, (error, response, body) => {
    var json = JSON.parse(body);
    res.json({ "data": json.data });
  });
});


router.get('/wallet', function (req, res, next) {
  var uid = req.session.user;
  var img = req.session.profile;
  var vid = req.session.vendor_type;
  var status = req.session.status;
  var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      res.render('users/wallet', { TotalAmount: result[0].Amount, login: "My Account", profile: img, status: status, vid: vid });
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
  var img = req.session.profile;
  var vid = req.session.vendor_type;
  var status = req.session.status;
  var sql = "SELECT * FROM recharge where user_id=?";
  db.query(sql, [uid], function (err, result) {
    if (err) {
      res.send({
        "code": 400,
        "error": err
      })
    } else {
      res.render('users/recharge', { result: result, login: "My Account", profile: img, status: status, vid: vid });
    }
  });
});

router.post("/recharge", function (req, res, next) {
  req.session.Rno = req.body.mobile;
  req.session.Ramount = req.body.amount;
  req.session.Roprator = req.body.oprator;
  req.session.Rtype = req.body.r_type;
  req.session.Rrecharge = req.body.rechage_type;
  res.send({ "status": 200 });
});

router.get("/dthrecharge", function (req, res, next) {
  console.log(req.body);
});




/*
*Listing of user bill
*/

// router.get("/bill", function (req, res, next) {
//   var img = req.session.profile;
//   var uid = req.session.user;
//   var url = "http://103.90.241.225:5000/api_tfivgpvlist_byid?id=" + uid;
//   request.get(url, (error, response, body) => {
//     var result = JSON.parse(body);
//     var data = result.data;
//     res.render('users/bill', { result: data, login: "My Account", profile: img });
//   });
// });


/*
*Listing of 10% GPV bill
*/

router.get("/ten_gpvlist", function (req, res, next) {
  var img = req.session.profile;
  var uid = req.session.user;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var url = "http://103.90.241.225:5000/api_tengpvlist_byid/?id=" + uid;
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render('users/ten_gpvlist', { result: data, login: "My Account", profile: img, status: status, vid: vid });
  });
});


/*
*Listing of 20% GPV bill
*/

router.get("/twnty_fivegpvlist", function (req, res, next) {
  var img = req.session.profile;
  var uid = req.session.user;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var url = "http://103.90.241.225:5000/api_tfivgpvlist_byid?id=" + uid;
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render('users/twnty_fivegpvlist', { result: data, login: "My Account", profile: img, status: status, vid: vid });
  });
});


/*
*Listing of 50% GPV bill
*/


router.get("/fifty_gpvlist", function (req, res, next) {
  var img = req.session.profile;
  var uid = req.session.user;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var url = "http://103.90.241.225:5000/api_tfifgpvlist_byid?id=" + uid;
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render('users/twnty_fivegpvlist', { result: data, login: "My Account", profile: img, status: status, vid: vid });
  });
});



/*
*Listing of 50% GPV bill
*/

router.get("/hundred_gpvlist", function (req, res, next) {
  var img = req.session.profile;
  var uid = req.session.user;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var url = "http://103.90.241.225:5000/api_tfifgpvlist_byid?id=" + uid;
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render('users/twnty_fivegpvlist', { result: data, login: "My Account", profile: img, status: status, vid: vid });
  });
});


/*
* Get subcategory list
*/

router.post("/getsubcategory", function (req, res, next) {
  var id = req.body.id;
  var url = "http://103.90.241.225:5000/api_subindustry?cat_id=" + id;
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.json({ "data": data });
  });
});

/*
*Get Sub Industry
*/

router.post("/getsubindustry", function (req, res, next) {
  var id = req.body.id;
  // console.log(id);
  var url = "http://103.90.241.225:5000/api_subfindustry?cat_id=" + id
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    //console.log(result);
    var data = result.data;
    res.json({ "data": data });
  });
});

/*
*Get last id
*/

router.post("/getlastindustry", function (req, res, next) {
  var id = req.body.id;
  //console.log(id);
  var url = "http://103.90.241.225:5000/api_subffindustry?cat_id=" + id
  request.get(url, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.json({ "data": data });
  });
});

/*
*Upload Bill
*/

router.get("/upload", function (req, res, next) {
  var img = req.session.profile;
  var uid = req.session.user;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
    var result = JSON.parse(body);
    var pin = result.username.pincode;
    console.log(pin);
    getpin(pin);
  });
  function getpin(pin) {
    console.log(pin);
    var url = "http://103.90.241.225:5000/get_merchant_list/";
    request.get(url, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.data;
      console.log(data);
      res.render('users/upload', { login: "My Account", profile: img, results: data, pincode: pin, message: "", status: status, vid: vid });
    });
  }
});



router.post("/upload", billupload.any(), function (req, res, next) {
  var uid = req.session.user;
  var profile = req.files[0].filename;
  var img = req.session.profile;
  var mid = req.body.merchant_id;
  var amount = req.body.amount;
  var pincode = req.body.pincode;
  request.post({ url: 'http://103.90.241.225:5000/admin_add_bill/', form: { user_id: uid, merchant_id: mid, ugpv: amount, myfile: profile, pincode: pincode } }, function (err, httpResponse, body) {
    var result = JSON.parse(body);
    console.log(result);
    if (result.status == 200) {
      res.redirect("/users/my_bill");
    }
  });
});

/*
*Get User Bill
*/
router.get("/bill_list", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var mid = req.session.mid;
  var vid = req.session.vendor_type;
  var cm = req.session.commission;
  var myNumeral2 = numeral(cm);
  var pincode = req.session.pincode;
  request.get("http://103.90.241.225:5000/get_mybill_list/?id=" + mid, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    if (result.status == 200) {
      res.render('users/my_bill_list', { login: "My Account", profile: img, status: 200, results: data, vid: vid, cm: myNumeral2, pincode: pincode });
    }
    if (result.status == 500) {
      res.render('users/my_bill_list', { login: "My Account", profile: img, status: 500, results: data, vid: vid, pincode: pincode });
    }
  });
});

/*
* Approved Bill by admin
*/

router.post("/approved", function (req, res, next) {
  var id = req.body.id;
  var uid = req.body.uid;
  var gpv = req.body.gpv;
  var pincode = req.body.pincode;
  var mid = req.session.mid;
  console.log(id);
  console.log(uid);
  console.log(gpv);
  console.log(pincode);

  request.get("http://103.90.241.225:5000/admin_change_status/?id=" + id + "&user_id=" + uid + "&ugpv=" + gpv + "&pincode=" + pincode + "&mid=" + mid, (error, response, body) => {
    var result = JSON.parse(body);
    console.log(result);
    res.json({ "data": result });
  });
});

/*
*Get Commesion List
*/

router.get("/commision", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var pincode = req.session.pincode;
  var vid = req.session.vendor_type;
  res.render('users/commision', { login: "My Account", status: status, profile: img, pincode: pincode, vid: vid });
});

router.post("/commision", function (req, res, next) {
  var pin = req.body.pincode;
  var month = req.body.month;
  var mid = req.session.mid;
  request.get("http://103.90.241.225:5000/get_commission_list?pincode=" + pin + "&month=" + month + "&merchant_id=" + mid, (error, response, body) => {
    var result = JSON.parse(body);
    console.log(result);
    var cm = req.session.commission;
    var myNumeral2 = numeral(cm);
    if (result.status == 200) {
      var money = 1000 * (result.data.ugpv__sum);
      var num = myNumeral2._value;
      var total = (money * num);
      console.log(total);
      res.json({ "data": total });
    }
    else {
      res.json({ "data": "No Commisions" });
    }
  });
});


router.get("/my_bill", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = req.cookies.token;
  request.get("http://103.90.241.225:5000/api_bill_list/?id=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render("users/my_bill", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* user listing
*/
router.get("/userlisting", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = 123456;
  request.get("http://103.90.241.225:5000/my_users/?pincode=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(result);
    res.render("users/userlisting", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* user merchant profile
*/
router.get("/merchant", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = req.cookies.token;
  request.get("http://103.90.241.225:5000/get_profile/?id=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data[0].vendor_name);
    res.render("users/merchant", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* My Gpv list
*/

router.get("/my_gpvlist", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = req.cookies.token;
  request.get("http://103.90.241.225:5000/my_gpv_list/?id=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    // console.log(data[0].vendor_name);
    res.render("users/my_gpvlist", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* Merchant List
*/
router.get("/merchantlisting", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var id = req.session.mid;
  request.get("http://103.90.241.225:5000/get_fmp_api/?uid=" + id, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    // console.log(data[0].vendor_name);
    res.render("users/merchant_list", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});


/*
*Get Fp List
*/

router.get("/fplist", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var id = req.session.mid;
  request.get("http://103.90.241.225:5000/get_fp_api/?uid=" + id, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    // console.log(data[0].vendor_name);
    res.render("users/merchant_list", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* get fmplist
*/
router.get("/fmplist", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var id = req.session.mid;
  request.get("http://103.90.241.225:5000/get_fmp_api/?uid=" + id, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    // console.log(data[0].vendor_name);
    res.render("users/merchant_list", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
*get fsp list
*/

router.get("/fsplist", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var id = req.session.mid;
  request.get("http://103.90.241.225:5000/get_fsp_api/?uid=" + id, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    // console.log(data[0].vendor_name);
    res.render("users/merchant_list", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});

/*
* Fmp comminsion
*/

router.get("/fmpcommision", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var pincode = req.session.pincode;
  var vid = req.session.vendor_type;
  res.render('users/fmpcommision', { login: "My Account", status: status, profile: img, pincode: pincode, vid: vid });
});


router.post("/fmpcommision", function (req, res, next) {
  var pin = req.body.pincode;
  var month = req.body.month;
  request.get("http://103.90.241.225:5000/get_fmpcommission?pincode=" + pin + "&month=" + month, (error, response, body) => {
    var result = JSON.parse(body);
    if (result.status == 200) {
      res.json({ "data": result });
    }
    else {
      res.json({ "data": "No Commisions" });
    }
  });
});

/*
*un approved bill
*/

router.get("/unapproved_bill", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = req.cookies.token;
  request.get("http://103.90.241.225:5000/get_unapprove_list/?id=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    res.render("users/my_bill", { login: "My Account", status: status, profile: img, vid: vid, results: data });
  });
});


router.get("/total_money", function (req, res, next) {
  var img = req.session.profile;
  var status = req.session.status;
  var vid = req.session.vendor_type;
  var token = req.cookies.token;
  request.get("http://103.90.241.225:5000/get_user_income/?uid=" + token, (error, response, body) => {
    var result = JSON.parse(body);
    var data = result.data;
    console.log(data);
    if (result.status == 200) {
      res.render("users/total_money", { login: "My Account", status: status, profile: img, vid: vid, results: data });
    }
    if (data.status === 500) {
      res.render("users/total_money", { login: "My Account", status: status, profile: img, vid: vid, results: "" });
    }
  });
});

module.exports = router;
