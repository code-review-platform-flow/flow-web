import styled from 'styled-components';

interface RowWrapperProps {
    gap?: string;
    justifyContent?:  string;
    alignItmes?: string;
}

export const RowWrapper = styled.div<RowWrapperProps>`
    display: flex;
    width : 100%;
    align-items: ${(props) => props.alignItmes || 'center'};
    gap: ${(props) => props.gap || '0'};
    justify-content : ${(props) => props.justifyContent || 'flex-start'}
`;
