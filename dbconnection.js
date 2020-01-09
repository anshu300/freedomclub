var mysql=require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node",
    multipleStatements: true
  });
  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    //console.log('Connection established');
  });
module.exports=con;