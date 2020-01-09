var express = require('express');
var router = express.Router();
var request = require("request");
var db = require('../dbconnection');
var multer = require('multer');
var slugify = require('slugify');
var request = require("request");

router.get('/', function (req, res, next) {
      var uid = req.session.user;
      var img = req.session.profile;
      var status=req.session.status;
      db.query("SELECT * FROM products where user_id=?", [uid], function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            } else {
                  res.render('products/my_product', { login: "My Account", profile: img, result: results,status:status});
            }
      });
});

var storage = multer.diskStorage(
      {
            destination: 'public/product_img/gallery/',
            filename: function (req, file, cb) {
                  //req.body is empty... here is where req.body.new_file_name doesn't exists
                  cb(null, file.originalname);
            }
      }
);

var storage1 = multer.diskStorage(
      {
            destination: 'public/services_image/',
            filename: function (req, file, cb) {
                  //req.body is empty... here is where req.body.new_file_name doesn't exists
                  cb(null, file.originalname);
            }
      }
);


var upload = multer({ storage: storage });
var uploads = multer({ storage: storage1 });

router.get('/add_product', function (req, res, next) {
      var img = req.session.profile;
      var status=req.session.status;
      request.get("http://freedomclub.in/api_industry_list/", (error, response, body) => {
            var json = JSON.parse(body);
            if (json.status == 200) {
                  data = json.data;
                  var user= req.session.usersdata;
                  var email=user.email;
                  var address=user.address;
                  var pincode=user.pincode;
                  var mobile=user.username;
                  req.flash('success','');
                  res.render('products/add_product', {expressFlash:req.flash('success'), login: "My Account", profile: img, data: data,email:email,address:address,pincode:pincode,mobile:mobile,status:status});
            }
            else {
                 // console.log(user.username);
                  res.render('products/add_product', { login: "My Account", profile: img,status:status });
            }
      });
});

/*
*Add Product
*/

router.post("/add_product", upload.any(), function (req, res, next) {
      console.log(req.body);
      var img = req.session.profile;
      var uid = req.session.user;
      var profile = req.files[0].filename;
      var slug = slugify(req.body.product_name);
      var data = {
            "user_id": uid,
            "category_id": req.body.category_id,
            "subcategory_id": req.body.subcategory_id,
            "subofsub_id": req.body.subofsub_id,
            "subdsub_id": req.body.subdsub_id,
            "product_name": req.body.product_name,
            "email":req.body.email,
            "mobile":req.body.mobile,
            "lat":req.body.lat,
            "lng":req.body.lng,
            "product_image": profile,
            "product_slug": slug,
            "description": req.body.description,
            "address": req.body.address,
            "pincode": req.body.pincode
      }

      db.query('INSERT INTO products SET ?', data, function (error, results, fields) {
            if (error) {
                  console.log("error ocurred", error);
                  req.flash('error', 'error ocurred');
                  res.render('products/add_product', { login: "My Account", profile: img,expressFlash:req.flash('error')});
            } else {
                  var user=req.session.usersdata;
                  req.flash('success', 'Add Product successfully');
                  res.render('products/add_product', { expressFlash:req.flash('success'),login: "My Account", profile: img,user:user});
            }
      });

});

/*
* Get Offer 
*/
router.get("/offers", function (req, res, next) {
      var img = req.session.profile;
      var uid = req.session.user;
      var status=req.session.status;
      var sql = "SELECT * FROM products where user_id=?";
      db.query(sql, [uid], function (err, result) {
            if (err) {
                  res.send({
                        "code": 400,
                        "error": err
                  })
            } else {
                  //console.log(result);
                  res.render('products/offers', { login: "My Account", profile: img, result:result,status:status });
            }
      });
});

router.post("/offers", function (req, res, next) {
      var uid = req.session.user;
      var data = {
            "user_id": uid,
            "product_id": req.body.product_id,
            "offers_text": req.body.offers_text,
            "percent": req.body.percent,
      }
      db.query('INSERT INTO offers SET ?', data, function (error, results, fields) {
            if (error) {
                  console.log("error ocurred", error);
                  res.send({
                        "status": 400,
                        "failed": "error ocurred"
                  })
            } else {
                  res.send({
                        "status": 200,
                        "success": "Offer saved sucessfully"
                  });
            }
      });
});

/*
* Services
*/

router.get("/services", function (req, res, next) {
      var img = req.session.profile;
      var uid = req.session.user;
      var status=req.session.status;
      var sql = "SELECT * FROM products where user_id=?";
      db.query(sql, [uid], function (err, result) {
            if (err) {
                  res.send({
                        "code": 400,
                        "error": err
                  })
            } else {
                  console.log(result);
                  res.render('products/services', { login: "My Account", profile: img, result: result,status:status});
            }
      });
});

router.post("/services",uploads.any(),function (req, res, next) {
      var uid = req.session.user;
      var img=req.files[0].filename;
      var data = {
            "user_id": uid,
            "product_id":req.body.product_id,
            "name": req.body.name,
            "image":img
      }
      db.query('INSERT INTO services SET ?', data, function (error, results, fields) {
            if (error) {
                  console.log("error ocurred", error);
                  res.send({
                        "code": 400,
                        "failed": "error ocurred"
                  })
            } else {
                  res.send({
                        "code": 200,
                        "success": "Offer saved sucessfully",
                        "data": data.name,
                        "img":data.image

                  });
            }
      });
});

/*
*Add Gallery
*/
router.get("/gallery", function (req, res, next) {
      var uid = req.session.user; 
      var img = req.session.profile; 
      var status=req.session.status;
      db.query("SELECT * FROM products where user_id=?", [uid], function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            } else {
                  console.log(results);
                  res.render('products/gallery', { login: "My Account", profile: img, result: results,status:status});
            }
      });
});

/*
*Get Services Id
*/

router.post("/getservicesid", function (req, res, next) {
      var id = req.body.id;
      db.query("SELECT * FROM services where product_id=?", [id], function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", err);
                  res.send({
                        "code": 500,
                        "error": err
                  });
            } else {
                  res.send({
                        "code": 200,
                        "success": "Offer saved sucessfully",
                        "results": results
                  });
            }
      });
});

router.post("/gallery", upload.any(), function (req, res, next) {
      var data = {
            "service_id": req.body.service_id,
            "product_id": req.body.product_id,
            "image": req.files[0].filename
      }
      db.query('INSERT INTO gallery SET ?', data, function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", err);
                  res.send({
                        "code": 500,
                        "error": err
                  });
            } else {
                  res.send({
                        "code": 200,
                        "success": "Offer saved sucessfully",
                        "id": results.insertId,
                        "img": data.image
                  });
            }
      });
});

/*
*Remove Gallery Image
*/
router.post("/removeimg", function (req, res, next) {
      var id = req.body.id;
      db.query('DELETE FROM gallery WHERE id', id, function (err, results, fields) {
            if (err) {
                  console.log(err);
            }
            else {
                  console.log(results);
            }
      });
});


/*
*Listing of product
*/

router.get("/listing", function (req, res, next) {
      var uid = req.session.user;
      var img = req.session.profile;
      
      db.query("SELECT * FROM products", function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            }
            else {
                  res.render('products/listing', { login: "My Account", profile: img, result: results });
            }
      });
});

router.get("/shop/:slug", function (req, res, next) {
      var slug = req.params.slug;
      var uid = req.session.user;
      db.query("SELECT * FROM products where product_slug=?", [slug], function (err, results, fields) {
            var shopdetail = results;
            console.log(shopdetail);
            var id = results[0].id;
            db.query("SELECT * FROM services where product_id=?", id, function (err, results, fields) {
                  if (err) {
                        console.log(err);
                  } else {
                        service = results;
                        console.log(service);
                  }
                  db.query("SELECT * FROM gallery where product_id=?", id, function (err, results, fields) {
                        if (err) {
                              console.log(err);
                        } else {
                              gallery = results;   
                        }
                        var img = req.session.profile;
                        var username=req.session.username;
                        res.render('products/shop', { login: "My Account", profile: img, shopdetail: shopdetail, service: service, gallery: gallery,user:username});                        
                  });
            });
      });
});


module.exports = router;