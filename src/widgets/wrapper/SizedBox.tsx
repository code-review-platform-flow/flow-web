import styled from "styled-components";

interface SizedBoxProps {
    height?: string;
}

export const SizedBox = styled.div<SizedBoxProps>`
    width : 100%;
    height :${(props) => props.height || '0.5em'}; 
`