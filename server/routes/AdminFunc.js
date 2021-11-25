const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/createFlight",(req,res)=>{
    const source = req.body.source;
    const destination = req.body.destination;
    const createFlightQuery = "INSERT INTO flight_table (source_city,destination_city) VALUES(?,?)";
    pool.query(createFlightQuery,[source,destination], (err,result)=>{
        //console.log(result);
        //res.status(200).json({message:"Created flight between two cities"});
        const flightId = result.insertId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const insertFlightDetailsQuery = "INSERT INTO flight_details (flight_id,start_time,end_time,availability,price,start_date) VALUES(?,?,?,?,?,?)";

        const startdaysArray = startDate.split("-");
        const enddaysArray = endDate.split("-");
        for(let i=parseInt(startdaysArray[2]);i<=parseInt(enddaysArray[2]);i++){
            const sd = startdaysArray[0] + "-" + startdaysArray[1] + "-" + i;
            pool.query(insertFlightDetailsQuery,[flightId,startTime,endTime,180,"$500",sd],(err1,result1)=>{
                if(err1){
                    console.log(err);
                    res.status(409).json({message: "Error while creating flight"});
                }
                console.log(result1);
            });
        }
        res.status(200).json({message:"Created flight between two cities"});

    });
});

router.get("/filghtDetailsAdmin",(req,res)=>{
    const flightDetailsQuery = "select flight_table.flight_id, flight_table.source_city, flight_table.destination_city, flight_details.start_time, flight_details.end_time, flight_details.availability, flight_details.price, flight_details.start_date, flight_details.status from flight_table INNER JOIN flight_details ON flight_table.flight_id = flight_details.flight_id;";
    pool.query(flightDetailsQuery,(err,result)=>{
        if(err){
            res.status(409).json({message:"Error occured while tring to fetch"});
        }

        res.status(200).json({details: result});
    })
});

router.post("/updateStatus",(req,res)=>{
    const flightId = req.body.flightId;
    const date = req.body.date;
    const status = req.body.status;
    const updateStatusQuery = "UPDATE flight_details SET status=? where flight_id=? and start_date=?";

    pool.query(updateStatusQuery, [status, flightId, date],(err,result)=>{
        console.log(result);
        res.status(200).json({message: "Successfully changed the status of the flight selected"});
    });
});

router.post("/deleteFlightDetails",(req,res)=>{
    const flightId = req.body.flightId;

    const deleteFligtDetailsQuery = "DELETE FROM flight_details where flight_id=?";
    pool.query(deleteFligtDetailsQuery, [flightId], (err,result)=>{
        console.log(err);
        console.log(result);
        const deleteFlightTableQuery = "DELETE FROM flight_table where flight_id=?";
        pool.query(deleteFlightTableQuery,[flightId],(err1,result1)=>{
            console.log(err1);
            res.status(200).json({message: "Successful deletion of Flight for the given flight ID"});
        });
    });
});

module.exports = router;