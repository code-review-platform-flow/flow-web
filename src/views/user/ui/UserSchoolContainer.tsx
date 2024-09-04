import Container from '@/widgets/container/Container';
import React, { useEffect, useState } from 'react';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { getEducation } from '../api/getEducation';
import { EducationData } from '@/shared/type/user';
import { Education } from '@/shared/type/user';

interface UserSchoolContainerProps {
    educationList: Education[]; // 교육 목록
    own : boolean
}

const UserSchoolContainer: React.FC<UserSchoolContainerProps> = ({ educationList, own}) => {
    const [educationData, setEducationData] = useState<EducationData[]>([]);

    useEffect(() => {
        const fetchEducationData = async () => {
            console.log('교육정보 불러오기')
            try {
                const data = await Promise.all(
                    educationList.map((education) => getEducation(education.educationId)),
                );
                setEducationData(data);
                console.log(data)
            } catch (error) {
                console.error('Education data fetching error:', error);
            }
        };

        fetchEducationData();
    }, [educationList]);

    return (
        <Container width="100%">
            <SemiTitle>학력</SemiTitle>
            <SizedBox height="0.5em" />
            {educationData.map((user, index) => (
                <RowWrapper key={index} gap="3em">
                    <YearTitle>
                        {user.enterYear} ~ {user.quitYear}
                    </YearTitle>
                    <YearDescription>
                        {user.univName} {user.department}
                    </YearDescription>
                </RowWrapper>
            ))}
        </Container>
    );
};

export default UserSchoolContainer;
