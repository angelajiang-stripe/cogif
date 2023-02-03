import { PropsWithChildren } from "react";
import Header from "./header";
import Head from "next/head";

const Layout = (props:PropsWithChildren) => {
    return (
        <div>
            <Head>
                <meta charSet="utf8" />
                <title>CoGif</title>
            </Head>
            <Header />
            <div className="main">
                {props.children}
            </div>
            <style jsx>{`
                .main {padding: 40px 32px 24px;}    
            `}</style>
        </div>
    )
}

export default Layout