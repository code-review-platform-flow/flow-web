import Container from '@/widgets/container/Container';
import React, { useEffect, useState } from 'react';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { getEducation } from '../api/getEducation';
import { EducationData } from '@/shared/type/user';
import { Education } from '@/shared/type/user';
import ModifyIcon from './ModifyIcon';
import styled from 'styled-components';
import { postEducation } from '../api/postEducation';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import Button from '@/widgets/button/Button';

interface UserSchoolContainerProps {
    educationList: Education[]; // 교육 목록
    own: boolean;
    email: string;
}

const UserSchoolContainer: React.FC<UserSchoolContainerProps> = ({ educationList, own, email }) => {
    const [educationData, setEducationData] = useState<EducationData[]>([]);
    const [editEducation, setEditEducation] = useState(false);

    useEffect(() => {
        fetchEducationData();
    }, [educationList]);

    const fetchEducationData = async () => {
        try {
            const data = await Promise.all(educationList.map((education) => getEducation(education.educationId)));
            setEducationData(data);
        } catch (error) {
            console.error('Education data fetching error:', error);
        }
    };

    const handleEducationChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEducationData((prev) =>
            prev.map((education, i) => (i === index ? { ...education, [name]: value } : education)),
        );
    };

    const handleSave = async () => {
        try {
            for (const education of educationData) {
                await postEducation(
                    email,
                    education.educationId,
                    education.schoolName,
                    education.startDate,
                    education.endDate || null,
                );
            }
            alert('학력이 저장되었습니다!');
            setEditEducation(false);
        } catch (error) {
            console.error('학력 저장 중 오류 발생:', error);
            alert('학력 저장에 실패했습니다.');
        }
    };

    const handleDelete = (index: number) => {
        setEducationData((prev) =>
            prev.map((education, i) => (i === index ? { ...education, schoolName: '' } : education)),
        );
    };

    return (
        <Container width="100%">
            <RowWrapper justifyContent="space-between">
                <SemiTitle>학력</SemiTitle>
                {own &&
                    (editEducation ? (
                        <Button tertiary size="small" label="저장" onClick={handleSave} />
                    ) : (
                        <ModifyIcon onClick={() => setEditEducation(true)} />
                    ))}
            </RowWrapper>
            <SizedBox height="0.5em" />

            <ColumnWrapper gap="1em">
                {educationData.map((education, index) => (
                    <RowWrapper key={education.educationId} gap="3em">
                        {editEducation ? (
                            <>
                                <NewEducationInput1
                                    type="text"
                                    name="startDate"
                                    value={education.startDate}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    maxLength={4}
                                    autoFocus
                                />
                                <Line>~{education.educationId}</Line>
                                <NewEducationInput1
                                    type="text"
                                    name="endDate"
                                    value={education.endDate}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    maxLength={4}
                                />
                                <NewEducationInput
                                    type="text"
                                    name="schoolName"
                                    value={education.schoolName}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <DeleteButton onClick={() => handleDelete(index)}>x</DeleteButton>
                            </>
                        ) : (
                            <>
                                <YearTitle width="30%">
                                    {education.startDate} ~ {education.endDate}
                                </YearTitle>
                                <YearDescription>{education.schoolName}</YearDescription>
                            </>
                        )}
                    </RowWrapper>
                ))}
            </ColumnWrapper>
        </Container>
    );
};

export default UserSchoolContainer;

const NewEducationInput = styled.input`
    width: 100%;
    text-align: start;
    border: none;
    font-family: 'Pretendard';
    &:focus {
        outline: none;
        color: #000000;
    }
    color: #999999;
`;

const NewEducationInput1 = styled(NewEducationInput)`
    text-align: start;
    width: 6ch;
`;

const Line = styled.div`
    text-align: center;
    color: #999999;
    margin-right: 1em;
`;

const DeleteButton = styled.div`
    cursor: pointer;
    color: red;
    font-weight: bold;
    margin-left: 1em;
`;
