import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res: NextApiResponse) {

  if(req.method=='POST'){
    const body = JSON.parse(req.body)

    try{
        const product = await stripe.products.create({
            name: body.name,
            description: body.description,
            images: [body.image],
            default_price_data: {
              currency: "usd",
              unit_amount: body.price,
            }
        }, {stripeAccount: 'acct_1MVMXbGhwaBYsqxI'});
    
        res.json(product)
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
  } else {
    res.status(405).end('Method not allowed')
  }
}