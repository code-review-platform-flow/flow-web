import Container from '@/widgets/container/Container';
import React, { useEffect, useState } from 'react';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { Career, CareerData } from '@/shared/type/user';
import { getCareer } from '../api/getCareer';
import ModifyIcon from './ModifyIcon';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { postCareer } from '../api/postCareer';
import Button from '@/widgets/button/Button';

interface UserCareerContainerProps {
    careerList: Career[]; // 이력 목록
    own: boolean;
    email: string;
}

const UserCareerContainer: React.FC<UserCareerContainerProps> = ({ careerList, own, email }) => {
    const [careerData, setCareerData] = useState<CareerData[]>([]);
    const [editCareer, setEditCareer] = useState(false);

    const fetchCareerData = async () => {
        console.log('이력 정보 불러오기');
        try {
            const data = await Promise.all(careerList.map((career) => getCareer(career.careerId)));
            setCareerData(data);
            console.log('이력데이터' + data);
        } catch (error) {
            console.error('Career data fetching error:', error);
        }
    };

    useEffect(() => {
        fetchCareerData();
    }, [careerList]);

    const handleCareerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCareerData((prev) =>
            prev.map((careerData, i) => (i === index ? { ...careerData, [name]: value } : careerData)),
        );
    };

    const handleSave = async () => {
        try {
            for (const career of careerData) {
                await postCareer(
                    email,
                    career.careerId,
                    career.title,
                    career.description,
                    career.startDate,
                    career.endDate,
                );
            }
            alert('이력이 저장되었습니다!');
            setEditCareer(false);
        } catch (error) {
            console.error('이력 저장 중 오류 발생:', error);
            alert('이력 저장에 실패했습니다.');
        }
    };

    const handleDelete = (index: number) => {
        setCareerData((prev) =>
            prev.map((education, i) => (i === index ? { ...education, schoolName: '' } : education)),
        );
    };

    return (
        <Container width="100%">
            <RowWrapper justifyContent="space-between">
                <SemiTitle>이력</SemiTitle>
                {own &&
                    (editCareer ? (
                        <Button tertiary size="small" label="저장" onClick={handleSave} />
                    ) : (
                        <ModifyIcon onClick={() => setEditCareer(true)} />
                    ))}
            </RowWrapper>
            <SizedBox height="0.5em" />
            {careerData.map((career, index) => (
                <RowWrapper key={index}>
                    {editCareer ? (
                        <>
                            <NewEducationInput1
                                type="text"
                                name="startDate"
                                value={career.startDate}
                                onChange={(e) => handleCareerChange(index, e)}
                                maxLength={4}
                                autoFocus
                            />
                            <Line>~</Line>
                            <NewEducationInput1
                                type="text"
                                name="endDate"
                                value={career.endDate}
                                onChange={(e) => handleCareerChange(index, e)}
                                maxLength={4}
                            />
                            <NewEducationInput
                                type="text"
                                name="title"
                                value={career.title}
                                onChange={(e) => handleCareerChange(index, e)}
                            />
                            <NewEducationInput
                                type="text"
                                name="description"
                                value={career.description}
                                onChange={(e) => handleCareerChange(index, e)}
                            />
                            <DeleteButton onClick={() => handleDelete(index)}>x</DeleteButton>
                        </>
                    ) : (
                        <GridWrapper>
                            <YearTitle>
                                {career.startDate} ~ {career.endDate}
                            </YearTitle>
                            <YearDescription>{career.title}</YearDescription>
                            <CareerCategory>{career.title}</CareerCategory>
                            <ColumnWrapper gap="0.8125em">
                                <CareerProduct>{career.title}</CareerProduct>
                                <ColumnWrapper gap="0.25em">
                                    <CareerDetailTask>{career.description}</CareerDetailTask>
                                </ColumnWrapper>
                            </ColumnWrapper>
                        </GridWrapper>
                    )}
                </RowWrapper>
            ))}
        </Container>
    );
};

export default UserCareerContainer;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    row-gap: 1em;
`;
const CareerCategory = styled.div`
    padding-left: 1em;
    box-sizing: border-box;
    font-size: 0.8125em;
    color: #999999;
`;
const CareerProduct = styled.div`
    font-size: 0.8125em;
`;

const CareerDetailTask = styled.div`
    font-size: 0.75em;
    opacity: 50%;
`;

const NewEducationInput = styled.input`
    border-radius : 1em;
    background : #F5F5F7;
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
