import Link from 'next/link'
import { useEffect } from "react";

const Checkout = () => {

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <div>
            <h1>My GifStore</h1>    
                <p>This is my giftstore</p>
                <p>Here are all my gifs for sale</p>

                <form action="/api/stripe/checkout" method='POST'>
                    <button type="submit">Checkout</button>
                </form>

        </div>
    )
}

export default Checkout