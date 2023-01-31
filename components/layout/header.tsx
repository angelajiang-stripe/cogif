import Link from "next/link";
import { Textmark } from "./logos";
import colors from '@/styles/colors.module.scss'
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const Header = () => {

    const [scroll, setScroll] = useState(false)
    const user = useUser()
    const supabase = useSupabaseClient()
    
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 50)
        })
    }, [])

    function handleLogout(){
        supabase.auth.signOut()
    }

    return (
        <div className={scroll ? "header border" : "header"}>
            <div className="content">
                <Textmark withLogo={true} />    
                <div className="flex">
                    {user ? 
                        <div className="linkContainer">
                            <span className="pill">{user?.email}</span>
                        </div>
                    :
                        null
                    }
                    <div className="linkContainer">
                        <Link href="/shop">Shop Gifs</Link>
                    </div>
                    
                    {user ? 
                            <>
                                <div className="linkContainer">
                                    <Link href="/manage">Sell Gifs</Link>
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
                    <div className="linkContainer">
                        
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
                .textmarkBlock {display: block;}
                .linkContainer {padding: 8px 16px;}
                .pill {border-radius: 10px; font-size: small; background-color: ${colors.primary}; padding: 6px 10px; font-weight: 800;}
            `}</style>
        </div>        
    )
}

export default Header