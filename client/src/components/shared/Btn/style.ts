import styled from "styled-components"

export type BtnStyleType = "primary" | "secondary"

interface Props {
    width?: string | null,
    styleType: BtnStyleType
}


export const Button = styled.button`
    width: ${(props: Props) => props.width ? props.width : "150px"};
    background-color: ${(props: Props) => props.styleType === "primary" ? "red" : "blue"};
    height: 30px;

    border: none;
    outline: none;
    border-radius: 10000px;
    color: white;

    font-family: "Poppins";

    cursor: pointer;
`