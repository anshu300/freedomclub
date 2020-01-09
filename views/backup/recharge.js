var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var uniqid = require('uniqid');
var request = require("request");
var jose = require('node-jose');

/*
*Mobile Rechage Payment
*/
router.get("/mobile", function (req, res, next) {
    var uid = req.session.user;
    console.log(uid);
    var amount = req.session.Ramount;
    var unqid = uniqid();
    if (uid == undefined) {
    } else {
        var sql = "SELECT SUM(deposit) as Amount FROM wallet where user_id=?;SELECT SUM(amount) as Ramount FROM recharge where user_id=?";
        db.query(sql, [uid, uid], function (err, result) {
            if (err) {

            } else {
                var amu = result[0][0].Amount;
                if (result[1][0].Ramount == null) {
                    var ramu = 0;
                } else {
                    var ramu = result[1][0].Ramount;
                }
                var total = parseInt(amu) - parseInt(ramu);
                request.get("http://103.90.241.225:5000/current_user?id=" + uid, (error, response, body) => {
                    var json = JSON.parse(body);
                    var data = json.username;
                    res.render('recharge/mobile_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
                });
            }
        });
    }
});

router.post("/mobile", function (req, res, next) {
    req.session.Rno = req.body.mobile;
    req.session.Ramount = req.body.amount;
    req.session.Roprator = req.body.oprator;
    req.session.Rtype = req.body.r_type;
    req.session.Rrecharge = req.body.rechage_type;
    res.send({ "status": 200 });
});

router.get("/mobile-payment", function (req, res, next) {
    var mobile = req.session.Rno;
    var amount = req.session.Ramount;
    var oprator = req.session.Roprator;
    var r_type = req.session.Rtype;
    var rechage_type = req.session.Rrecharge;
    var unqid = uniqid();
    var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=#opvalue1&opvalue2=#opvalue2";
    request.get(url, (error, response, body) => {
        var json = JSON.parse(body);
        console.log(json);
        if (json.data.status == "FAILED") {
            res.send({
                "code": 200,
                "success": "Add Amount sucessfully",
                "msg": json.data.resText
            });
        }
        else {
            var recharge = {
                "user_id": req.session.user,
                "recharge_type": rechage_type,
                "sim_type": r_type,
                "mobile_no": mobile,
                "oprator": oprator,
                "amount": amount,
                "uniqid": unqid,
                "status": json.data.status,
                "resText":json.data.resText
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
                    // res.send({
                    //     "code": 200,
                    //     "success": "Add Amount sucessfully",
                    //     "msg": results[0].resText
                    // });

                    res.redirect("/users/recharge");
                }
            });
        }
    });
});

/*
*Dth Payment
*/

router.get("/dth", function (req, res, next) {
    var uid = req.session.user;
    var amount = req.session.card_amu;
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
                    res.render('recharge/dth_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
                });
            }
        });
    }
});

router.post("/dth", function (req, res, next) {
    req.session.card_no = req.body.card_no;
    req.session.card_amu = req.body.amount;
    req.session.card_op = req.body.oprator;
    req.session.CardRecharge = req.body.rechage_type;
    res.send({ "status": 200 });
});

router.post("/dth-payment", function (req, res, next) {
    var mobile = req.session.card_no;
    var amount = req.session.card_amu;
    var oprator = req.session.card_op;
    var rechage_type = req.session.CardRecharge;
    var unqid = uniqid();
    var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=dth&opvalue2=#opvalue2";
    request.get(url, (error, response, body) => {
        var json = JSON.parse(body);
        if (json.data.status == "FAILED") {
        }
        else {
            var recharge = {
                "user_id": req.session.user,
                "recharge_type": rechage_type,
                "mobile_no": mobile,
                "oprator": oprator,
                "amount": amount,
                "uniqid": unqid,
                "status": json.data.status,
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


/*
*gas Payment
*/

router.get("/gas", function (req, res, next) {
    var uid = req.session.user;
    var amount = req.session.card_amu;
    // console.log(req.session.card_no);
    // console.log(req.session.card_amu);
    // console.log(req.session.card_op);
    // console.log(req.session.GasRecharge);
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
                    res.render('recharge/gas_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
                });
            }
        });
    }
});

router.post("/gas", function (req, res, next) {
    req.session.card_no = req.body.card_no;
    req.session.card_amu = req.body.amount;
    req.session.card_op = req.body.oprator;
    req.session.GasRecharge = req.body.rechage_type;

    //res.send({"card_no":req.body.card_no,"amount":req.body.amount,"card_op":req.body.oprator,"rech":req.session.GasRecharge});

    res.send({ "status": 200 });
});

router.post("/gas_payment", function (req, res, next) {
    var mobile = req.session.card_no;
    var amount = req.session.card_amu;
    var oprator = req.session.card_op;
    var rechage_type = req.session.GasRecharge;
    var unqid = uniqid();
    var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=dth&opvalue2=#opvalue2";
    request.get(url, (error, response, body) => {
        var json = JSON.parse(body);
        if (json.data.status == "FAILED") {
        }
        else {
            var recharge = {
                "user_id": req.session.user,
                "recharge_type": rechage_type,
                "mobile_no": mobile,
                "oprator": oprator,
                "amount": amount,
                "uniqid": unqid,
                "status": json.data.status,
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

/*
*Electric rechage bill
*/

router.post("/electricity", function (req, res, next) {
    req.session.card_no = req.body.card_no;
    req.session.card_amu = req.body.amount;
    req.session.card_op = req.body.oprator;
    req.session.EleRecharge = req.body.rechage_type;
    // res.send({ "status": 200 });
    res.send({ "card_no": req.body.card_no, "amount": req.body.amount, "card_op": req.body.oprator, "rech": req.session.EleRecharge });
});


router.get("/electricity", function (req, res, next) {
    var uid = req.session.user;
    var amount = req.session.card_amu;
    // console.log(req.session.card_no);
    // console.log(req.session.card_amu);
    // console.log(req.session.card_op);
    // console.log(req.session.GasRecharge);
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
                    res.render('recharge/electricity_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
                });
            }
        });
    }
});


router.post("/electricity_payment", function (req, res, next) {
    var mobile = req.session.card_no;
    var amount = req.session.card_amu;
    var oprator = req.session.card_op;
    var rechage_type = req.session.EleRecharge;
    var unqid = uniqid();
    var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=dth&opvalue2=#opvalue2";
    request.get(url, (error, response, body) => {
        var json = JSON.parse(body);
        console.log(json);
        if (json.data.status == "FAILED") {
        }
        else {
            var recharge = {
                "user_id": req.session.user,
                "recharge_type": rechage_type,
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


/*
*landline
*/

router.post("/landline", function (req, res, next) {
    req.session.card_no = req.body.card_no;
    req.session.card_amu = req.body.amount;
    req.session.card_op = req.body.oprator;
    req.session.std_code = req.body.std;
    req.session.landRecharge = req.body.rechage_type;
    // res.send({ "status": 200 });
    res.send({ "card_no": req.body.card_no, "amount": req.body.amount, "card_op": req.body.oprator, "rech": req.session.landRecharge, "std": req.session.std_code });
});


router.get("/landline", function (req, res, next) {
    var uid = req.session.user;
    var amount = req.session.card_amu;
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
                    res.render('recharge/landline_payment', { user: 1, login: "My Account", totalamu: total, "amount": amount, "users": data, "uniqid": unqid });
                });
            }
        });
    }
});


router.post("/landline_payment", function (req, res, next) {
    var mobile = req.session.card_no;
    var amount = req.session.card_amu;
    var oprator = req.session.card_op;
    var rechage_type = req.session.landRecharge;
    var std = req.session.std_code
    var unqid = uniqid();
    var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=" + mobile + "&amount=" + amount + "&opid=" + oprator + "&urid=" + unqid + "&opvalue1=" + std + "&opvalue2=#opvalue2";
    request.get(url, (error, response, body) => {
        var json = JSON.parse(body);
      //  console.log(json);
        console.log(json.data.status);
        if (json.data.status == "FAILED") {
            res.send({
                "code": 200,
                "success": "Add Amount sucessfully",
                "msg": json.data.resText
            });
        }
        else {
            var recharge = {
                "user_id": req.session.user,
                "recharge_type": rechage_type,
                "mobile_no": mobile,
                "oprator": oprator,
                "amount": amount,
                "uniqid": unqid,
                "status": "success",
                "resText":json.data.resText
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
                        "msg": results[0].resText
                    });
                }
            });
        }
    });
});

router.get("/test", function (req, res, next) {
    var sql = "SELECT * FROM recharge where id=?";
    db.query(sql, [20], function (err, result) {
        if (err) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred",
                "error": error
            })
        } else {
            res.render("recharge/test",{"data":result});
        }
    });
});
module.exports = router;