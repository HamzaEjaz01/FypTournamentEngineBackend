const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51I7MxrImK1h8PcwnpgZeACgOSEAICJ4gbm78ZPBD99pcRqrdTMDXdo8wycujmsv1kLSsoc4r7yThBbnuqxA5wOYU00QbPQPi7E");
// const uuid = require("uuid"); //not allow to pay twice
const app = express();
//middleware
app.use(express.json());

router.post("/", async (req, res) => {
    console.log("we are in payment route")
    const { tournament, token } = req.body;
    console.log("tournament ", token);
    console.log("Entry fee ", tournament.entryfee);
    console.log(token.email);
    console.log("now");
    try {
        await stripe.customers
            .create({
                email: token.email,
                source: token.id
            })
            .then(customer => {
                console.log("0");
                stripe.charges.create(
                    {
                        amount: tournament.entryfee * 100,
                        currency: "usd",
                        customer: customer.id,
                        receipt_email: token.email,
                        description: `purchase of ${tournament.name}`,
                    },

                );
                console.log("hamza end");
            }).then(result => res.status(200).json(result))
    }
    catch (errors) {
        error => console.log(error)
    }


});

module.exports = router;