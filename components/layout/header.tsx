import Link from "next/link";
import { Textmark, Logo } from "./logos";
import colors from '@/styles/colors.module.scss'
import { useEffect, useState } from "react";

const Header = () => {

    const [scroll, setScroll] = useState(false)
    
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 50)
        })
    }, [])

    return (
        <div className={scroll ? "header border" : "header"}>
            <div className="content">
                <Textmark withLogo={true} />
                <div className="container">
                    <div className="linkContainer">
                        <Link href="/">Home</Link>
                    </div>
                    <div className="linkContainer">
                        <Link href="/browse">Browse GifShops</Link>
                    </div>
                    <div className="linkContainer">
                        <Link href="/store">My GifShop</Link>
                    </div>
                    <div className="linkContainer">
                        <Link href="/payments">Payments</Link>
                    </div>
                    <div className="linkContainer">
                        <Link href="/payments/payouts">Payouts</Link>
                    </div>
                    <div className="linkContainer">
                        <Link href="/login">Account</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .header {
                    position: sticky;
                    width: 100%; 
                    align-items: center; 
                    z-index: 10; 
                    top: 0;
                }
                .border {border-bottom: 2px solid ${colors.primary};}
                .content {
                    display: flex; 
                    justify-content: space-between; 
                    padding: 16px 32px; 
                    background-color: white;
                }
                .container {display: flex;}
                .linkContainer {padding: 8px 16px;}
            `}</style>
        </div>        
    )
}

export default Header