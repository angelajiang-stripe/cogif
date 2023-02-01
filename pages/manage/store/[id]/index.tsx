import Layout from '@/components/layout/layout'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Onboarding from '@/components/payments/onboarding'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Transactions, Payouts} from '@/components/payments/dashboard';
import { StoreAvatar } from '@/components/store/avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListProducts from '@/components/products/listProducts';
import { Stores } from '@/types/types';
import useSWR from "swr"

export default function Page({data}:{data: Stores}){
    const store = data[0]
    const router = useRouter()
    const {id} = router.query
    
    const fetcher = (url:URL) => fetch(url).then(res=>res.json())
    const {data: connect_account, error} = useSWR(`/api/stripe/account?account=${store.stripe_account_id}`, fetcher)

    return(
        <Layout>
            <div className='container'>
              <Link href="/manage">&larr; Return to my stores</Link>
              <h2>Manage {store.name}</h2>
              <p className='secondary-text'>{store.description}</p>  
              
              <div className='bar'></div>
              
              <div className='pd-top-3 pd-bottom-2 flex'>
                <div className='col1'>
                <StoreAvatar name={store.name} size={50}/>
                  <h4>Store Checklist</h4>
                  <ul>
                    <li>Onboard your account to accept payments</li>
                    <li>Create a product to sell</li>
                    <li>Make sure someone buys your product</li>
                    <li>Review your transactions and payouts lists</li>
                  </ul>
                </div>
                <div className='col2'>
                  <Onboarding storeId={store.id} accountId={store.stripe_account_id} />
                </div>
              </div>
              
              <Tabs>
                <TabList>
                  <Tab>Products</Tab>
                  <Tab>Transactions</Tab>
                  <Tab>Payouts</Tab>
                </TabList>

                <TabPanel>
                <div className='text-center pd-top-1'>
                  {connect_account?.charges_enabled ? 
                      <Link href={`/manage/store/${id}/product`}>
                        <button className='btn-primary'>Create a Product</button>
                      </Link>
                  : 
                      <p>Please enable payments first in order to create a product.</p>
                  }
                  </div>
                  <ListProducts products={store.products!}/>
                </TabPanel>
                <TabPanel>
                  <Transactions accountId={store.stripe_account_id}/>
                </TabPanel>
                <TabPanel>
                  <Payouts accountId={store.stripe_account_id}/>
                </TabPanel>
              </Tabs>
            </div>

            <style jsx>{`
              .container {width: 80%; margin: 0 auto; }  
              .tabContainer {width: 80%; margin 0 auto;}
              .col1 {width: 70%;}
              .col2 {width: 30%;}
              .bar {width:100%; height: 1px; background-color: lightgrey;}
            `}</style>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    const id = ctx.params?.id
  
    // Run queries with RLS on the server
    const { data, error } = await supabase.from('stores').select('id, name, description, stripe_account_id, products(id, name, image, price)').eq('id',id)
  
    return {
      props: {
        data: data ?? [],
      },
    }
  }