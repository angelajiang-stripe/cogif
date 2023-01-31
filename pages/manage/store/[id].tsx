import Layout from '@/components/layout/layout'
import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Onboarding from '@/components/payments/onboarding'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Transactions, Payouts} from '@/components/payments/dashboard';
import { StoreAvatar } from '@/components/store/avatar';
import Link from 'next/link';

type Stores = Array<{
    id: number,
    name: string,
    description: string,
    stripe_account_id: string,
}>

export default function Page({data}:{data: Stores}){
    const store = data[0]
    return(
        <Layout>
            <div className='container'>
              <Link href="/manage">&larr; My Stores</Link>
              <h2>Manage Store</h2>
              
              <div className='pd-top-3 pd-bottom-2 flex'>
                <div className='col1'>
                  <StoreAvatar name={store.name} />
                  <h3>{store.name}</h3>
                  <p>{store.description}</p>  
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
                  <h2>Any content 1</h2>
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
              .container {width: 80%; margin: 0 auto;}  
              .tabContainer {width: 80%; margin 0 auto;}
              .col1 {width: 70%;}
              .col2 {width: 30%;}
            `}</style>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    const id = ctx.params?.id
  
    // Run queries with RLS on the server
    const { data, error } = await supabase.from('stores').select('id, name, description, stripe_account_id').eq('id',id)
  
    return {
      props: {
        data: data ?? [],
      },
    }
  }