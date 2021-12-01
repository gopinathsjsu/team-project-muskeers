const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/userBookings",(req,res)=>{
    const userBookingsQuery = "select booking_id, flight_id, flight_date, booking_date, price,status from flight_booking where user_id=?";

    pool.query(userBookingsQuery, [req.body.userId], (err,result)=>{
        res.status(200).json({result: result});
    });
});

module.exports = router;