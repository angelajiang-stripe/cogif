import { Product } from '@/types/types';
import Image from 'next/image';
import colors from "@/styles/colors.module.scss"
import { loadStripe } from '@stripe/stripe-js';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import { formatCurrency } from '../utils/utils';

type Props = {
    product: Product
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PK as string
  );

const CheckoutCard = (props:Props) => {
    
    const [loading, setLoading] = useState(false)

    const checkoutObj = {
        product_id: props.product.id,
        account_id: props.product.stores?.stripe_account_id,
        store_id: props.product.stores?.id,
        name: props.product.name,
        image: props.product.image,
        price: props.product.price
    }

    async function handleCheckout(e:SyntheticEvent){
        e.preventDefault()
        setLoading(true)
        try{
            const res = await fetch('/api/stripe/checkout', {
                method: "POST",
                body: JSON.stringify(checkoutObj)
            })
            const data = await res.json()
            console.log(data)
            if(data.url){
                window.location.href = data.url;
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <div className='gifcard'>
                <form onSubmit={handleCheckout}>
                    <div className='content'>
                        <h3>{props.product.name}</h3>
                        <p className='secondary-text'>by {props.product.stores!.name}</p>
                        <p className='primary-color'><b>${formatCurrency(props.product.price)}</b></p>
                        <Image 
                            src={props.product.image}
                            height={200}
                            width={200}
                            alt="gif"
                        />
                        
                        </div>
                        <div className='pd-top-1'>
                            <button type="submit" className='checkout-btn'><b>{loading ? 'Processing...' : 'Buy Now'}</b></button>
                        </div>
                </form>
                
            <style jsx>{`
                .gifcard {width: 25%; border-radius: 10px; border: 1px solid lightgrey; margin: 16px;}
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
                @media screen and (max-width: 900px){
                    .gifcard {width: 100%; margin: 16px 0;}
                }
            `}</style>    
        </div>
    )
}

export default CheckoutCard