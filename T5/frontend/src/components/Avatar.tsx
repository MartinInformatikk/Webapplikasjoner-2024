type AvatarProps = {
    name: String;
};

export default function Avatar(props: AvatarProps) {
    const {name} = props;
    const firstLetter = name.split(" ").join("").toUpperCase().slice(0, 1);
    return <div>
        <p className="avatar">{firstLetter}</p>
    </div>
}