import Container from '@/widgets/container/Container';
import React from 'react';
import styled from 'styled-components';

interface HallOfFameUser {
    name: string;
    department: string;
    studentId: string;
    rank: number;
}

interface HallOfFameUserContainerProps {
}

const HallOfFameUserContainer: React.FC<HallOfFameUserContainerProps> = ({ }) => {

    const hallOfFameList: HallOfFameUser[] = [
        { name: "홍길동", department: "컴퓨터공학과", studentId: "20180001", rank: 1 },
        { name: "김철수", department: "전자공학과", studentId: "20180002", rank: 2 },
        { name: "이영희", department: "기계공학과", studentId: "20180003", rank: 3 },
        { name: "박영수", department: "화학공학과", studentId: "20180004", rank: 4 },
        { name: "최지현", department: "건축학과", studentId: "20180005", rank: 5 },
        { name: "장미희", department: "산업공학과", studentId: "20180006", rank: 6 },
        { name: "윤지훈", department: "물리학과", studentId: "20180007", rank: 7 },
        { name: "한지민", department: "생명과학과", studentId: "20180008", rank: 8 },
        { name: "서지수", department: "수학과", studentId: "20180009", rank: 9 }
    ];

    return (
        <GridWrapper>
            {hallOfFameList.map(user => (
                <Container size='small' key={user.studentId}>
                    {user.rank}위: {user.name} ({user.department}, {user.studentId})
                </Container>
            ))}
        </GridWrapper>
    );
};

export default HallOfFameUserContainer;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;
