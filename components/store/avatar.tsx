import Avatar from "boring-avatars"


type Avatar = {
    name: string,
    size?: number
}

export const StoreAvatar = (props:Avatar) => {
    return (
        <Avatar
            size={props.size || 70}
            name={props.name}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
    )
}