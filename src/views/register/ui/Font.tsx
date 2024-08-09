import styled from "styled-components";

export const Title = styled.div`
    font-size : 1.375em;
    font-weight : 700;
    color: #292929;
`;

export const SemiTitle = styled.div`
    font-size : 0.75em;
    font-weight : 700;
    color : #737373;
`;

export const ErrorMessage = styled.div`
    padding-left :0.75em;
    box-sizing : border-box;
    color: red;
    font-size: 0.75em;
    margin-top: 0.25em;
`;

export const SuccessMessage = styled(ErrorMessage)`
    color : blue;
`