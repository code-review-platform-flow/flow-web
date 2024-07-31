import styled from 'styled-components';

interface RowWrapperProps {
    gap?: string;
}

export const RowWrapper = styled.div<RowWrapperProps>`
    display: flex;
    align-items: center;
    gap: ${(props) => props.gap || '0'};
`;
