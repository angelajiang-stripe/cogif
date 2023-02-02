import { useEffect, useState } from "react";
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Image from "next/image";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function CreateProduct(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState(10)
    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [showGif, setShowGif] = useState(true) 
    const [query, setQuery] = useState('')

    const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY as string)
    const fetchGifs = (offset: number) => gf.search(query, { offset, limit: 10, type: "gifs" })

    const router = useRouter()
    const {id: store_id} = router.query
    const user = useUser()
    const supabase = useSupabaseClient()

    async function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault()
        setLoading(true)
        try {
            const product = {
                user_id: user?.id,
                store_id: store_id,
                name: name,
                price: price*100,
                image: image,
            }

            let {error} = await supabase.from('products').insert(product)
            if (error) throw error
            setMessage('Product created!')
            router.push(`/manage/store/${store_id}`)
        } catch (err) {
            console.log(err);
            setMessage('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    function handleSearch(query:string){
        setQuery(query)
        setShowGif(true)
    }

    function handleSelection(image:string){
        setShowGif(false)
        setImage(image)
    }

    return (
        <div>
            <div className="container">
                <Link href={`/p/manage/store/${store_id}`}>&larr; Return to store</Link>
                <h2>Create a Product</h2>
                
                <div className="inputBox">
                    <label>Search Gifs 🔍</label>
                    <input type="text" value={query} onChange={ e => handleSearch(e.target.value)} placeholder="start typing"/>
                </div>
                
                {showGif ? 
                    <Grid 
                        width={800} 
                        columns={3} 
                        gutter={6} 
                        fetchGifs={fetchGifs} 
                        key={query} 
                        noLink={true}
                        hideAttribution={true}
                        onGifClick={gif => handleSelection(gif.images.fixed_height.url)}
                    />
                    : null
                }
                
                {image ? 
                    <div className="imageContainer">
                        <Image src={image} height={300} width={300} alt="gif" />
                    </div>
                    :null    
                }
                                
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="gif name" required/>
                    </div>
                    <div className="inputBox">
                        <label>Price $</label>
                        <input type="number" min="1" step="1" value={price} onChange={(e)=>setPrice(e.target.valueAsNumber)} required/>
                    </div>
                    <div className="pd-top-2">
                        <button className="btn-primary" type="submit">{loading ? 'Processing...' : 'Create Product'}</button>
                        <p className="secondary-text">{message}</p>
                    </div>
                </form>
            </div>
                
            <style jsx>{`
                .container {margin: 0 auto; width: 60%;}    
                .inputBox {display: flex; justify-content: space-between; width: 50%; margin: 16px 0; align-items: center;}
                .inputBox input {width: 60%;}
                .imageContainer {padding: 16px 32px;}
            `}</style>
        </div>
    )
}



