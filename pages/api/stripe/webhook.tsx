import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { buffer } from "micro";

const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = "whsec_3baf08a0f662299bb5eb0c9b2b47c07ae3d31307020751ce93d7c4abdb5015be";

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

  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user_id = session?.user.id

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      const {product_id} = checkoutSessionCompleted.metadata
      const { error } = await supabase.from('orders').insert({ product_id: product_id, user_id: user_id })
      if(error){
        console.error(error)
      }
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end()
    
}