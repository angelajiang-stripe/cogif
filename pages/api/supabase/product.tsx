import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == 'POST') {
        
         // Create authenticated Supabase Client
        const supabase = createServerSupabaseClient({ req, res })
        
        // Check if we have a session
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (!session)
            return res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated',
            })

        const user_id = session.user.id
        const body = JSON.parse(req.body)

        // Run queries with RLS on the server
        const { data } = await supabase.from('products').insert({
            name: body.name,
            description: body.description,
            image: body.image,
            price: body.price,
            user_id: user_id,
        })
        res.json(data)
    }

}

export default handler