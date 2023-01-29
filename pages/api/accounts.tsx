import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try{
        const accounts = await stripe.accounts.list({
            limit: 10,
        });
    
        res.json(accounts)
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
    
}