import Layout from "@/components/layout/layout";
import "@/components/wrappers/connectWrapper"
import ConnectWrapper from "@/components/wrappers/connectWrapper"
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'


export default function OnboardingPage () {

    const router = useRouter()
    const fetcher = (url:URL) => fetch(url).then(res=>res.json())
    const {data, error} = useSWR('/api/stripe/onboarding', fetcher)

    function handleClick (e:React.SyntheticEvent){
        e.preventDefault()
        if(data){
            router.push(data.url)
        }
    }
    return (
        <div>
            <Layout>
                <h1>onboarding</h1>
                <button onClick={handleClick}>Enable payments</button>
            </Layout>
        </div>
    )
}
