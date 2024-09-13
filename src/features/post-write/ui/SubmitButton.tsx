import Button from '@/widgets/button/Button';
import React from 'react';
import styled from 'styled-components';

// onClick props의 타입을 정의합니다.
interface SubmitButtonProps {
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
    return (
        <RightWrapper>
            <Button $primary width="152px" size="medium" label="작성완료" onClick={() => onClick()} />
        </RightWrapper>
    );
};

export default SubmitButton;

const RightWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;
