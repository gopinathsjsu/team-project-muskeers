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
            pool.query(insertFlightDetailsQuery,[flightId,startTime,endTime,180,"$500",sd],(err,result)=>{
                if(err){
                    console.log(err);
                    res.status(409).json({message: "Error while creating flight"});
                }
                console.log(result);
            });
        }
        res.status(200).json({message:"Created flight between two cities"});

    });
});

module.exports = router;