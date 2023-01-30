import Layout from "@/components/layout/layout"
import Link from "next/link";
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'


export default function HomePage () {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY)
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 })

  return (
    <div>
      <Layout>
        <h1>CoGif</h1>
        <p>Spend money on your co-workers' funniest gifs. Mandatory fun.</p>
        
        <Link href="/payments/onboarding">
          Sign up to sell
        </Link>

        <Grid width={800} columns={3} fetchGifs={fetchGifs} />
        
      </Layout>
    </div>
  )
}