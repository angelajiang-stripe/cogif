import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = (props:PropsWithChildren) => {
    return (
        <div>
            <Header />
            <div className="main">
                {props.children}
            </div>
            <style jsx>{`
                .main {padding: 40px 32px 16px;}    
            `}</style>
        </div>
    )
}

export default Layout