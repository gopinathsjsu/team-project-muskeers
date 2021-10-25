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

module.exports = router;