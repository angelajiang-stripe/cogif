import Link from "next/link"
import { StoreAvatar } from "./avatar"
import colors from '@/styles/colors.module.scss'
import { Store } from "@/types/types"

export type Props = {
    store: Store
}

export function StoreCard (props:Props){
    return (
        <>
            <div className='card storeCard clickable'>
                <Link href={`/p/manage/store/${props.store.id}`}>
                    <div className="content">
                        <StoreAvatar name={props.store.name}/>
                        <h3>{props.store.name}</h3>
                        <p>{props.store.description}</p>
                    </div>
                </Link>
            </div>

            <style jsx>{`
                .storeCard {width: 25%; margin: 16px; border-top: 8px solid ${colors.primary}}    
                .content {padding: 16px 32px; text-align: center;}
                @media screen and (max-width: 900px) {
                    .storeCard {width: 100%;}
                    .storeCard {margin: 16px 0;}
                }
            `}</style>
        </>
    )
}