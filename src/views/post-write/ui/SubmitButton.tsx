import Button from '@/widgets/button/Button';
import React from 'react';
import styled from 'styled-components';

interface SubmitButtonProps {}

const SubmitButton: React.FC<SubmitButtonProps> = ({}) => {
    return (
        <RightWrapper>
            <StyledButton $primary size="medium" label="작성완료" onClick={() => console.log('작성완료')} />
        </RightWrapper>
    );
};

export default SubmitButton;

const RightWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const StyledButton = styled(Button)`
    width: 152px;
`;
