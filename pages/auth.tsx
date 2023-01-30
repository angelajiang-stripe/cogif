import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Layout from '@/components/layout/layout'
import colors from "@/styles/colors.module.scss"
import { useRouter } from 'next/router';

export default function AuthPage() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  if(session){
    router.push('/')
  }

  return (
    <Layout>
      <div className='container'>
          <h2>Login to continue</h2>
          <Auth 
            supabaseClient={supabase} 
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: colors.primary,
                    brandAccent: colors.primary_dark,
                  },
                },
              },
            }}
            //providers={['google']} 
          />
      </div>
      <style jsx>{`
          .container {width: 40%; margin: 0 auto;}
      `}</style>
    </Layout>
  )
}


