import express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';

//Set variables
dotenv.config()

//start server
const app = express();


app.use(express.static('public'));
app.use(express.json());


//Home
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
})

//cart

app.get("/cart.html", (req, res) => {
    res.sendFile("cart.html", { root: "public" });
})

//Success

app.get("/success.html", (req, res) => {
    res.sendFile("success.html", { root: "public" });
})

//Failed

app.get("/cancel.html", (req, res) => {
    res.sendFile("cancel.html", { root: "public" });
})

//stripe

let stripeGateway = stripe(process.env.stripe_key);
app.post("/stripe-checkout", async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(parseFloat(item.price) * 100)
        console.log("item-price:", item.price);
        console.log("unitAmount:", unitAmount);
        return {
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.title,
                    images: [item.image],

                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        }
    })
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://localhost:3000/success.html`,
        cancel_url: `http://localhost:3000/cancel.html`,
        billing_address_collection: "required",
        line_items: lineItems,
    })
    res.json({
        url: session.url
    })
})




app.listen(3000, () => {
    console.log('listing on port 3000');
});