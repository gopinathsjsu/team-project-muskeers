const router = require("express").Router();
const pool = require("../utils/connection");


router.get("/addPayment",(req,res)=>{

    const userId = req.body.userId;
    const bookingId = req.body.bookingId;
    const cardName =   req.body.cardName;
    const expiryDate = req.body.expiryDate;
    const cvv = req.body.cvv;

    console.log(userId);
    

    const addPaymentQuery = "INSERT INTO payment (user_id, booking_id, card_name,expiry_date,cvv) VALUES (?,?,?, ?,?);";
    pool.query(addPaymentQuery,[userId,bookingId,cardName,expiryDate,cvv],(err,result)=>{
        if(err){
            res.status(409).json({message:"Error occured while adding"});
        }

        res.status(200).json({message:"Success in adding payment"});
    })
});


module.exports = router;