var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var request = require("request");
var jwt = require('jsonwebtoken');
var base64urlEncode = require('base64url');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var aes256 = require('nodejs-aes256');
var fs = require("fs");
var uniqid = require('uniqid');


/*
 * Get Total Amount
*/
router.get('/', function (req, res, next) {

  var str = "anshu verma ";
  var name = str.replace(/ /g, '');
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {
      "name": name,
      "mobileNo": "9616499322",
      "type": "1",
      "createdBy": "AGGR001010"
    },
    "transaction": {
      "requestType": "USR",
      "requestSubType": "REG",
      "channel": "WEB",
      "countryCode": "INR"

    }
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };
  request(options, function (error, response, body) {
    var token = body.payload;
    var decoded = jwt.decode(token);
    res.send({ "status": decoded });
  });
});

/*
*This Api Create User 
*/
router.get("/create", function (req, res, next) {
  res.render("api/create_user");
});

router.post("/create", function (req, res, next) {
  var mobile = req.body.mobile;
  var str = req.body.name;
  var name = str.replace(/ /g, '');
  console.log(name);
  console.log(str);
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {
      "name": name,
      "mobileNo": mobile,
      "type": "1",
      "createdBy": "AGGR002547"
    },
    "transaction": {
      "requestType": "USR",
      "requestSubType": "REG",
      "channel": "WEB",
      "countryCode": "INR"
    }
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };
  request(options, function (error, response, body) {
    var token = body.payload;
    var decoded = jwt.decode(token);
    var obj = decoded.payload;
    var myJSON = JSON.parse(obj);
    res.send(myJSON);
    //res.render('api/create_user', { "result": myJSON });
  });
});


/*
*This Api get User Information
*/

router.get("/profile", function (req, res, next) {
  res.render("api/profile");

});

router.post("/profile", function (req, res, next) {
  var number = req.body.number;
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {
      "mobileNo": number,
    },
    "transaction": {
      "requestType": "USR",
      "requestSubType": "PRF",
      "channel": "WEB",
      "agId": "AGGR002547"
    }
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };
  request(options, function (error, response, body) {
    var token = body.payload;
    var decoded = jwt.decode(token);
    var obj = decoded.payload;
    var myJSON = JSON.parse(obj);
    res.send(myJSON);
    //res.render('api/profile', { "result": myJSON });
  });
});

/*
*Add beneficiary
*/
router.get("/beneficiary", function (req, res, next) {
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {},
    "transaction": {
      "requestType": "USR",
      "requestSubType": "ADDBE",
      "channel": "WEB",
      "tranCode": 0,
      "countryCode": "INR",
      "txnAmt": 0.0
    },
    "recharge": {},
    "passbook": [],
    "merchantCustPassbook": [],
    "transactionStatus": {
      "amount": 0.0
    },
    "smartCard": {},
    "smartCardUserList": [],
    "beneficiaryInfo": {
      "userId": "CUST001851",
      "mobileNo": "9616499322",
      "beneficiaryName": "anshu",
      "identifierType": "mobile",
      "identifier": "7208377401",
      "maxMonthlyAllowedLimit": 0
    },
    "beneficiaryList": [],
    "response": {},
    "rbiRequest": {}
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };


  

  request(options, function (error, response, body) {
    console
    var token = body.payload;
    var decoded = jwt.decode(token);

    var obj = decoded.payload;
    var myJSON = JSON.parse(obj);
    res.send({ "status": myJSON });
    
  });
});

router.get("/status", function (req, res, next) {
  res.render('api/status');
});

router.post("/status", function (req, res, next) {
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {
      "id": "CUST001851"
    },
    "transaction": {
      "requestType": "USR",
      "requestSubType": "BWKS",
      "channel": "WEB",
      "agId": "AGGR002547",
      "txnAmt": 0.0
    },
    "recharge": {},
    "passbook": [],
    "merchantCustPassbook": [],
    "transactionStatus": {
      "amount": 0.0
    },
    "smartCard": {},
    "smartCardUserList": [],
    "beneficiaryInfo": {},
    "beneficiaryList": [],
    "response": {},
    "rbiRequest": {}
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };
  request(options, function (error, response, body) {
    console
    var token = body.payload;
    var decoded = jwt.decode(token);
    var obj = decoded.payload;
    var myJSON = JSON.parse(obj);
    res.send(myJSON);
  });
});


router.get("/aadhar", function (req, res, next) {
  res.render('api/aadhar');
});

router.post("/aadhar", function (req, res, next) {
  var number = req.body.number;
  var adh=req.body.adh;
  var data = {
    "header": {
      "operatingSystem": "WEB"
    },
    "userInfo": {
      "mobileNo": number,
      "aadharNo":adh
    },
    "transaction": {
      "requestType": "USR",
      "requestSubType":"RAR",
      "channel": "WEB",
      "token":"58d7c214-6fb1-47ba-8551-75baa4efa284"
    }
  }
  var cert = 'fcd2b16fc6f44cd72a08ea98cece807c4eec0d242a20061fa91346101ff302fc';
  var payload = jwt.sign({ payload: data }, cert, { algorithm: 'HS256' });
  var agId = "AGGR002547";
  var meId = "AGGR002547";
  var options = {
    uri: 'http://114.143.100.102:81/agWalletAPI/v1/agg',
    method: 'POST',
    json: {
      "agId": agId,
      "meId": meId,
      "payload": payload
    }
  };
  request(options, function (error, response, body) {
    var token = body.payload;
    var decoded = jwt.decode(token);
    var obj = decoded.payload;
    var myJSON = JSON.parse(obj);
    res.send(myJSON);
    //res.render('api/profile', { "result": myJSON });
  });
});

router.get("/notification", function (req, res, next) {
  request.get("http://103.90.241.225:5000/notification_list/", (error, response, body) => {
    var json = JSON.parse(body);
    res.json(json);
  });
});

/*
*Header banner
*/
router.get("/banner", function (req, res, next) {
  request.get("http://103.90.241.225:5000/api_banner_list?poss=header", (error, response, body) => {
    var json = JSON.parse(body);
    console.log(json);
     res.json(json);
  });
});


/*
* banner for topright
*/
router.get("/topright", function (req, res, next) {
  request.get("http://103.90.241.225:5000/api_banner_list?poss=topright", (error, response, body) => {
    var json = JSON.parse(body);
     res.json(json);
  });
});


/*
* banner for middleright
*/
router.get("/middleright", function (req, res, next) {
  request.get("http://103.90.241.225:5000/api_banner_list?poss=middleright", (error, response, body) => {
    var json = JSON.parse(body);
    res.json(json);
  });
});


/*
* banner for middleright
*/
router.get("/middleleft", function (req, res, next) {
  request.get("http://103.90.241.225:5000/api_banner_list?poss=middleright", (error, response, body) => {
    var json = JSON.parse(body);
    res.json(json);
  });
});


/*
* banner for affiliate
*/
router.get("/affiliate", function (req, res, next) {
  request.get("http://103.90.241.225:5000/api_banner_list?poss=affiliate", (error, response, body) => {
    var json = JSON.parse(body);
    res.json(json);
  });
});


router.get("/me",function(req, res, next){

    var key = 'Heisenberg';
    var plaintext = 'Hello World!';
    var ciphertext;

    ciphertext = aes256.encrypt(key, plaintext);
    console.log(ciphertext);

    var decrypted = aes256.decrypt(key, ciphertext);
       
   console.log(decrypted);


});


router.get("/re",function(req, res, next){
  var url = "https://www.instantpay.in/ws/api/transaction?format=json&token=a4f5e01884c68fab072b8aa7ed362a97&agentid=AGGR002547&amount=10&account=9616499322&spkey=IDP&mode=VALIDATE&customermobi=9616499322";
  request.get(url, (error, response, body) => {
    var json = JSON.parse(body);
    res.send(json);
  });
});




module.exports = router;