import { Product } from '@/types/types';
import Image from 'next/image';
import colors from "@/styles/colors.module.scss"
import { loadStripe } from '@stripe/stripe-js';
import { SyntheticEvent } from 'react';
import { useState } from 'react';


type Props = {
    product: Product,
    created_at: string,
}

const OrderCard = (props:Props) => {

    const created_at = new Date(props.created_at).toLocaleDateString()

    return (
        <div className='gifcard'>
            
            <div className='content'>
                <h3>{props.product.name}</h3>
                <p className='secondary-text'>${props.product.price/100} | sold by {props.product.stores!.name}</p>
                <p>{created_at}</p>
                <Image 
                    src={props.product.image}
                    height={200}
                    width={200}
                    alt="gif"
                />
            </div>
                
            <style jsx>{`
                .gifcard {width: 20%; border-radius: 10px; border: 1px solid lightgrey; margin: 16px;}
                .content {padding: 16px 24px; text-align: center;}
            `}</style>    
        </div>
    )
}

export default OrderCard