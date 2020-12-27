import styled from "styled-components"

interface Props {
    width?: string | null,
}


export const Button = styled.button<Props>`
    width: ${props => props.width ? props.width : "150px"};
    height: 30px;

    cursor: pointer;
`