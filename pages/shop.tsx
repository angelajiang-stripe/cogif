import Layout from "@/components/layout/layout"
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Products } from "@/types/types"
import CheckoutCard from "@/components/shop/checkoutCard"
import { useEffect, useState } from "react"
import colors from "@/styles/colors.module.scss"

export default function BrowsePage ({data}:{data:Products}) {

    const [message, setMessage] = useState('')

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          setMessage('You successfully bought a gif!')
        }
    
        if (query.get('canceled')) {
          setMessage('Order canceled -- continue to shop around and checkout when you’re ready.')
        }
    }, []);
    
    return (
        <Layout>
            <div className="container">
                <div className="text-center pd-bottom-1">
                    <h2>Shop gifs!</h2>
                    <p>Buy gifs with <a className="link" href="https://stripe.com/docs/testing#cards" target="_blank" rel="noreferrer">test-mode</a> money.</p>
                    <p><span className="message">{message}</span></p>
                </div>
               
                <div className="flex flex-wrap">
                    {data.map(product=>{return(
                        <CheckoutCard product={product} key={product.id}/>
                    )})}
                </div>
                
            </div>
            <style jsx>{`
                .container {width: 100%; margin: 0 auto;}
                .message {background-color: ${colors.secondary}}
                .link {text-decoration: underline;}
            `}</style>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
  
    // Run queries with RLS on the server
    const { data, error } = await supabase.from('products').select('id, name, image, price, stores(id, name, stripe_account_id)')
  
    return {
      props: {
        data: data ?? [],
      },
    }
  }