import Link from "next/link";
import Image from "next/image";
import colors from "@/styles/colors.module.scss"

type Textmark = {
    withLogo?: boolean,
    size?: string
}

export const Textmark = (props:Textmark) => {
    return (
        <div>
            <Link href="/">
                <div className="titleContainer">
                    {props.withLogo ? <Logo /> : null}
                    <h1 className="title">CoGif</h1>
                </div>
            </Link>
            <style jsx>{`
                .title {
                    font-size: ${props.size || '40px'}; 
                    margin: 0; 
                    padding-left: 16px; 
                    font-weight: 800; 
                    background-image: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
                    background-clip: text;
                    color: transparent;
                }
                .titleContainer {display: flex; align-items: baseline;}
             `}</style>
        </div>
    )
}

export const Logo = () => {
    return (
        <div className="circle">
            <Image 
                src={'/cat.png'}
                width={30}
                height={30}
                alt="cat logo"
            />
            <style jsx>{`
                .circle {
                    border-radius: 50px; 
                    background-color: ${colors.primary};
                    padding: 6px 8px; 
                    box-shadow: 0 0 50px #ccc;
                }    
            `}</style>
        </div>
    )
}
