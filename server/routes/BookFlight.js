const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/bookFlight",(req,res)=>{
    console.log("inside book flight" + req.body);
    console.log("==============");
    const flightId = req.body.flightId;
    const userId = req.body.userId;
    const flightDate = req.body.flightDate;
    const bookingDate = req.body.bookingDate;
    const price = req.body.price;

    console.log(flightId+"=============="+price);

    const bookflightQuery = "INSERT INTO flight_booking (flight_id, user_id, flight_date, booking_date,price) VALUES (?, ?, ?, ?,?);";
    const updateAvailability = "UPDATE flight_details SET `availability` = `availability` - 1 WHERE  flight_id = ? and start_date = ?";
    const updateUserPoints = "UPDATE users SET `user_flying_credits` = `user_flying_credits` + (?*0.2) WHERE  user_id=?"

    pool.query(bookflightQuery, [flightId, userId, flightDate,bookingDate,price],(err,result)=>{
        console.log("1"+bookflightQuery);

        pool.query(updateAvailability, [flightId, flightDate],(err,update_result)=>{
            console.log("2"+updateAvailability);
            pool.query(updateUserPoints, [price, userId],(err,update_pointsresult)=>{

                console.log("3" + updateUserPoints);


                console.log(update_pointsresult);
                console.log(err);
                res.status(200).json({message: "updated user points"});
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