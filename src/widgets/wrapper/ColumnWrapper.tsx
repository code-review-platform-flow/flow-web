import styled from 'styled-components';

interface ColumnWrapperProps {
    gap?: string;
}

export const ColumnWrapper = styled.div<ColumnWrapperProps>`
    width : 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.gap || '0'};  // gap을 props로 받아서 설정, 기본값은 '0'
`;
