import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    //create a connect account
    if(req.method == 'POST'){
        try {
            const body = JSON.parse(req.body)
            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                email: body.email,
                company: {
                    name: body.company,
                },
                business_type: "individual",
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
    } 

    //retrieve connect account
    if(req.method=='GET'){
        try {
            const account = await stripe.accounts.retrieve(
                req.query.account
              );
            res.json(account)
        } catch (error:any) {
            console.error('An error occurred when calling the Stripe API to create an account session', error);
            res.status(500)
            res.send({error: error.message})
        }
    }
    
}