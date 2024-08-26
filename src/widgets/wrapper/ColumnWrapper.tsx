import styled from 'styled-components';

interface ColumnWrapperProps {
    gap?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
}

export const ColumnWrapper = styled.div<ColumnWrapperProps>`
    width: ${(props) => props.width || '100%'};
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.alignItems || 'start'};
    gap: ${(props) => props.gap || '0'};
    justify-content: ${(props) => props.justifyContent || 'start'};
`;
