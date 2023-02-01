import { Product } from '@/types/types';
import Image from 'next/image';
import colors from "@/styles/colors.module.scss"
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';


type Props = {
    product: Product
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PK as string
  );

const CheckoutCard = (props:Props) => {

    const router = useRouter()

    const checkoutObj = {
        account_id: props.product.stores?.stripe_account_id,
        name: props.product.name,
        image: props.product.image,
        price: props.product.price
    }

    async function handleCheckout(e:SyntheticEvent){
        e.preventDefault()
        const res = await fetch('/api/stripe/checkout', {
            method: "POST",
            body: JSON.stringify(checkoutObj)
        })
        const data = await res.json()
        const url = data.url
        console.log(data)
        if(data.url){
            router.push(url)
        }
    }

    return (
        <div className='gifcard'>
            
                <form onSubmit={handleCheckout}>
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