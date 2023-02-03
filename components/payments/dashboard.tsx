import ConnectWrapper from "@/components/wrappers/connectWrapper";
import { useState } from "react";

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

type Props = {
    accountId: string
}

export function Payouts(props:Props) {
    const [color, setColor] = useState('#FFFFFF')

    return (
        <div className="pd-top-1">
            <div className="text-center pd-bottom-2">
                <h3>Payouts</h3>
            </div>
            <div className="pd-right-2 pd-left-2">
                <ConnectWrapper accountId={props.accountId}>
                    <stripe-connect-payouts />
                </ConnectWrapper>
            </div>
        </div>
    )
}

export function Transactions(props:Props){
    return(
        <div className="pd-top-1">
            <div className="text-center pd-bottom-2">
                <h3>Transactions</h3>
            </div>
            <div className="pd-right-2 pd-left-2">
                <ConnectWrapper accountId={props.accountId}>
                    <stripe-connect-payments />
                </ConnectWrapper>
            </div>
        </div>
    )
}