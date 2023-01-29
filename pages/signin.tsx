import {supabase} from '@/lib/supabase'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

const CustomTheme = {
    default: {
        colors: {
          brand: 'hsl(153 60.0% 53.0%)',
          brandAccent: 'hsl(154 54.8% 45.1%)',
          brandButtonText: 'white',
          // ..
        }
      }
}

export default function SigninPage() {
    
    return (
        <div>
            <Auth
                supabaseClient={supabase}
                appearance={{ 
                    theme: ThemeSupa,
                    variables: {
                        default: {
                          colors: {
                            brand: 'red',
                            brandAccent: 'darkred',
                          },
                        },
                      },
                 }}
            />
        </div>
    )
    
}