import Link from "next/link";
import Image from "next/image";
import colors from "@/styles/colors.module.scss"


export const TextmarkLink = () => {
    return (
        <div>
            <Link href="/">
                <div className="titleContainer">
                    <Logo />
                    <TextMark fontSize="40px" />
                </div>
            </Link>
            <style jsx>{`
                .titleContainer {display: flex; align-items: baseline;}
             `}</style>
        </div>
    )
}

export const LogoLink = () => {
    return (
        <Link href="/">
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
        </Link>
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

type TextMarkProps = {
    fontSize: string
}

export const TextMark = (props:TextMarkProps) => {
    return (
        <div>
            <h1 className="title">CoGif</h1>
            <style jsx>{`
                .title {
                    font-size: ${props.fontSize}; 
                    margin: 0; 
                    padding-left: 16px; 
                    font-weight: 800; 
                    background-image: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
                    background-clip: text;
                    color: transparent;
                }
             `}</style>
        </div>
    )
}