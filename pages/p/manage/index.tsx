import Layout from "@/components/layout/layout";
import RetrieveStores from '@/components/store/retrieveStores'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Stores } from "@/types/types";

export default function Page({data}:{data:Stores}) {

    return (
        <Layout>
            <RetrieveStores stores={data}/>
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
    const { data } = await supabase.from('stores').select(`id, name, description`).eq('user_id', user_id)
  
    return {
      props: {
        data: data ?? [],
      },
    }
  }
