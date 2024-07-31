import styled from 'styled-components';

interface RowWrapperProps {
    gap?: string;
}

export const RowWrapper = styled.div<RowWrapperProps>`
    display: flex;
    align-items : center;
    gap: ${(props) => props.gap || '0'};  // gap을 props로 받아서 설정, 기본값은 '0'
`;
