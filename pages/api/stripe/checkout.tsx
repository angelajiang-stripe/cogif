import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const body = JSON.parse(req.body)
        const appFee = body.price * 0.05 //take an application fee

         // Create authenticated Supabase Client
        const supabase = createServerSupabaseClient({ req, res })
        
        // Check if we have a session
        const {
            data: { user },
        } = await supabase.auth.getUser()
        
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_HOST}/p/buy?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}/p/buy?cancelled=true`,
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
            customer_email: user?.email,
            payment_intent_data: {
              application_fee_amount: appFee,
            },
            metadata: {
              product_id: body.product_id,
              user_id: user?.id,
              store_id: body.store_id
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