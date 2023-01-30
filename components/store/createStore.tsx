import { SyntheticEvent, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

const CreateStore = () => {
    const supabase = useSupabaseClient()
    const user = useUser()

    const [company, setCompany] = useState('')
    const [handle, setHandle] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e:SyntheticEvent){
        e.preventDefault()
        setLoading(true)

        //get connect account id
        const account_id = await getAccountId(company, user?.email)
       
        try {
            const store = {
                user_id: user?.id,
                name: company,
                handle: handle,
                stripe_account_id: account_id,
            }

            let {error} = await supabase.from('stores').insert(store)
            if (error) throw error
            
        } catch(error){
            console.log(error)
            setMessage('Sorry, something went wrong.')
        } finally {
            setLoading(false)
            setMessage('Store created!')
        }
    }

    async function getAccountId(company:string, email?:string){
         //get connect account id
         const response = await fetch('/api/stripe/create_account', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                company: company
            })
         })
         const account = await response.json()
         console.log(account)
         return account.id
    }

    return (
        <div>
            <h2>Create a Store</h2>
            <p>Create a store to sell your gif wares. Each store is a separate business entity.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>company name</label>
                    <input type="text" value={company} onChange={e=>setCompany(e.target.value)}/>
                </div>
                <div>
                    <label>handle</label>
                    <input type="text" value={handle} onChange={e => setHandle(e.target.value)}/>
                </div>
                <button type="submit">{loading ? 'Processing...' : 'Create Store'}</button>
                <p className="secondary-text">{message}</p>
            </form>
        </div>
    )
}

export default CreateStore