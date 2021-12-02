const router = require("express").Router();
const { request } = require("express");
const pool = require("../utils/connection");


router.post("/addPayment", (req, res) => {

    const userId = req.body.userId;
    const payingFromPoints = req.body.payingFromPoints;
    // const bookingId = req.body.bookingId;
    const cardName = req.body.cardName;
    const expiryDate = req.body.expiryDate;
    const cvv = req.body.cvv;
    const price = req.body.price;

    console.log(userId);


    const addPaymentQuery = "INSERT INTO payment (user_id, card_name,expiry_date,cvv) VALUES (?,?, ?,?);";
    const getUserPoints = "select user_flying_credits from users where user_id = ?"

    if (payingFromPoints == 1) {
        pool.query(getUserPoints, [userId], (err, resultUserPoints) => {

            console.log("points" + resultUserPoints[0].user_flying_credits);
            console.log("type = " + typeof resultUserPoints);
            const userPoints = resultUserPoints[0].user_flying_credits;
            console.log(typeof userPoints + " " + userPoints);
            console.log(typeof parseInt(price) + " " + price);


            if (userPoints >= parseInt(price)) {
                console.log("yes you can pay points will be deducted");
                pool.query(addPaymentQuery, [userId, "Flying Points", "Flying Points", "Flying Points"], (err, resultPaymentFlyingPoints) => {
                    if (err) {
                        console.log(err);
                        res.status(409).json({ message: "Error occured while adding" });
                    }


                    const reduceFlyingPoints = "UPDATE users SET `user_flying_credits` = `user_flying_credits` - (?) WHERE  user_id=?";

                    pool.query(reduceFlyingPoints, [price, userId], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(409).json({ message: "Error occured while reducing points from user table" });
                        }


                        res.status(200).json({ message: "Success in payment", paymentId: resultPaymentFlyingPoints.insertId });

                    })

                })


            } else {
                res.status(200).json({ message: "Sorry You dont have enought flying points. Try buying with credit card" });
            }

        });

    } else {
        pool.query(addPaymentQuery, [userId, cardName, expiryDate, cvv], (err, result) => {
            if (err) {
                console.log(err);
                res.status(409).json({ message: "Error occured while adding" });
            }


            res.status(200).json({ message: "Success in adding payment", paymentId: result.insertId });

        })

    };




});


module.exports = router;