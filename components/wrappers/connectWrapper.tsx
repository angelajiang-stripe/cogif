import Script from "next/script"
import React, { PropsWithChildren, useEffect, useState } from "react"
import colors from '@/styles/colors.module.scss'

type Props = {
  accountId: string
}

const ConnectWrapper = (props: PropsWithChildren<Props>) => {

    const [hasError, setHasError] = useState(false)

    const fetchClientSecret = async () => {
        const response = await fetch(`/api/stripe/account_session?account=${props.accountId}`);
        const {client_secret: clientSecret} = await response.json();
        return clientSecret;
    }

    useEffect(()=>{
        (async () => {
            // Fetch the AccountSession client secret
            const response = await fetch(`/api/stripe/account_session?account=${props.accountId}`);
            if (!response.ok) {
              // Handle errors on the client side here
              const {error} = await response.json();
              console.log('An error occurred: ', error)
              setHasError(true)
            } else {
              const {client_secret: clientSecret} = await response.json();
      
              // Initialize StripeConnect after the window loads
              if(window && window.StripeConnect) {
                window.StripeConnect.onLoad = () => {
                    window.StripeConnect.init({
                      // This is your test publishable API key.
                      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PK,
                      clientSecret,
                      refreshClientSecret: async () => {
                        return await fetchClientSecret();
                      },
                      appearance: {
                        colors: {
                          primary: colors.primary,
                        },
                      },
                      uiConfig: {
                        overlay: 'dialog',
                      }
                    });
                  };
                  setHasError(false)
              }
            }
            
          })()
    }, [])

    return (
        <div>
            <Script src="https://b.stripecdn.com/connect-js/v0.1/connect.js"/>
            {hasError ? 
              <p>Something went wrong.</p>
            : 
              props.children}
        </div>
    )
}

export default ConnectWrapper