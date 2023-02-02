import React from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

type Props = {
    storeId: number,
    accountId: string
}

export default function Onboarding(props:Props) {

    const router = useRouter()
    
    const fetcher = (url:URL) => fetch(url).then(res=>res.json())
    const {data, error} = useSWR(`/api/stripe/account?account=${props.accountId}`, fetcher)

    async function handleClick (e:React.SyntheticEvent){
        e.preventDefault()
        try {
            const response = await fetch(`/api/stripe/onboarding?account=${props.accountId}&store=${props.storeId}`)
            const data = await response.json()
            router.push(data.url)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="container">
            <div className="content">
                <div className="pd-bottom-1">
                    <h4>CoGif Payments 💳</h4>
                    <p className="secondary-text">CoGif takes a 5% transaction fee.</p>
                    <p>{data?.charges_enabled ? '✅' : '⛔'} accept payments</p>
                </div>
                <button onClick={handleClick} className="btn-secondary">Enable Payments</button>
            </div>
            <style jsx>{`
                .container {border: 1px solid lightgrey; background-color: white; border-radius: 10px;}    
                .content {padding: 16px 24px 32px;}
            `}</style>
        </div>
    )
}
