const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/getProfile",(req,res)=>{
    const email = req.body.email;
    const userProfileQuery = "SELECT user_name, user_address, user_phone, user_flying_credits from users where user_email=?";
    pool.query(userProfileQuery,[email],(err,result)=>{
        //console.log(result);
        //console.log(err);
        if(err){
            res.status(409).json({message: "User with Email not found"});
        }
       
        res.status(200).json({
            email: email,
            name: result[0].user_name,
            address: result[0].user_address,
            phone: result[0].user_address,
            flyingCredits: result[0].user_flying_credits
        });
    });
});

module.exports = router;