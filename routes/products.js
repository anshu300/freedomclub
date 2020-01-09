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
      var status = req.session.status;
      var vid = req.session.vendor_type;
      db.query("SELECT * FROM products where user_id=?", [uid], function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            } else {
                  res.render('products/my_product', { login: "My Account", profile: img, result: results, status: status, vid: vid });
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


var storage2 = multer.diskStorage(
      {
            destination: 'public/product_img/',
            filename: function (req, file, cb) {
                  //req.body is empty... here is where req.body.new_file_name doesn't exists
                  cb(null, file.originalname + '-' + Date.now());
            }
      }
);



var storage3 = multer.diskStorage(
      {
            destination: 'public/brand_img/',
            filename: function (req, file, cb) {
                  //req.body is empty... here is where req.body.new_file_name doesn't exists
                  cb(null,Date.now()+file.originalname);
            }
      }
);





var upload = multer({ storage: storage });
var uploads = multer({ storage: storage1 });
var products = multer({ storage: storage2 });
var brand = multer({ storage: storage3 });

router.get('/add_product', function (req, res, next) {
      var img = req.session.profile;
      var status = req.session.status;
      var vid = req.session.vendor_type;
      var uid = req.session.user;
      request.get("http://103.90.241.225:5000/api_industry_list/", (error, response, body) => {
            var json = JSON.parse(body);
            if (json.status == 200) {
                  data = json.data;
                  req.flash('success', '');
                  res.render('products/add_product', { expressFlash: req.flash('success'), login: "My Account", profile: img, data: data, status: status, vid: vid });
            }
            else {
                  // console.log(user.username);
                  res.render('products/add_product', { login: "My Account", profile: img, status: status });
            }
      });
});

/*
*Add Product
*/

router.post("/add_product", products.any(), function (req, res, next) {

      var img = req.session.profile;
      var uid = req.session.user;
      var profile = req.files[0].filename;
      var status = req.session.status;
      var slug = slugify(req.body.product_name);
      var vid = req.session.vendor_type;

      var data = {
            "user_id": uid,
            "category_id": req.body.category_id,
            "subcategory_id": req.body.subcategory_id,
            "subofsub_id": req.body.subofsub_id,
            "subdsub_id": req.body.subdsub_id,
            "brand_id": req.body.brand_id,
            "product_name": req.body.product_name,
            "email": req.body.email,
            "price": req.body.price,
            "mobile": req.body.mobile,
            "lat": req.body.lat,
            "lng": req.body.lng,
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
                  res.render('products/add_product', { login: "My Account", profile: img, expressFlash: req.flash('error') });
            } else {
                  var user = req.session.usersdata;
                  var email = user.email;
                  var address = user.address;
                  var pincode = user.pincode;
                  var mobile = user.username;
                  req.flash('success', 'Add Product successfully');
                  res.render('products/add_product', { status: status, expressFlash: req.flash('success'), login: "My Account", profile: img, user: user, email: email, address: address, pincode: pincode, mobile: mobile, vid: vid });
            }
      });
});

/*
* Get Offer 
*/
router.get("/offers", function (req, res, next) {
      console.log(req.session.name);
      var img = req.session.profile;
      var uid = req.session.user;
      var status = req.session.status;
      var vid = req.session.vendor_type;
      var sql = "SELECT * FROM products where user_id=?";
      db.query(sql, [uid], function (err, result) {
            if (err) {
                  res.send({
                        "code": 400,
                        "error": err
                  })
            } else {
                  //console.log(result);
                  res.render('products/offers', { login: "My Account", profile: img, result: result, status: status, vid: vid });
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
      var status = req.session.status;
      var vid = req.session.vendor_type;
      var sql = "SELECT * FROM products where user_id=?";
      db.query(sql, [uid], function (err, result) {
            if (err) {
                  res.send({
                        "code": 400,
                        "error": err
                  })
            } else {
                  console.log(result);
                  res.render('products/services', { login: "My Account", profile: img, result: result, status: status, vid: vid });
            }
      });
});

router.post("/services", uploads.any(), function (req, res, next) {
      var uid = req.session.user;
      var img = req.files[0].filename;
      var data = {
            "user_id": uid,
            "product_id": req.body.product_id,
            "name": req.body.name,
            "image": img
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
                        "img": data.image
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
      var status = req.session.status;
      var vid = req.session.vendor_type;
      db.query("SELECT * FROM products where user_id=?", [uid], function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            } else {
                  console.log(results);
                  res.render('products/gallery', { login: "My Account", profile: img, result: results, status: status, vid: vid });
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
      var vid = req.session.vendor_type;
      db.query("SELECT * FROM products", function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", error);
            }
            else {
                  res.render('products/listing', { login: "My Account", profile: img, result: results, vid: vid });
            }
      });
});

router.get("/shop/:slug", function (req, res, next) {
      var slug = req.params.slug;
      var uid = req.session.user;
      var vid = req.session.vendor_type;

      db.query("SELECT * FROM products where product_slug=?", [slug], function (err, results, fields) {
            var shopdetail = results;
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
                              console.log(gallery);
                        }
                        db.query("SELECT * FROM review where product_id=? AND status=?", [id, 1], function (err, results, fields) {
                              if (err) {
                                    console.log(err);
                              } else {
                                    review = results;
                                    // console.log(review);
                              }
                              var img = req.session.profile;
                              // var username = req.session.username;
                              //res.render('products/shop', { login: "My Account", profile: img, shopdetail: shopdetail, service: service, gallery: gallery, user: username,vid:vid });
                              res.render('products/shop', { login: "My Account", reviews: review, profile: img, shopdetail: shopdetail, service: service, gallery: gallery, vid: vid });
                        });
                  });

            });
      });
});

/*
* Delete Products
*/

router.post("/delete", function (req, res, next) {
      var id = req.body.id;
      db.query("DELETE FROM products WHERE id=?", [id], function (err, results, fields) {
            if (err) {
                  res.send({ "status": 500 });
            }
            else {
                  res.send({ "status": 200 });
            }
      });   
});

/*
*Edit Product
*/

router.get("/edit/:id", function (req, res, next) {
      var id = req.params.id;
      var img = req.session.profile;
      var status = req.session.status;
      var vid = req.session.vendor_type;
      var sql = "SELECT * FROM gallery where product_id=?";
      db.query(sql, [id], function (err, results, fields) {
            console.log(results);
      });
      res.render("products/edit", { login: "My Account", profile: img, status: status, vid: vid });
});

/*
*Update Product
*/

router.post("/edit/:id", function (req, res, next) {
      console.log(res.body);
});

/*
*Get Product Detail
*/

router.post("/get_prod_detail", function (req, res, next) {
      var id = req.body.id;
      var sql = "SELECT * FROM products where id=?";
      db.query(sql, [id], function (err, results, fields) {
            if (err) {
                  res.json({ "status": 500 });
            } else {
                  res.json({ "status": 200, "data": results });
            }
      });
});

/*
*  Get product Review
*/

router.get("/review/:id", function (req, res, next) {
      var img = req.session.profile;
      var status = req.session.status;
      var vid = req.session.vendor_type;
      var id = req.params.id;
      var sql = "SELECT * FROM review where product_id=?";
      db.query(sql, [id], function (err, results, fields) {
            if (err) {
                  res.json({ "status": 500 });
            } else {
                  res.render("products/review", { login: "My Account", profile: img, status: status, vid: vid, results: results });
            }
      });
});

/*
*  Update Review
*/

router.post("/review", function (req, res, next) {
      var sql = "UPDATE review set status =? WHERE id = ?";
      db.query(sql, [id], function (err, results, fields) {
            if (err) {
                  res.json({ "status": 500 });
            } else {
                  res.json({ "status": 200 });
            }
      });
});

/*
*View More Page
*/

router.get("/view_more", function (req, res, next) {
      var uid = req.session.user;
      console.log(uid);
      if(uid==undefined){    
         res.render('products/view_more', { login: "Login"});
      }else {
            res.render('products/view_more',{ login: "My Account"});   
      }
});


/*
* New Bussiness
*/
router.get("/new_business/:slug", function (req, res, next) {
      var uid = req.session.user;     
      var slug = req.params.slug;
      if(uid==undefined){
            var login="Login";
      }else{
            var login="My Account";  
      }
      if (slug == "mobile") {
            var sql = "SELECT * FROM brands where subcat_id=?";
            db.query(sql, [948], function (err, result) {
                  if (err) {
                        res.render('products/new_business', { login:login});
                  } else {
                        console.log(login);
                        res.render('products/new_business', { login:login, brands: result });
                  }
            });
      }
});

/*
*Grid List
*/

router.get("/grid_list/:id", function (req, res, next) {
      var uid = req.session.user;
      var id = req.params.id;
      if(uid==undefined){
            var login="Login";
      }else{
            var login="My Account";  
      }
      var sql = "SELECT * FROM products where brand_id=?";
      db.query(sql, [id], function (err, result) {
            if (err) {
                  res.render('products/grid_list', { login:login});
            }
            else {
                  res.render('products/grid_list', { login:login, results: result });
            }
      });
})

/*
*Product Detail
*/

router.get("/product_detail/:id", function (req, res, next) {
      var id = req.params.id;
      var uid = req.session.user;
      if(uid==undefined){
            var login="Login";
      }else{
            var login="My Account";  
      }
      var sql = "SELECT * FROM products where id=?";
      db.query(sql, [id], function (err, results, fields) { 
            var uid=results[0].user_id;          
            if (err) {
                  res.render('products/product_detail', { login:login});
            } else {
                  request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
                        var json = JSON.parse(body);
                        var  user=json.username;
                        console.log(user);
                        res.render('products/product_detail', { login:login, results:results,users:user });
                  });
            }
      });
});


/*
*Product enqiry
*/

router.post("/enqiry", function (req, res, next) {
      var data = {
            "product_id": req.body.product_id,
            "username": req.body.username,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "state": req.body.state,
            "city": req.body.city,
            "message": req.body.msg
      }
      db.query('INSERT INTO enquiry SET ?', data, function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", err);
                  res.send({
                        "code": 500,
                        "error": err
                  });
            } else {
                  res.send({
                        "code": 200,
                        "success": "Offer saved sucessfully"
                  });
            }
      });
});


router.post("/getbrand", function (req, res, next) {
      var id = req.body.id;
      var sql = "SELECT * FROM brands where subcat_id=?";
      db.query(sql, [948], function (err, results, fields) {
            if (err) {
                  res.send({ "status": 500, "errror": err });
            } else {
                  res.send({ "status": 200, "data": results });
            }
      });
});

/*
*add brand
*/
router.get("/add_brand",function (req, res, next) {
      var uid = req.session.user;
      var img = req.session.profile;
      var vid = req.session.vendor_type;
      var status = req.session.status;
      request.get("http://103.90.241.225:5000/api_industry_list/", (error, response, body) => {
            var json = JSON.parse(body);
            if (json.status == 200) {
                  data = json.data;
                  req.flash('success', '');
                  res.render('products/add_brand', { login: "My Account",expressFlash: req.flash('success'), profile: img, status: status, vid: vid, results: data });
            }
            else {
                  // console.log(user.username);
                  res.render('products/add_brand', { login: "My Account", profile: img, status: status, vid: vid });
            }
      });
});


/*
*add brand
*/

router.post("/add_brand",brand.any(),function(req,res,next){
      var img = req.session.profile;
      var vid = req.session.vendor_type;
      var status = req.session.status;
      var sulg=slugify(req.body.brand_name);
      var data = {
            "cat_id": req.body.cat_id,
            "subcat_id": req.body.subcat_id,
            "brand_name":req.body.brand_name,
            "image": req.files[0].filename,
            "slug":sulg ,
            "status":1
      }
     
      db.query('INSERT INTO brands SET ?', data, function (err, results, fields) {
            if (err) {
                  console.log("error ocurred", err);
            } else {
                  req.flash('success', 'Add Product successfully');                  
                  res.render('products/add_brand', { login: "My Account", profile: img, status: status, vid: vid, expressFlash: req.flash('success') });   
            }
      });
});

/*
*get detail merchant
*/

router.get("/detail/:id",function(req,res,next){
      var id = req.params.id;
      var uid = req.session.user;
      if(uid==undefined){
            var login="Login";
      }else{
            var login="My Account";  
      }
      var sql = "SELECT * FROM products where id=?";
      db.query(sql, [id], function (err, results, fields) {           
            if (err) {
                  res.render('products/detail', { login:login});
            } else {
                  request.get("http://103.90.241.225:5000/current_user?id=" + results[0].user_id, (error, response, body) => {
                        var json = JSON.parse(body);
                        var  user=json.username;
                        res.render('products/detail', { login:login, results:results,users:user });
                  });
            }
      });
});




module.exports = router;