import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/widgets/container/Container';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { getEducation } from '../api/getEducation';
import { EducationData } from '@/shared/type/user';
import { Education } from '@/shared/type/user';
import ModifyIcon from './ModifyIcon';
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
    const [isNewEntry, setIsNewEntry] = useState(false);

    useEffect(() => {
        fetchEducationData(educationList);
    }, [educationList]);

    const fetchEducationData = async (educationList: Education[]) => {
        try {
            const data = await Promise.all(
                educationList.map(async (education) => {
                    const educationData = await getEducation(education.educationId);
                    return { ...educationData, educationId: education.educationId };
                }),
            );
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
                    education.educationId!,
                    education.schoolName,
                    education.startDate,
                    education.endDate,
                );
            }
            alert('학력이 저장되었습니다!');
            setEditEducation(false);
            setIsNewEntry(false); // 새로운 입력 모드 초기화
        } catch (error) {
            console.error('학력 저장 중 오류 발생:', error);
            alert('학력 저장에 실패했습니다.');
            setEditEducation(false);
        }
    };

    const handleDelete = (index: number) => {
        setEducationData((prev) =>
            prev.map((education, i) =>
                i === index
                    ? {
                          ...education,
                          schoolName: '',
                          startDate: '',
                          endDate: '',
                      }
                    : education,
            ),
        );
    };

    const handleAddNewEntry = () => {
        setEducationData((prev) => [
            ...prev,
            { educationId: null, schoolName: '', startDate: '', endDate: '' } as EducationData,
        ]);
        setIsNewEntry(true);
    };

    return (
        <Container width="100%">
            <RowWrapper justifyContent="space-between">
                <SemiTitle>학력</SemiTitle>
                {own && (
                    <>
                        {editEducation ? (
                            <Button tertiary size="small" label="저장" onClick={handleSave} />
                        ) : (
                            <ModifyIcon
                                onClick={() => {
                                    setEditEducation(true);
                                    handleAddNewEntry();
                                }}
                            />
                        )}
                    </>
                )}
            </RowWrapper>
            <SizedBox height="0.5em" />

            <ColumnWrapper gap="1em">
                {educationData.map((education, index) => (
                    <RowWrapper key={index} gap="3em">
                        {editEducation || isNewEntry ? (
                            <>
                                <NewEducationInput1
                                    type="text"
                                    name="startDate"
                                    value={education.startDate}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    maxLength={4}
                                    autoFocus
                                />
                                <Line>~</Line>
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
    border-radius: 1em;
    background: #f5f5f7;
    font-size: 0.8125em;
    padding: 0.5em;
    box-sizing: border-box;
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
    color: #004e96;
    font-weight: bold;
    margin-left: 1em;
`;
