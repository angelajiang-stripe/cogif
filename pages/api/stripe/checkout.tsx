import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const priceData = parseInt(req.query.price as string)
        
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_HOST}/shop?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}/shop?cancelled=true`,
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: req.query.name,
                    images: [req.query.image]
                  },
                  unit_amount: req.query.price
                },
                quantity: 1
              },
            ],
            mode: 'payment',
            payment_intent_data: {
              application_fee_amount: priceData*0.05,
            },
          }, {stripeAccount: req.query.account_id});
        
          //redirect user to session url
          res.redirect(303, session.url);
    } catch(error:any){
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
}