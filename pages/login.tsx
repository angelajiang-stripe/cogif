import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Layout from '@/components/layout/layout'
import Account from '@/components/account'

export default function LoginPage() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Layout>
      <div>
        {!session ? (
          <Auth 
            supabaseClient={supabase} 
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#20b2aa',
                    brandAccent: '#1a8e88',
                  },
                },
              },
            }}
            providers={['google']} 
          />
        ) : (
          <Account session={session}/>
        )}
      </div>
    </Layout>
  )
}


