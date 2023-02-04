import * as React from 'react';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-connect-payments': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
        interface IntrinsicElements {
            'stripe-connect-payouts': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export function Payouts() {

    return ( 
        <stripe-connect-payouts />
    )
}

export function Transactions(){
    return(
        <stripe-connect-payments /> 
    )
}