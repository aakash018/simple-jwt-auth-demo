import styled from "styled-components"

interface Props {
    backgroundColor?: string,
    borderColor?: string,
    focusBorderColor?:string,
    focusBackgroundColor?: string
    width?: string
}


export const InputStyles = styled.input<Props> `
    width: ${props => props.width? props.width : "300px"};
    height: 35px;
    outline: none;
    border: 1px solid grey;

    background-color: ${props => props.backgroundColor? props.backgroundColor : "white"};

    font-family: "Poppins";
    margin: 3px;

    ::focus {
        outline: none;
        border: ${props => props.focusBorderColor};
        background-color: ${props => props.focusBackgroundColor}
    }
`