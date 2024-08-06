import styled from 'styled-components';

interface RowWrapperProps {
    gap?: string;
    justifyContent?:  string;
    alignItems?: string;
}

export const RowWrapper = styled.div<RowWrapperProps>`
    display: flex;
    width : 100%;
    position : relative;
    align-items: ${(props) => props.alignItems || 'center'};
    gap: ${(props) => props.gap || '0'};
    justify-content : ${(props) => props.justifyContent || 'flex-start'}
`;
