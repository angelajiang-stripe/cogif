import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { buffer } from "micro";

const stripe = require('stripe')(process.env.STRIPE_SK);

//note when using local forwarding, change to STRIPE_WEBHOOK_SECRET_LOCAL
const endpointSecret = process.env.NODE_ENV=='production' ? process.env.STRIPE_WEBHOOK_SECRET_PROD : process.env.STRIPE_WEBHOOK_SECRET_DEV

//get raw body
export const config = {
  api: {
      bodyParser: false,
  },
};
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err:any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Create Supabase Client
  const supabase = createServerSupabaseClient({ req, res })

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      const metadata = checkoutSessionCompleted.metadata

      //RLS is public
      const { error } = await supabase.from('orders').insert({ product_id: metadata.product_id, user_id: metadata.user_id, store_id: metadata.store_id })
      if(error){
        console.error(error)
      }
      
      break;
    // ... handle other event types
    default:
      //console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end()
    
}