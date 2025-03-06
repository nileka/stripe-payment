const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51QytiuPrKq3vBCYTfElx8zWj4UTTgYudVmjdfNNb38FIQcjg4PEQgv8QLqIstYp4U6DAQS5ijDsT2shIZ8T8Fhov00cVoPqxsk"); // Replace with your Stripe Secret Key

const app = express();
app.use(cors());
app.use(express.json());

// Create a Payment Intent
app.post("/create-payment-intent", async (req, res) => {
    const {amount, currency} = req.body;  // Amount in cents (e.g., 500 for $5.00)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
