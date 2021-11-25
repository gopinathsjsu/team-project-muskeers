const router = require("express").Router();
const pool = require("../utils/connection");

router.post("/flightDetails", (req, res) => {
    // const startTime = req.body.startTime;
    // const endTime = req.body.endTime;
    const startDate = req.body.startDate;
    // const endDate = req.body.endDate;
    const source = req.body.source;
    const destination = req.body.destination;

    const flightDetailsQuery = "select flight_table.flight_id, flight_table.source_city, flight_table.destination_city, flight_details.end_time, flight_details.availability, flight_details.price, flight_details.start_date, flight_details.status, flight_details.start_time from flight_table INNER JOIN flight_details ON flight_table.flight_id = flight_details.flight_id WHERE flight_table.source_city = ? and flight_table.destination_city = ? and flight_details.start_date =? and flight_details.availability > 0;";
    pool.query(flightDetailsQuery, [source,destination,startDate], (err, result) => {
        console.log(result);
        console.log(err);
        if (err) {
            res.status(409).json({ message: "Error occured Try again" });
        }

        res.status(200).json({
            
            flight_id: result[0].flight_id,
            source: result[0].source_city,
            destination: result[0].destination_city,
            startDate: result[0].start_date,
            end_time: result[0].end_time,
            availability: result[0].availability,
            price: result[0].price,
            status: result[0].status,
            start_time: result[0].start_time

        });
    });
});


module.exports = router;