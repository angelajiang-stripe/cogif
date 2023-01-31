import { SyntheticEvent, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

const CreateStore = () => {
    const supabase = useSupabaseClient()
    const user = useUser()

    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e:SyntheticEvent){
        e.preventDefault()
        setLoading(true)

        //get connect account id
        const account_id = await createStripeAccount(company, user?.email)
       
        try {
            const store = {
                user_id: user?.id,
                name: company,
                description: description,
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

    async function createStripeAccount(company:string, email?:string){
         //create connect account id
         const response = await fetch('/api/stripe/account', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                company: company
            })
         })
         const account = await response.json()
         return account.id
    }

    return (
        <div className="container">
            <h2>Create a Store</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label>Company Name</label>
                    <input type="text" value={company} onChange={e=>setCompany(e.target.value)} placeholder="gifstore" required/>
                </div>
                <div className="inputBox">
                    <label>Description</label>
                    <input type="text" value={description} onChange={e=>setDescription(e.target.value)} placeholder="certified fresh gifs" required/>
                </div>
                <div className="pd-top-2">
                    <button type="submit" className="btn-primary">{loading ? 'Processing...' : 'Create Store'}</button>
                    <p className="secondary-text">{message}</p>
                </div>
            </form>
            <style jsx>{`
                .container {margin: 0 auto; width: 60%;}    
                .inputBox {display: flex; justify-content: space-between; width: 40%; margin: 16px 0; align-items: center;}
                .inputBox input {width: 60%;}
            `}</style>
        </div>
    )
}

export default CreateStore