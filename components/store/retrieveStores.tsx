import { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import Avatar from "boring-avatars";
import Link from "next/link";

const RetrieveStores = () => {

    type Store = Array<{
        id: string,
        name: string,
        handle: string
    }>

    const user = useUser()
    const supabase = useSupabaseClient()

    const [stores, setStores] = useState<Store>([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getStores(user?.id)
    }, [])

    async function getStores(id?:string) {
        setLoading(true)

        try {
            let {data, error, status}  = await supabase.from('stores').select(`id, name, handle`).eq('user_id', id)

            if (error && status !== 406) {
                throw error
            }

            if(data){
                setStores(data)
            }
        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="pd-bottom-3 flex">
                <div className="col1">
                    <h2>My Stores</h2>
                    <p className="secondary-text">A store represents a distinct business with its own P&L and products. You may have multiple stores.</p>
                </div>
                <div className="col2 flex">
                    <Link href="/sell/store/create">
                        <button className="btn-secondary">Create New Store</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap">
                {stores.map(s => {return(
                    <div key={s.id} className='card storeCard clickable'>
                        <div className="content">
                            <Avatar
                                size={70}
                                name={s.handle}
                                variant="beam"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                            <h3>{s.name}</h3>
                            <p>{s.handle}</p>
                        </div>
                    </div>
                )})}
            </div>
            <style jsx>{`
                .container {margin: 0 auto; width: 60%}
                .col1 {width: 70%;}
                .col2 {width: 30%; align-items: center; justify-content: flex-end;}
                .storeCard {width: 25%; margin: 16px;}    
                .content {padding: 16px 32px; text-align: center;}
            `}</style>

        </div>
    )
}

export default RetrieveStores