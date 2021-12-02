const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/userBookings",(req,res)=>{
    const userBookingsQuery = "select flight_table.flight_id, flight_table.source_city, flight_table.destination_city, flight_booking.booking_id, flight_booking.user_id, flight_booking.flight_date, flight_booking.booking_date, flight_booking.price, flight_booking.status from flight_table INNER JOIN flight_booking ON flight_table.flight_id = flight_booking.flight_id WHERE flight_booking.user_id =?";

    pool.query(userBookingsQuery, [req.body.userId], (err,result)=>{
        res.status(200).json({result: result});
    });
});

module.exports = router;