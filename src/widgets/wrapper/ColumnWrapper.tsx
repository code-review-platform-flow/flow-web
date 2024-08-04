import styled from 'styled-components';

interface ColumnWrapperProps {
    gap?: string;
    justifyContent?:  string;
    alignItmes?: string;
}

export const ColumnWrapper = styled.div<ColumnWrapperProps>`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.alignItmes || 'start'};
    gap: ${(props) => props.gap || '0'};
    justify-content : ${(props) => props.justifyContent || ''}
`;
