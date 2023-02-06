let mysql=require("mysql");
let connData={
  host:"localhost",
  user:"root",
  password:"",
  database:"employeedb"
};

function getConnection(){
  return mysql.createConnection(connData);
};
module.exports.getConnection=getConnection;

// const {client}=require("pg");
// const client=new client({
//   user:"postgres",
//   password:"Jesmin@12344",
//   database:"postgres",
//   port:"5432",
//   host:"db.bjwyunrwkuwvgcbcillj.supabase.co",
//   ssl:{rejectUnauthorized:false},
// });
// client.connect(function(res,error){
//   console.log(`Connect!!!`);
// })

// app.get("/svr/employees",function(req,res){
//   console.log("Inside /employee get api");
//   let query=`SELECT * FROM empcompany`;
//   client.query(query,function(err,result){
//     if(err) {
//       console.log(err);
//       res.status(404).send("Error in fetchig data");
//     }
//       res.send(result.row);
//     client.end();
//   })
// });

// // module.exports.client.connect=getConnection;