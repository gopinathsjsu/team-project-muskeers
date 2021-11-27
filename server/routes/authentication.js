const router = require("express").Router();
const pool = require("../utils/connection");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/signup", (req,res)=>{
    
    console.log(req.body);  
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const insertUserQuery = "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES (?,?,?, ?)";
        console.log("Inside API Signup");
        bcrypt.hash(password, saltRounds ).then(function (hash) {
            pool.query(insertUserQuery, [name, email, hash, role], (err,result)=>{
                if(err){
                    if(err.code=="ER_DUP_ENTRY"){
                        res.status(409).json({message:"User already exists!"});
                    }
                }else{
                    res.status(200).json({name: name, email: email, role: role});
                }
            })
        })
        console.log("Successful registeration of the customer");
    
    //res.status(200).send("Successful registration of customer");
    
});

router.post("/login", (req,res)=>{
    
    console.log(req.body);  
        
        console.log("In login api");
        const email = req.body.email;
        const password = req.body.password;
        const loginQuery = "select user_name,user_email,user_password,user_role from users where user_email=?";
        

        console.log("heyy");
        pool.query(loginQuery, [email], (err, result) => {
            if (err) {
              throw err;
            } else {
              console.log("Inside Login Else");
              console.log(result);
              console.log(result.length);
              if (result.length > 0) {
                  console.log(typeof result);
                console.log(result[0].user_password);
                const validPassword =  bcrypt.compare(password, result[0].user_password)
                  .then(async function (response) {
                                        
                    if (response==true) {
                      const success = {
                        email: email,
                        name: result[0].user_name,
                        role: result[0].user_role,
                        userId : result[0].user_id
                      };
                          
                      res.status(200).json({ success: success });
                    }else{
                      
                    res.status(404).json({ message: "Invalid credentials!" });
                    }
                  })
                  .catch((response) => {
                    console.log("invalid cred 2nd time");
                    res.status(404).json({ message: "Invalid Credentials" });
                  });
              }else{
                res.status(404).json({ message: "User not found!" });
              }
            }
          });
    
});


module.exports = router;