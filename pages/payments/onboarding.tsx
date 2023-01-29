import Layout from "@/components/layout/layout";
import "@/components/layout/connectWrapper"
import ConnectWrapper from "@/components/layout/connectWrapper"
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'


export default function OnboardingPage () {

    const router = useRouter()
    const fetcher = (url:URL) => fetch(url).then(res=>res.json())
    const {data, error} = useSWR('/api/onboarding', fetcher)

    function handleClick (e){
        e.preventDefault()
        if(data){
            router.push(data.url)
        }
    }
    return (
        <div>
            <Layout title="Onboarding">
                <h1>onboarding</h1>
                <button onClick={handleClick}>Enable payments</button>
            </Layout>
        </div>
    )
}

/* export default function OnboardingUI() {
    const onOnboardingComplete = () => {
      console.log('Onboarding complete');
    };
  
    return <ConnectOnboarding onOnboardingComplete={onOnboardingComplete} />;
}

function ConnectOnboarding({onOnboardingComplete}){

    const elementRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }
        const currentElement = elementRef.current;
        
        const handleOnboardingCompleteEvent = (ev) => {
            // When the user completes onboarding, call the react callback
            onOnboardingComplete();
        };

        currentElement.addEventListener('onboardingcomplete', handleOnboardingCompleteEvent);
            return () => {  
                currentElement.removeEventListener('onboardingcomplete', handleOnboardingCompleteEvent);
            };
    }, [elementRef, onOnboardingComplete]);

    return (
        <StripeWrapper>
            <stripe-connect-account-onboarding ref={elementRef} />
        </StripeWrapper>
    );
} */
