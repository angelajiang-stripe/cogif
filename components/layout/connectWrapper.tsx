import Script from "next/script"
import React, { PropsWithChildren, useEffect, useState } from "react"

const ConnectWrapper = (props: PropsWithChildren) => {

    const [hasError, setHasError] = useState(false)

    const fetchClientSecret = async () => {
        const response = await fetch('/api/account_session');
        const {client_secret: clientSecret} = await response.json();
        return clientSecret;
    }

    useEffect(()=>{
        (async () => {
            // Fetch the AccountSession client secret
            const response = await fetch('/api/account_session');
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
                          primary: '#2488c6',
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
            <div className="wrapper">
              <div className="container">
                {hasError ? 
                    <DisplayError />
                :
                  props.children
                }
              </div>
            </div>
            <style jsx>{`
                .wrapper {display: flex; justify-content: center;}
                .container {width: 80%;}  
            `}</style>
        </div>
    )
}

const DisplayError = () => {
    return (
        <div>
            <h1>ERROR</h1>
        </div>
    )
} 

export default ConnectWrapper