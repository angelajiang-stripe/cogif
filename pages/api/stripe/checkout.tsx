import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const body = JSON.parse(req.body)
        const appFee = body.price * 0.05 //take an application fee
        
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_HOST}/shop?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}/shop?cancelled=true`,
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: body.name,
                    images: [body.image]
                  },
                  unit_amount: body.price
                },
                quantity: 1
              },
            ],
            mode: 'payment',
            payment_intent_data: {
              application_fee_amount: appFee,
            },
          }, {stripeAccount: body.account_id});

          //send checkout url
          res.json({url: session.url})
    } catch(error:any){
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
}