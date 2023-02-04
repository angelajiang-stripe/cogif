import Link from "next/link";
import { Textmark } from "./logos";
import colors from '@/styles/colors.module.scss'
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import Image from "next/image";

const Header = () => {

    const [scroll, setScroll] = useState(false)
    const [menu, setMenu] = useState(false)

    const user = useUser()
    const supabase = useSupabaseClient()

    const router = useRouter()
    
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 50)
        })
    }, [])

    function handleLogout(){
        supabase.auth.signOut()
        router.push('/')
    }

    function handleMenu(){
        setMenu(!menu)
    }

    return (
        <div className={scroll ? "header border" : "header"}>
            <div className="content">
                <div className="markBox">
                    <Textmark withLogo={true} />    
                    <div className="mobileMenu" onClick={handleMenu}>
                        <Image src="/menu.png" height={32} width={32} alt="menu"/>
                    </div>  
                </div>
                <div className="linksBox">
                    {user ? 
                            <>
                                <div className="linkContainer">
                                    <span className="pill">{user?.email}</span>
                                </div>
                                <div className="linkContainer">
                                    <Link href="/p/manage">Sell Gifs</Link>
                                </div>
                                <div className="linkContainer">
                                    <Link href="/p/buy">Buy Gifs</Link>
                                </div>
                                <div className="linkContainer">
                                    <Link href="/p/buy/orders">My Gifs</Link>
                                </div>
                                <div className="linkContainer">
                                    <a onClick={handleLogout}>Logout</a>
                                </div>
                            </>
                        :
                            <div className="linkContainer">
                                <Link href="/auth">Login</Link>
                            </div>
                    }
                </div>
            </div>

            <style jsx>{`
                .header {
                    position: ${menu ? 'fixed' : 'sticky'};
                    width: 100%; 
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
                .textmarkBlock {display: block;}
                .linkContainer {padding: 8px 16px;}
                .pill {border-radius: 10px; font-size: small; background-color: ${colors.primary}; padding: 6px 10px; font-weight: 800;}
                .linksBox {display: flex;}
                .mobileMenu {display: none;}
                .markBox {display: block;}
                
                @media screen and (max-width: 900px) {
                    .content {display: block;}
                    .mobileMenu {display: block; display: flex; align-items: center;}
                    .markBox {display: flex; justify-content: space-between;}
                    .linksBox {display: ${menu ? 'block' : 'none'}; padding-top: 16px;}
                    .linkContainer {padding: 16px 0; text-align:right;}
                }
            `}</style>
        </div>        
    )
}

export default Header