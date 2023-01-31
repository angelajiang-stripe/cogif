import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try{
        const accountLink = await stripe.accountLinks.create({
            account: req.query.account,
            refresh_url: `${process.env.NEXT_PUBLIC_HOST}/manage/store/${req.query.store}`,
            return_url: `${process.env.NEXT_PUBLIC_HOST}/manage/store/${req.query.store}`,
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