import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

type AppProps = {
    session: Session
}

export default function Account(props:AppProps) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')

  useEffect(() => {
    getProfile()
  }, [props.session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id, full_name, avatar_url, created_at`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        //console.log(data)
      }
    } catch (error) {
      //alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <div>
        <div>
            <h2>user: {user.id}</h2>
        </div>
        <div>
            <button onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>
        </div>
    </div>
  )
}