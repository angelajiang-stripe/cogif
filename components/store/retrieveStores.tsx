import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link";
import useSWR from 'swr'
import { StoreCard, Store } from "./storeCard";

const RetrieveStores = () => {

    type Stores = Array<Store>

    const user = useUser()

    const fetcher = (url:URL) => fetch(url).then(res => res.json());
    const {data:stores, error, isLoading}:{data: Stores, error: any, isLoading: boolean} = useSWR(`/api/supabase/stores?id=${user?.id}`, fetcher)

    if(!stores || isLoading){
        return null
    }

    if(error){
        return(
            <div>
                <p>Error loading data</p>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="pd-bottom-3 flex">
                <div className="col1">
                    <h2>My Stores</h2>
                    <p className="secondary-text">A store represents a distinct business with its own P&L and products. You may have multiple stores.</p>
                </div>
                <div className="col2 flex">
                    <Link href="/manage/create">
                        <button className="btn-secondary">Create New Store</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap">
                {stores.map(s => {return(
                    <StoreCard store={s} key={s.id}/>
                )})}
            </div>
            <style jsx>{`
                .container {margin: 0 auto; width: 60%}
                .col1 {width: 70%;}
                .col2 {width: 30%; align-items: center; justify-content: flex-end;}
            `}</style>

        </div>
    )
}

export default RetrieveStores