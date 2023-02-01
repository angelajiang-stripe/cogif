
import Image from "next/image";
import { Products } from "@/types/types";

type Props = {
    products: Products
}

export default function ListProducts (props:Props) {

    return (
        <div className="pd-top-1 flex flex-wrap">
            {props.products.map(p => {return(
                <div key={p.id} className="gifcard">
                    <div className="content">
                        <h3>{p.name}</h3>
                        <p>${p.price/100}</p>
                        <Image src={p.image} height={150} width={150} alt="gif" />
                    </div>
                </div>
            )})}
            <style jsx>{`
                .gifcard {width: 25%; border: 1px solid lightgrey; border-radius: 10px; margin: 16px;}
                .content {padding: 4px 24px 16px; text-align: center;}
            `}</style>
        </div>
    )
}