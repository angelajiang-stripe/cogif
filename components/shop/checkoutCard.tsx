import Link from 'next/link'
import { useEffect } from "react";
import { Product } from '@/types/types';
import Image from 'next/image';
import colors from "@/styles/colors.module.scss"

type Props = {
    product: Product
}

const CheckoutCard = (props:Props) => {

    const accountStr = `account_id=${props.product.stores?.stripe_account_id}`        
    const productStr = `name=${props.product.name}&image=${props.product.image}&price=${props.product.price}`

    return (
        <div className='gifcard'>
            
                <form action={`/api/stripe/checkout?${accountStr}&${productStr}`} method='POST'>
                    <div className='content'>
                        <h3>{props.product.name}</h3>
                        <p className='secondary-text'>${props.product.price/100} | sold by {props.product.stores!.name}</p>
                        <Image 
                            src={props.product.image}
                            height={300}
                            width={300}
                            alt="gif"
                        />
                        
                        </div>
                        <div className='pd-top-1'>
                            <button type="submit" className='checkout-btn'><b>Buy Now</b></button>
                        </div>
                </form>
                
            <style jsx>{`
                .gifcard {width: 30%; border-radius: 10px; border: 1px solid lightgrey; margin: 16px;}
                .content {padding: 16px 24px; text-align: center;}
                .checkout-btn {
                    width: 100%; 
                    padding: 16px 0; 
                    border: none; 
                    background-color: ${colors.primary}; 
                    border-bottom-left-radius: 10px; 
                    border-bottom-right-radius: 10px;
                    cursor: pointer;
                }
            `}</style>    
        </div>
    )
}

export default CheckoutCard