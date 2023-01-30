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
                .main {padding: 16px 32px;}    
            `}</style>
        </div>
    )
}

export default Layout