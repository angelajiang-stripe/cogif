import Layout from "@/components/layout/layout";
import { useState } from "react";

export default function NewProductPage(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [image, setImage] = useState('')

    async function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault()
        try {
            const res = await fetch(`/api/stripe/product`, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price*100,
                    image: image
                })
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <Layout>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description: </label>
                        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type="number" min="1" step="1" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <div>
                        <label>Gif: </label>
                        <input type="string" value={image} onChange={(e)=>setImage(e.target.value)}/>
                    </div>
                    <button type="submit">Create Product</button>
                </form>
            </Layout>
        </div>
    )
}