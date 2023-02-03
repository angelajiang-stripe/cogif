import { Order } from '@/types/types';
import Image from 'next/image';

type Props = {
    order: Order,
}

const OrderCard = (props:Props) => {

    const created_at = new Date(props.order.created_at).toLocaleDateString()

    return (
        <div className='gifcard'>
            
            <div className='content'>
                <h3>{props.order.products.name}</h3>
                <p className='secondary-text'>by {props.order.stores.name}</p>
                <p className='primary-color'><b>${props.order.products.price/100}</b></p>
                <p>Purchased {created_at}</p>
                <Image 
                    src={props.order.products.image}
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