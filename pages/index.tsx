import Layout from "@/components/layout/layout"
import Link from "next/link";
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import colors from "@/styles/colors.module.scss"
import { Textmark } from "@/components/layout/logos";
import { useSession } from "@supabase/auth-helpers-react";

export default function HomePage () {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY as string)
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 })

  const session = useSession()

  return (
    <div>
      <Layout>
        <div className="heroText">
          <Textmark size="120px"/>
        </div>

        <div className="heroSubText">
          <h1>Buy and sell gifs with your co-workers</h1>
          <p>The leading solution for multi-party <span>fun</span> flows</p>
          <div className="pd-top-1 flex-center">
            <div className="pd-right-1">
              {session ? 
                <Link href="/p/manage">
                  <button className="btn-primary">Sell Gifs</button>
                </Link> 
                :
                <Link href="/auth">
                  <button className="btn-primary">Create an Account</button>
                </Link>
              }
            </div>
          </div>
        </div>

        <div className="flex-center">
          <Grid width={900} columns={3} fetchGifs={fetchGifs} noLink={true} hideAttribution={true} />
        </div>
        
      </Layout>

      <style jsx>{`
        .heroText {display: flex; justify-content: center; padding-top: 60px;}
        .heroSubText {text-align: center; padding-bottom: 80px;}
        .heroSubText p {font-size: 20px;}
        .heroSubText span {animation: color-change 2s infinite; font-weight: 800;}
        @keyframes color-change {
          0% { color: ${colors.primary} }
          50% { color: ${colors.secondary} }
          100% { color: ${colors.primary} }
        }
      `}</style>
    </div>
  )
}
