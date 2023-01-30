import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_HOST}/store?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}/store?cancelled=true`,
            line_items: [
              {price: 'price_1MVW8AGhwaBYsqxISIXkd7LZ', quantity: 1},
            ],
            mode: 'payment',
            payment_intent_data: {
              application_fee_amount: 123,
            },
          }, {stripeAccount: 'acct_1MVMXbGhwaBYsqxI'});
        
          //redirect user to session url
          res.redirect(303, session.url);
    } catch(error:any){
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
}