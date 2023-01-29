import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try{
        const accountLink = await stripe.accountLinks.create({
            account: 'acct_1MVMXbGhwaBYsqxI',
            refresh_url: 'http://localhost:3000/payments/onboarding',
            return_url: 'http://localhost:3000/payments/onboarding',
            type: 'account_onboarding',
            collect: 'eventually_due',
        });
    
        res.json(accountLink)
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
    }
    
}