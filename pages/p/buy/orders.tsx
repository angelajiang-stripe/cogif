import Layout from "@/components/layout/layout"
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Orders } from "@/types/types"
import OrderCard from "@/components/buy/orderCard"

export default function Page({data}:{data:Orders}){
    return (
        <Layout>
            <div className="container">
                
                <h2>My Gifs</h2>
                <p>Purchased gifs will show up here.</p>
                <div className="flex-center flex-wrap">
                    {data.map(order => {return(
                        <OrderCard order={order} key={order.id} />
                    )})}
                </div>
            </div>
            <style jsx>{`
                .container {margin: 0 auto; width: 80%;}    
                @media screen and (max-width: 900px){
                    .container {width: 100%;}
                }
            `}</style>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    const user_id = session?.user.id
  
    // Run queries with RLS on the server
    const { data, error } = await supabase.from('orders').select('id, created_at, products(id, name, image, price), stores(id, name)').eq('user_id', user_id)
    console.error(error)
  
    return {
      props: {
        data: data ?? [],
      },
    }
  }