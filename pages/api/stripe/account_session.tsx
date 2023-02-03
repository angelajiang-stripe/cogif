import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK,
    {
      apiVersion: '2022-08-01; embedded_connect_beta=v1',
    }
  );
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const accountSession = await stripe.accountSessions.create({
            account: req.query.account,
        });

        res.json({
            client_secret: accountSession.client_secret,
        });
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
    
}