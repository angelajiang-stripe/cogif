import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method == 'POST'){
        try {
            const body = JSON.parse(req.body)
            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                email: body.email,
                business_type: 'company',
                company: {
                    name: body.company,
                },
                capabilities: {
                  card_payments: {requested: true},
                  transfers: {requested: true},
                },
            });
    
            res.json(account)
        } catch (error:any) {
            console.error('An error occurred when calling the Stripe API to create an account session', error);
            res.status(500);
            res.send({error: error.message});
        }
    } else {
        res.status(405).end('Method not allowed')
    }
    
}