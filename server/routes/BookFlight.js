const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/flightId",(req,res)=>{
    
    const flightIdQuery = "select flight_id from flight_table;";

    pool.query(flightIdQuery, [],(err,result)=>{
        console.log(result);
        res.status(200).json({flight_id: result});
    });
});

router.post("/bookFlight",(req,res)=>{
    console.log("inside book flight" + req.body);
    console.log("==============");
    
    const flightId = req.body.flightId;
    const userId = req.body.userId;
    const flightDate = req.body.flightDate;
    const bookingDate = req.body.bookingDate;
    const price = req.body.price;
    const paymentID = req.body.paymentId;

    console.log(flightId);
    console.log(userId);
    console.log(flightDate);
    console.log(bookingDate);
    console.log(price);
    console.log(paymentID);

    console.log(flightId+"=============="+price);

    const bookflightQuery = "INSERT INTO flight_booking (flight_id, user_id, flight_date, booking_date,price,payment_id) VALUES (?, ?, ?, ?,?,?);";
    const updateAvailability = "UPDATE flight_details SET `availability` = `availability` - 1 WHERE  flight_id = ? and start_date = ?";
    const updateUserPoints = "UPDATE users SET `user_flying_credits` = `user_flying_credits` + (?*0.2) WHERE  user_id=?"

    pool.query(bookflightQuery, [flightId, userId, flightDate,bookingDate,price,paymentID],(err,result)=>{
        console.log("1"+bookflightQuery);

        pool.query(updateAvailability, [flightId, flightDate],(err,update_result)=>{
            console.log("2"+updateAvailability);
            pool.query(updateUserPoints, [price, userId],(err,update_pointsresult)=>{
console.log("-----------");
                console.log("3" + result[0]);
                console.log("-----------");

                console.log(update_pointsresult);
                console.log(err);
                res.status(200).json({message:"updated"});
            });


            //console.log(update_result);
            //res.status(200).json({message: "updated available tickets"});
        });


        //console.log(result);
        //res.status(200).json({message: "Successfully added your booking"});
    });
});

router.post("/cancelBooking",(req,res)=>{
    console.log("inside cancel booked flight");
    console.log("==============");
    const bookingId = req.body.bookingId;
    const flightId = req.body.flightId;
    const userId = req.body.userId;
    const flightDate = req.body.flightDate;
    const price = req.body.price;
    

    const cancelBookingQuery = "UPDATE flight_booking SET status=0 where booking_id=?";
    const updateAvailability = "UPDATE flight_details SET `availability` = `availability` + 1 WHERE  flight_id = ? and start_date = ?";
    const updateUserPoints = "UPDATE users SET `user_flying_credits` = `user_flying_credits` - (?*0.2) WHERE  user_id=?"


    pool.query(cancelBookingQuery, [bookingId],(err,result)=>{


        pool.query(updateAvailability, [flightId, flightDate],(err,update_result)=>{
            console.log("2"+updateAvailability);
            pool.query(updateUserPoints, [price, userId],(err,update_pointsresult)=>{
                res.status(200).json({message: "updated user points reduced"});
            });


        });

    });
});

module.exports = router;