import Link from "next/link";
import { StoreCard } from "./storeCard";
import { Stores } from "@/types/types";

type Props = {
    stores: Stores
}


const RetrieveStores = (props:Props) => {

    return (
        <div className="container">
            <div className="pd-bottom-3 flex">
                <div className="col1">
                    <h2>My Stores</h2>
                    <p className="secondary-text">A store represents a distinct business with its own P&L and products. You may have multiple stores.</p>
                </div>
                <div className="col2 flex">
                    <Link href="/p/manage/create">
                        <button className="btn-secondary">Create New Store</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap">
                {props.stores.map(s => {return(
                    <StoreCard store={s} key={s.id}/>
                )})}
            </div>
            <style jsx>{`
                .container {margin: 0 auto; width: 80%}
                .col1 {width: 70%;}
                .col2 {width: 30%; align-items: center; justify-content: flex-end;}
            `}</style>

        </div>
    )
}

export default RetrieveStores