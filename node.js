
let express=require("express");
let app=express();
app.use(express.json());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app Listening on port ${port}`));
let {getConnection}=require("./employeeDB.js");

app.get("/svr/employees",function(req,res){
  console.log("Inside /employee get api");
  let query=`SELECT * FROM empcompany`;
  getConnection.query(query,function(err,result){
    if(err) {
      console.log(err);
      res.status(404).send("Error in fetchig data jesmin");
    }
      res.send(result.rows);
      getConnection.end();
  })
});
// Start of postgres database conncetion
// database table name is empcompay
app.get("/svr/employees",function(req,res){
  let connection=getConnection(); 
  let sql=`SELECT * FROM empcompany`;
  connection.query(sql,function(err,result){
    if(err) {
      console.log(err);
      res.status(404).send("Error in fetchig data");
    }
    else{
      res.send(result);
    }
  })
});


// End of postgres database conncetion

app.get("/svr/employees",function(req,res){
  let Department=req.query.Department;
  let Designation=req.query.Designation;
  let Gender=req.query.Gender;
  let connection=getConnection();
  let options="";
  let optionsArr=[];
  console.log("Department=",Department,"Designation=",Designation);
  if(Designation){
    options=options=options? `${options} AND Designation=?`:"WHERE Designation=?";
    optionsArr.push(Designation);
  }
  if(Department){
    options=options? `${options} AND Department=?`:"WHERE Department=?";
    optionsArr.push(Department);
  }
  if(Gender){
    options=options? `${options} AND Gender=?`:"WHERE Gender=?";
    optionsArr.push(Gender);
  }
  let sql=`SELECT * FROM employee ${options}`;
  connection.query(sql,optionsArr,function(err,result){
    if(err) {
      console.log(err);
      res.status(404).send("Error in fetchig data");
    }
    else{
      res.send(result);
    }
  })
});

app.get("/svr/employees",function(req,res){
  let connection=getConnection(); 
  let sql=`SELECT * FROM employee`;
  connection.query(sql,function(err,result){
    if(err) {
      console.log(err);
      res.status(404).send("Error in fetchig data");
    }
    else{
      res.send(result);
    }
  })
});

app.delete("/svr/employees/:empCode",function(req,res){
  let empCode=req.params.empCode;
  let connection=getConnection();
  let sql="DELETE FROM employee WHERE empCode=?";
  connection.query(sql,empCode,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in deleting data");
    }
    else if(result.affectedRows===0){
      res.status(404).send("No delete happened");
    }
    else res.send("delete success");
  })
});

app.put("/svr/employees/:empCode",function(req,res){
  let empCode=req.params.empCode;
  console.log("empcode=",empCode);
  let body=req.body;
  let connection=getConnection();
  let sql="UPDATE employee SET name=?,department=?,designation=?,salary=?,gender=? WHERE empCode=?";
  let params=[
              body.name,body.department,
              body.designation,body.salary,body.gender,empCode
             ];
  connection.query(sql,params,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in Updating data");
    }
    else if(result.affectedRows===0){
      res.status(404).send("No update happened");
    }
    else res.send("Update success");
  })
});

app.post("/svr/employees",function(req,res){
  let body=req.body;
  let connection=getConnection();
  let sql1=`SELECT * FROM employee WHERE  name=?`;
  connection.query(sql1,body.name,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else if(result.length>0) res.status(404).send(`Name already exists : ${body.name}`);
    else {
      let sql=`INSERT INTO employee(empCode,name,department,designation,salary,gender) 
                VALUE (?,?,?,?,?,?)`;
      connection.query(sql,[
        body.empCode,body.name,body.department,
        body.designation,body.salary,body.gender],
        function(err,result){
        console.log("result=",result);
        if(err){
          console.log(err);
          res.status(404).send("Error in fetching data")
        }
        else res.send(`Post sucess. name of new Employee is ${body.name}`);
      })
    }
  }) 
});

app.get("/svr/employees/empCode/:empCode",function(req,res){
  let empCode=+req.params.empCode;
  console.log("EmpCode=",empCode);
  let connection=getConnection();
  let sql="SELECT * FROM employee WHERE empCode=?";
  connection.query(sql,empCode,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else res.send(result);
  })
});

app.get("/svr/employees/EmpName/:name",function(req,res){
  let name=req.params.name;
  console.log("name=",name);
  let connection=getConnection();
  let sql="SELECT * FROM employee WHERE name=?";
  connection.query(sql,name,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else res.send(result);
  })
});

app.get("/svr/employees/Department/:dept",function(req,res){
  let department=req.params.dept;
  console.log("department=",department);
  let connection=getConnection();
  let sql="SELECT * FROM employee WHERE department=?";
  connection.query(sql,department,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else res.send(result);
  })
});

app.get("/svr/employees/Designation/:desig",function(req,res){
  let designation=req.params.desig;
  console.log("Designation=",designation);
  let connection=getConnection();
  let sql="SELECT * FROM employee WHERE designation=?";
  connection.query(sql,designation,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else res.send(result);
  })
});

app.get("/svr/employees/gender/:gender",function(req,res){
  let gender=req.params.gender;
  console.log("gender=",gender);
  let connection=getConnection();
  let sql="SELECT * FROM employee WHERE gender=?";
  connection.query(sql,gender,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in fetching data")
    }
    else res.send(result);
  })
});

app.get("/svr/resetData",function(req,res){
  let connection=getConnection();
  //if we use delete for reset new id gonna start from the previous id
  // let sql="DELETE FROM mobiletbl ";

   //if we use delete for reset new id gonna start from start id
  let sql="TRUNCATE TABLE employee";
  connection.query(sql,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("Error in delete data");
    }
    else{
      console.log(`Deletion Success.Deleted ${result.affectedRows} rows`);
      let {employeeData}=require("./empData.js");
      let arr=employeeData.map(st=>[
        st.empCode,
        st.name,
        st.department,
        st.designation,st.salary,st.gender
      ]);
      let sql1="INSERT INTO employee (empCode,name,department,designation,salary,gender) VALUES ?";
      connection.query(sql1,[arr],function(err,result){
        if(err){
          console.log(err);
          res.status(404).send("Error in inserting data");
        }
        else res.send(`Reset Success.Inserted ${result.affectedRows} rows`);
      })
    }
  })
})

