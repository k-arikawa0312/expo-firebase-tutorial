import  Ionicons  from 'react-native-vector-icons/Ionicons'

interface Props {
    name: string;
    size: number;
    color: string;
}

const Icon = (props: Props): JSX.Element => {
    const { name, size, color } = props
    return (
        <Ionicons name={name} size={size} color={color} />
    )
}

export default Icon