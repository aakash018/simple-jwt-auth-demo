import { Button } from "./style";

type BtnType = "submit" | "reset" | "button"

interface Props {
    onClick?: () => void,
    type: BtnType,
    width?: string
}

const Btn:React.FC<Props> = ({children, onClick, type, width}) => {
    return (
        <>
            <Button onClick={onClick} type={type} width={width? width : null}>{children}</Button>
        </>
    )
}

export default Btn;