import styled from "styled-components";

interface SizedBoxProps {
    height?: string;
    width?: string;
}

export const SizedBox = styled.div<SizedBoxProps>`
    width : ${(props) => props.width || '100%'}; 
    height :${(props) => props.height || '0.5em'}; 
`