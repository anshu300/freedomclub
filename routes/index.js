var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var uid = require('rand-token').uid;
var app = express();
var request = require("request");
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var app = express();
var uniqid = require('uniqid');
/* GET home page. */

var mobile = function (req, res, next) {
  var sql = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sql, [66], function (err, result, fields) {
    return result;
    nest();
  });
};




router.get('/', function (req, res, next) {
  var token = req.cookies.token;
  console.log(token);
  if (token == undefined) {
    res.render('index', { user: 0, login: "Login" });
  } else {
    request.get("http://103.90.241.225:5000/current_user?id=" + token, (error, response, body) => {
      var json = JSON.parse(body);
      console.log(json);
      if (json.status == 200) {
        req.session.user = json.username.id;
        req.session.usersdata = json.username;
        res.render('index', { user: 1, login: "My Account" });
      }
      if (json.status == 500) {
        res.render('index', { user: 0, login: "Login" });
      }
    });
  }
});


router.get('/register', function (req, res, next) {
  var token = uid(16);
  res.render('register', { token: token });
});

router.post('/register', function (req, res, next) {
  console.log(req.body);
  request.post({ url: 'http://103.90.241.225:5000/create_user/', form: { username: req.body.username, first_name:req.body.first_name, password: req.body.password ,email: req.body.email} }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
    if (json.status == 200) {     
       res.json({ status:200,otp:json.otp});
    }
    if (json.status == 500) {
      res.json({ status: 500});      
    }
  });
});

/*
*  Ajax Login Code
*/

router.post("/ajaxlogin", function (req, res, next) {
  var mobile = req.body.mobile;
  var pass = req.body.password;
  request.post({ url: 'http://103.90.241.225:5000/login/', form: { username: req.body.mobile, password: req.body.password } }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
    if (json.status == 200) {
      req.session.user = json.username;
      res.cookie('token', json.username);
      res.json({ status: 200 });
    }
    if (json.status == 500) {
      res.json({ status: 500 });
      res.render('login');
    }
  });
});

/*
*opt varify
*/

router.post("/opt",function(req,res,next){
  request.post({ url: 'http://103.90.241.225:5000/verify_otp/', form: { one_otp: req.body.otp}}, function (err, httpResponse, body) {
    var json = JSON.parse(body);
   if(json.status==200){
     res.send({"status":200});
   }else {
    res.send({"status":500});
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
  var num = req.body.service;
  var url = "http://api.rechapi.com/mob_details.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + num;
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    console.log(json);
    if (json.data.error_code == 200) {
      var service = json.data.service;
      var sql = "SELECT * FROM operator_code WHERE service = ? ";
      db.query(sql, [service], function (err, result, fields) {
        res.json({ data: result });
      });
    } else {
      res.json({ status: 500, "num": num });
    }
  });
});


router.get("/logout", function (req, res, next) {
  res.clearCookie('token');
  req.session = null;
  res.redirect("/login");
});



router.get('/login', function (req, res, next) {
  req.flash('message', "hello");
  res.render('login');
});

router.post('/login', function (req, res, next) {
  var mobile = req.body.mobile;
  var pass = req.body.password;
  request.post({ url: 'http://103.90.241.225:5000/login/', form: { username: req.body.mobile, password: req.body.password } }, function (err, httpResponse, body) {
    var json = JSON.parse(body);
    console.log(json);
    if (json.status == 200) {
      req.session.user = json.username;
      res.cookie('token', json.username);
      res.redirect('/users');
    }
    if (json.status == 500) {
      req.flash('message', json.msg);
      res.render('login');
    }
  });
});

/*
*Get Mobile
*/

router.get("/getmobile", function (req, res, next) {
  var sql = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sql, [66], function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ "status": err });
    } else {
      res.send({ "data": result });
    }
  });
});



/*
*Get Fashion
*/

router.get("/getfashion", function (req, res, next) {
  var sql = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sql, [69], function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ "status": err });
    } else {
      res.send({ "data": result });
    }
  });
});


/*
*Get Home and kitech
*/

router.get("/homekitchen", function (req, res, next) {
  var sql = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sql, [26], function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ "status": err });
    } else {
      res.send({ "data": result });
    }
  });
});

/*
*Get books 
*/

router.get("/books", function (req, res, next) {
  var sql = "SELECT * FROM products WHERE category_id = ? ";
  db.query(sql, [9], function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ "status": err });
    } else {
      res.send({ "data": result });
    }
  });
});



// router.get("/recharge", function (req, res, next) {
//   var uid = req.session.user;
//   if (uid == undefined) {
//     res.render('recharge', { user: 1, login: "Login" });
//   } else {
//     res.render('recharge', { user: 1, login: "My Account" });
//   }
// });



router.get("/services", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('services', { user: 1, login: "Login" });
  } else {
    res.render('services', { user: 1, login: "My Account" });
  }
});

/*
*Select Oprator
*/
router.get("/operator", function (req, res, next) {
  var sql = "SELECT * FROM operator_code ";
  db.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ "status": err });
    } else {
      res.send({ "data": result });
    }
  });
});

/*
*About page
*/

router.get("/about", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('about', { user: 1, login: "Login" });
  } else {
    res.render('about', { user: 1, login: "My Account" });
  }
});

/*
*team
*/

router.get("/team", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('team', { user: 1, login: "Login" });
  } else {
    res.render('team', { user: 1, login: "My Account" });
  }
});


/*
*Commooing soon
*/
router.get("/comming-soon", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('comming-soon', { user: 1, login: "Login" });
  } else {
    res.render('comming-soon', { user: 1, login: "My Account" });
  }
});

/*
*Contact page
*/

router.get("/contact", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('contact', { user: 1, login: "Login" });
  } else {
    res.render('contact', { user: 1, login: "My Account" });
  }
});

/*
*term
*/

router.get("/term", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('term', { user: 1, login: "Login" });
  } else {
    res.render('term', { user: 1, login: "My Account" });
  }

});


/*
*How it work page
*/

router.get("/how-it-work", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('how-it-work', { user: 1, login: "Login" });
  } else {
    res.render('how-it-work', { user: 1, login: "My Account" });
  }
});


/*
*How it work page
*/

router.get("/mission", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('mission', { user: 1, login: "Login" });
  } else {
    res.render('mission', { user: 1, login: "My Account" });
  }
});


/*
*How it work page
*/

router.get("/mission", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('mission', { user: 1, login: "Login" });
  } else {
    res.render('mission', { user: 1, login: "My Account" });
  }

});

/*
*privacy and policy
*/

router.get("/privacy-policy", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('privacy', { user: 1, login: "Login" });
  } else {
    res.render('privacy', { user: 1, login: "My Account" });
  }
});

/*
*faq
*/

router.get("/faq", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('faq', { user: 1, login: "Login" });
  } else {
    res.render('faq', { user: 1, login: "My Account" });
  }

});


/*
*disclaimer
*/

router.get("/disclaimer", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('disclaimer', { user: 1, login: "Login" });
  } else {
    res.render('disclaimer', { user: 1, login: "My Account" });
  }
});

/*
*disclaimer claim and refund
*/

router.get("/advertise", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('advertise', { user: 1, login: "Login" });
  } else {
    res.render('advertise', { user: 1, login: "My Account" });
  }
});

/*
*claim and refund
*/
router.get("/claim-refund", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('claim', { user: 1, login: "Login" });
  } else {
    res.render('claim', { user: 1, login: "My Account" });
  }
});


/*
*claim and career
*/
router.get("/career", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('career', { user: 1, login: "Login" });
  } else {
    res.render('career', { user: 1, login: "My Account" });
  }
});



/*
*claim and career
*/
router.get("/franchise", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('franchise', { user: 1, login: "Login" });
  } else {
    res.render('franchise', { user: 1, login: "My Account" });
  }
});


/*
*claim and career
*/
router.get("/other-services", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('other_services', { user: 1, login: "Login" });
  } else {
    res.render('other_services', { user: 1, login: "My Account" });
  }
});


/*
*claim and career
*/
router.get("/forgot", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('forgate', { user: 1, login: "Login" });
  } else {
    res.render('forgate', { user: 1, login: "My Account" });
  }
});

/*
*affiliates
*/

router.get("/affiliates", function (req, res, next) {
  var uid = req.session.user;
  if (uid == undefined) {
    res.render('affiliates', { user: 1, login: "Login" });
  } else {
    res.render('affiliates', { user: 1, login: "My Account" });
  }
});

/*
*merchant
*/
router.get("/merchant", function (req, res, next) {
  var uid = req.session.user;
  console.log(uid);
  if (uid == undefined) {
    res.render('merchant', { user: 1, login: "Login" });
  } else {
    res.render('merchant', { user: 1, login: "My Account" });
  }
});

/*
*merchant
*/
router.get("/recharge", function (req, res, next) {
  var uid = req.session.user;
  console.log(uid);
  if (uid == undefined) {
    res.render('recharge', { user: 1, login: "Login" });
  } else {
    res.render('recharge', { user: 1, login: "My Account" });
  }
});

/*
*Send Vallet Integration
*/

router.get("/sendData", function (req, res, next) {
  res.render('payment', { user: 1, login: "My Account" });
});


router.post('/sendData', (req, res) => {
  let merchant_key = req.body.merchant_key;
  let merchant_id = req.body.merchant_id;
  let aggregator_id = 'paygate';

  let return_elements = {};
  return_elements.me_id = merchant_id;
  let txn_details = aggregator_id + '|' + merchant_id.toString() + '|' + req.body.order_no.toString() + '|' + req.body.amount.toString() + '|' + req.body.country + '|' + req.body.currency + '|' + req.body.txn_type + '|' + req.body.success_url + '|' + req.body.failure_url + '|' + req.body.channel;
  //console.log(merchant_key);
  return_elements.txn_details = encode(txn_details.toString().trim(), merchant_key.toString());

  let pg_details = req.body.pg_id + '|' + req.body.paymode + '|' + req.body.scheme + '|' + req.body.emi_months;
  return_elements.pg_details = encode(pg_details, merchant_key);

  let card_details = req.body.card_no + '|' + req.body.exp_month + '|' + req.body.exp_year + '|' + req.body.cvv2 + '|' + req.body.card_name;
  return_elements.card_details = encode(card_details, merchant_key);

  let cust_details = req.body.cust_name + '|' + req.body.email_id + '|' + req.body.mobile_no + '|' + req.body.unique_id + '|' + req.body.is_logged_in;
  return_elements.cust_details = encode(cust_details, merchant_key);

  let bill_details = req.body.bill_address + '|' + req.body.bill_city + '|' + req.body.bill_state +
    '|' + req.body.bill_country + '|' + req.body.bill_zip;
  return_elements.bill_details = encode(bill_details, merchant_key);

  let ship_details = req.body.ship_address + '|' + req.body.ship_city + '|' + req.body.ship_state + '|'
    + req.body.ship_country + '|' + req.body.ship_zip + '|' + req.body.ship_days + '|' + req.body.address_count;
  return_elements.ship_details = encode(ship_details, merchant_key);
  let item_details = req.body.item_count + '|' + req.body.item_value + '|' + req.body.item_category;
  return_elements.item_details = encode(item_details, merchant_key);
  let other_details = req.body.udf_1 + '|' + req.body.udf_2 + '|' + req.body.udf_3 + '|' + req.body.udf_4 +
    '|' + req.body.udf_5;
  return_elements.other_details = encode(other_details, merchant_key);
  //console.log(return_elements);
  res.render('sendData', { results: return_elements });
});

router.post('/response', (req, res,next) => {
  var token = req.cookies.token;
  console.log(token);
  let return_elements = {};
  let merchant_key = "oqUl4D0LqA4plZw4reAX/K3UKJoQdet0k/N6X6K4Y5k=";
  let txn_response1 = req.body.txn_response ? req.body.txn_response : '';
  txn_response1 = decrypt(txn_response1, merchant_key);
  let txn_response_arr = txn_response1.split('|');
  let txn_response = {};
  txn_response.ag_id = txn_response_arr[0] ? txn_response_arr[0] : '';
  txn_response.me_id = txn_response_arr[1] ? txn_response_arr[1] : '';
  txn_response.order_no = txn_response_arr[2] ? txn_response_arr[2] : '';
  txn_response.amount = txn_response_arr[3] ? txn_response_arr[3] : '';
  txn_response.country = txn_response_arr[4] ? txn_response_arr[4] : '';
  txn_response.currency = txn_response_arr[5] ? txn_response_arr[5] : '';
  txn_response.txn_date = txn_response_arr[6] ? txn_response_arr[6] : '';
  txn_response.txn_time = txn_response_arr[7] ? txn_response_arr[7] : '';
  txn_response.ag_ref = txn_response_arr[8] ? txn_response_arr[8] : '';
  txn_response.pg_ref = txn_response_arr[9] ? txn_response_arr[9] : '';
  txn_response.status = txn_response_arr[10] ? txn_response_arr[10] : '';
  //txn_response.txn_type = txn_response_arr[11]?txn_response_arr[11]:'';
  txn_response.res_code = txn_response_arr[11] ? txn_response_arr[11] : '';
  txn_response.res_message = txn_response_arr[12] ? txn_response_arr[12] : '';

  return_elements.txn_response = txn_response;

  let pg_details1 = req.body.pg_details ? req.body.pg_details : '';
  pg_details1 = decrypt(pg_details1, merchant_key);
  let pg_details_arr = pg_details1.split('|');
  let pg_details = {};
  pg_details.pg_id = pg_details_arr[0] ? pg_details_arr[0] : '';
  pg_details.pg_name = pg_details_arr[1] ? pg_details_arr[1] : '';
  pg_details.paymode = pg_details_arr[2] ? pg_details_arr[2] : '';
  pg_details.emi_months = pg_details_arr[3] ? pg_details_arr[3] : '';

  return_elements.pg_details = pg_details;

  let fraud_details1 = req.body.fraud_details ? req.body.fraud_details : '';
  fraud_details1 = decrypt(fraud_details1, merchant_key);
  let fraud_details_arr = fraud_details1.split('|');
  let fraud_details = {};
  fraud_details.fraud_action = fraud_details_arr[0] ? fraud_details_arr[0] : '';
  fraud_details.fraud_message = fraud_details_arr[1] ? fraud_details_arr[1] : '';
  fraud_details.score = fraud_details_arr[0] ? fraud_details_arr[0] : '';

  return_elements.fraud_details = fraud_details;

  let other_details1 = req.body.other_details ? req.body.other_details : '';
  other_details1 = decrypt(other_details1, merchant_key);
  let other_details_arr = other_details1.split('|');
  let other_details = {};
  other_details.udf_1 = other_details_arr[0] ? other_details_arr[0] : '';
  other_details.udf_2 = other_details_arr[1] ? other_details_arr[1] : '';
  other_details.udf_3 = other_details_arr[2] ? other_details_arr[2] : '';
  other_details.udf_4 = other_details_arr[3] ? other_details_arr[3] : '';
  other_details.udf_5 = other_details_arr[4] ? other_details_arr[4] : '';
  return_elements.other_details = other_details;
  
  console.log(token);

  var data = {
    "user_id": token,   
    "order_no": return_elements.txn_response.order_no,
    "deposit": return_elements.txn_response.amount,
    "status": return_elements.txn_response.status,
    "txn_date": return_elements.txn_response.txn_date,
    "txn_time": return_elements.txn_response.txn_time,
    "status": return_elements.txn_response.status,
    "transaction_ag":return_elements.txn_response.ag_ref
  }
  db.query('INSERT INTO  wallet SET ?', data, function (err, results, fields) {
     if(err){
      console.log(err);
     }else {
       var rtype=req.session.Rrecharge;
       console.log(rtype);
      //  if(rtype=="mobile"){
      //     res.redirect("/recharge/mobile-payment");
      //  }
       if(rtype=="DTH"){
        res.redirect("/recharge/dth-payment");
      }
      if(rtype=="GAS"){
        res.redirect("/recharge/gas");
      }
     
     // res.status(200).redirect("/recharge/mobile", { results: return_elements.txn_response.status});
     }    
  }); 
});


function encode(text, skey) {
  var base64Iv = "0123456789abcdef";  // generate your key
  var key = CryptoJS.enc.Base64.parse(skey);
  var iv = CryptoJS.enc.Utf8.parse(base64Iv);
  var encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedData = encrypted.toString();
  return decryptedData;
}


function decrypt(text, skey) {
  var base64Iv = "0123456789abcdef";
  var key = CryptoJS.enc.Base64.parse(skey);
  var iv = CryptoJS.enc.Utf8.parse(base64Iv);
  var decrypted = CryptoJS.AES.decrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

/*
* Mobile Rechage data
*/

router.get("/recharge-payment", function (req, res, next) {
  var uid = req.session.user;
  var amount = req.session.Ramount;
  var unqid = uniqid();
  if (uid == undefined) {
  } else {
    var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?;SELECT SUM(amount) as Ramount FROM recharge where user_id=?";
    db.query(sql, [uid, uid], function (err, result) {
      if (err) {

      } else {
        var amu = result[0][0].Amount;
        var ramu = result[1][0].Ramount;
        var total = parseInt(amu) - parseInt(ramu);
        request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
          var json = JSON.parse(body);
          var data = json.username;
          res.render('recharge_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
        });
      }
    });
  }
});

router.post("/recharge-payment", function (req, res, next) {
  var mobile = req.session.Rno;
  var amount = req.session.Ramount;
  var oprator = req.session.Roprator;
  var r_type = req.session.Rtype;
  var rechage_type = req.session.Rrecharge;
  var unqid = uniqid();
  var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=#opvalue1&opvalue2=#opvalue2";
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    if (json.data.status == "FAILED") {
    }
    else {
      console.log(req.session.user);
      var recharge = {
        "user_id": req.session.user,
        "recharge_type": rechage_type,
        "sim_type": r_type,
        "mobile_no": mobile,
        "oprator": oprator,
        "amount": amount,
        "uniqid": unqid,
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


router.get("/payment", function (req, res, next) {
  var uid = req.session.user;
  var unqid = uniqid();
  if (uid == undefined) {
    request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
      var json = JSON.parse(body);
      var data = json.username;
      res.render('payment', { user: 1, login: "Login", "uniqid": unqid });
    });
  } else {
    request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
      var json = JSON.parse(body);
      var data = json.username;
      res.render('payment', { user: 1, login: "My Account", "uniqid": unqid, result: data });
    });
  }
});

router.get("/me", function (req, res, next) {
  var data = {
    txn_response: {
      ag_id: "paygate", me_id: "201710270001", order_no: "89977", amount: "10.00", country: "IND",
      currency: "INR",
      txn_date: "2018-05-22",
      txn_time: "10:25:40.0",
      ag_ref: "10998789465914245120",
      pg_ref: "0",
      status: "Failed",
      res_code: "00036",
      res_message: "Merchant fee is equal to or greater than transaction amount."
    },
    pg_details: {
      pg_id: "4",
      pg_name: "Yes Bank PG",
      paymode: "CC",
      emi_months: ""
    },
    fraud_details: {
      fraud_action: "",
      fraud_message: "",
      score: ""
    },
    other_details: {
      udf_1: "",
      udf_2: "",
      udf_3: "",
      udf_4: "",
      udf_5: ""
    }
  }
  res.send(data.txn_response.ag_id);
});







module.exports = router;
