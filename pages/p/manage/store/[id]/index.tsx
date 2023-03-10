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
import ConnectWrapper from '@/components/wrappers/connectWrapper';

export default function Page({data}:{data: Stores}){
    const store = data[0]
    const router = useRouter()
    const {id} = router.query
    
    const fetcher = (url:URL) => fetch(url).then(res=>res.json())
    const {data: connect_account, error} = useSWR(`/api/stripe/account?account=${store.stripe_account_id}`, fetcher)

    return(
        <Layout>
          <ConnectWrapper accountId={store.stripe_account_id}>
            <div className='container'>
              <Link href="/p/manage">&larr; Return to my stores</Link>
              <h2>Manage {store.name}</h2>
              <p className='secondary-text'>{store.description}</p>  
              
              <div className='bar'/>
              
              <div className='pd-top-3 pd-bottom-2 flex flex-wrap'>
                <div className='col1'>
                <StoreAvatar name={store.name} size={50}/>
                  <h4>Store Checklist</h4>
                  <ul>
                    <li>Onboard your account to accept payments</li>
                    <li>Once enabled, create a product to sell on the marketplace</li>
                    <li>Make sure someone buys your product (or buy it yourself!)</li>
                    <li>Review your transactions and payouts lists</li>
                    <li>Try refunding a payment!</li>
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
                      <Link href={`/p/manage/store/${id}/product`}>
                        <button className='btn-primary'>Create a Product</button>
                      </Link>
                  : 
                      <p>Please enable payments first in order to create a product.</p>
                  }
                  </div>
                  <ListProducts products={store.products!}/>
                </TabPanel>
                <TabPanel>
                    <div className="dashBox">
                        <Transactions />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="dashBox">
                        <Payouts />
                    </div>
                </TabPanel>
              </Tabs>
              
            </div>
          </ConnectWrapper>

          <style jsx>{`
            .container {width: 80%; margin: 0 auto; padding-bottom: 60px;}  
            .tabContainer {width: 80%; margin 0 auto;}
            .col1 {width: 70%;}
            .col2 {width: 30%;}
            .bar {width:100%; height: 1px; background-color: lightgrey;}
            .dashBox {padding: 32px 0;}

            @media screen and (max-width: 900px){
              .container {width: 100%;}
              .col1 {width: 100%;}
              .col2 {width: 100%; padding-top: 16px;}
            }
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