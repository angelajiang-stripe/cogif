import Head from "next/head";
import { PropsWithChildren } from "react";
import Link from "next/link";

type LayoutProps = {
    title: string,
}

const Layout = (props:PropsWithChildren<LayoutProps>) => {
    return (
        <div>
            <Head>
                <title>{props.title} | CoGif</title>
            </Head>
            <Header />
            <div className="main">
                {props.children}
            </div>
            <Footer />
            <style jsx>{`
                .main {padding: 16px 32px;}    
            `}</style>
        </div>
    )
}

const Header = () => {
    return (
        <div>
            <div className="container">
                <div className="linkContainer">
                    <Link href="/">Home</Link>
                </div>
                <div className="linkContainer">
                    <Link href="/browse">Browse GifShops</Link>
                </div>
                <div className="linkContainer">
                    <Link href="/payments">My GifShop</Link>
                </div>
                <div className="linkContainer">
                    <Link href="/payments/payouts">Payouts</Link>
                </div>
            </div>

            <style jsx>{`
                .container {display: flex;}
                .linkContainer {background-color: red; padding: 8px 16px;}
            `}</style>
        </div>        
    )
}

const Footer = () => {
    return (
        <div>

        </div>
    )
}

export default Layout