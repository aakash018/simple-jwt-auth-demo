import { InputStyles } from "./style"

type Type = "text" | "password" | "email"

interface Props {
    type?: Type,
    onChange: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string,
}

const Input:React.FC<Props> = ({type, onChange, placeholder}) => {

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <>
            <InputStyles type={type? type : "text"} onChange={handleChange} placeholder={placeholder}/>
        </>
    )
}

export default Input
