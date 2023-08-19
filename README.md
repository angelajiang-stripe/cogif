# CoGif

White-labeled platform payments. To test payment flows:
- create an account
- create a store to "sell gifs"
- onboard to stripe to be able to accept payments
- once you are enabled for payments, create a product (enablement may take 1 min)
- buy your product on the open marketplace
- see the transaction flow to your shop
- try out refunds and disputes flows
- check out payouts
## Stack
This is a full-stack Next.js app that uses API routes to handle server-side requests. The backend is Supabase with a Postgres DB under the hood.

**Services**
- Stripe for payments
- Giphy for Gifs
- Vercel for deployment
- Supabase for backend

## Development

run `yarn dev` to develop and serve on http://localhost:3000
