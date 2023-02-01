import { useState } from "react";
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Image from "next/image";

export default function CreateProduct(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState(10)
    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [showGif, setShowGif] = useState(false) 

    async function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`/api/supabase/product`, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    price: price*100,
                    image: image
                })
            });
            const data = await res.json();
            setMessage('Product created!')
        } catch (err) {
            console.log(err);
            setMessage('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    function handleSearch(image:string){
        setShowGif(false)
        setImage(image)
    }

    return (
        <div>
            <div className="container">
                <h2>Create a Product</h2>
                
                <button className="btn-secondary" onClick={() => setShowGif(!showGif)}>Get a Gif</button>
                {showGif ? <GifSearch handleSearch={handleSearch}/> : null}
                
                <div className="pd-top-2">
                    {image ? 
                        <Image src={image} height={300} width={300} alt="gif" />
                    :
                        null    
                    }
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="gif name"/>
                    </div>
                    <div className="inputBox">
                        <label>Price $</label>
                        <input type="number" min="1" step="1" value={price} onChange={(e)=>setPrice(e.target.valueAsNumber)}/>
                    </div>
                    <div className="pd-top-2">
                        <button className="btn-primary" type="submit">{loading ? 'Processing...' : 'Create Product'}</button>
                        <p className="secondary-text">{message}</p>
                    </div>
                </form>
            </div>
                
            <style jsx>{`
                .container {margin: 0 auto; width: 60%;}    
                .inputBox {display: flex; justify-content: space-between; width: 40%; margin: 16px 0; align-items: center;}
                .inputBox input {width: 60%;}
            `}</style>
        </div>
    )
}

type GifProps = {
    handleSearch: (value: string) => void,
}

const GifSearch = (props:GifProps) => {
    const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY as string)
    const fetchGifs = (offset: number) => gf.search(query, { offset, limit: 10, type: "gifs" })

    const [query, setQuery] = useState('')

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="start typing"/>
            <Grid 
                width={800} 
                columns={3} 
                gutter={6} 
                fetchGifs={fetchGifs} 
                key={query} 
                noLink={true}
                hideAttribution={true}
                onGifClick={gif => props.handleSearch(gif.images.fixed_height.url)}
            />
        </div>
    )
}


