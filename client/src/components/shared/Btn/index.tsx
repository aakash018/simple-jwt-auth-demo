import { Button, BtnStyleType } from "./style";

type BtnType = "submit" | "reset" | "button"

interface Props {
    onClick?: () => void,
    type: BtnType,
    width?: string,
    styleType: BtnStyleType,
}

const Btn:React.FC<Props> = ({children, onClick, type, width, styleType}) => {
    return (
        <>
            <Button onClick={onClick} type={type} width={width? width : null} styleType={styleType}>{children}</Button>
        </>
    )
}

export default Btn;