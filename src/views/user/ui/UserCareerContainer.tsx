import Container from '@/widgets/container/Container';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { Career, CareerData } from '@/shared/type/user';
import { getCareer } from '../api/getCareer';
import ModifyIcon from './ModifyIcon';
import { postCareer } from '../api/postCareer';
import Button from '@/widgets/button/Button';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';

interface UserCareerContainerProps {
    careerList: Career[]; // 이력 목록
    own: boolean;
    email: string;
}

const UserCareerContainer: React.FC<UserCareerContainerProps> = ({ careerList, own, email }) => {
    const [careerData, setCareerData] = useState<CareerData[]>([]);
    const [deletedItems, setDeletedItems] = useState<CareerData[]>([]);
    const [editCareer, setEditCareer] = useState(false);
    const [isNewEntry, setIsNewEntry] = useState(false);

    useEffect(() => {
        fetchCareerData();
    }, [careerList]);

    const fetchCareerData = async () => {
        try {
            const data = await Promise.all(
                careerList.map(async (career) => {
                    const careerData = await getCareer(career.careerId);
                    return { ...careerData, careerId: career.careerId };
                }),
            );
            setCareerData(data);
            console.log('이력 데이터 로드 완료:', data);
        } catch (error) {
            console.error('이력 데이터 불러오기 오류:', error);
        }
    };

    const handleCareerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCareerData((prev) => prev.map((career, i) => (i === index ? { ...career, [name]: value } : career)));
    };

    const handleSave = async () => {
        const validCareerData = careerData.filter((career) => {
            if (career.careerId) {
                return true; // 기존 항목은 유효
            } else {
                // 새로 추가된 항목은 필수 값 확인
                return (
                    career.startDate?.trim() !== '' && career.title.trim() !== '' && career.description.trim() !== ''
                );
            }
        });

        if (validCareerData.length === 0 && deletedItems.length === 0) {
            alert('유효한 이력 정보가 없습니다.');
            return;
        }

        try {
            console.log('저장할 데이터:', validCareerData);
            console.log('삭제할 데이터:', deletedItems);

            // 유효한 데이터 저장
            for (const career of validCareerData) {
                await postCareer(
                    email,
                    career.careerId ?? null,
                    career.title,
                    career.description,
                    career.startDate!,
                    career.endDate!,
                );
            }

            // 삭제된 데이터 처리
            for (const deleted of deletedItems) {
                if (deleted.careerId) {
                    await postCareer(email, deleted.careerId, '', '', '', ''); // 빈 값으로 삭제 처리
                }
            }

            alert('이력이 저장되었습니다!');
            setEditCareer(false);
            setIsNewEntry(false);
            setDeletedItems([]); // 삭제 항목 초기화
            setCareerData(validCareerData);
            window.location.reload();
        } catch (error) {
            console.error('이력 저장 중 오류 발생:', error);
            alert('이력 저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleDelete = (index: number) => {
        setCareerData((prev) => {
            const itemToDelete = prev[index];
            if (itemToDelete.careerId) {
                setDeletedItems((prevDeleted) => [...prevDeleted, itemToDelete]);
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleAddNewEntry = () => {
        setCareerData((prev) => [
            ...prev,
            { careerId: null, title: '', startDate: '', endDate: '', description: '' } as CareerData,
        ]);
        setEditCareer(true);
        setIsNewEntry(true);
    };

    return (
        <Container width="100%">
            <RowWrapper justifyContent="space-between">
                <SemiTitle>이력</SemiTitle>
                {own &&
                    (editCareer ? (
                        <Button tertiary size="small" label="저장" onClick={handleSave} />
                    ) : (
                        <ModifyIcon onClick={() => handleAddNewEntry()} />
                    ))}
            </RowWrapper>
            <SizedBox height="0.5em" />
            <ColumnWrapper gap="1em">
                {careerData.map((career, index) => (
                    <RowWrapper key={index} gap="1em">
                        {editCareer || isNewEntry ? (
                            <>
                                <NewEducationInput1
                                    type="text"
                                    name="startDate"
                                    value={career.startDate ?? ''}
                                    onChange={(e) => handleCareerChange(index, e)}
                                    maxLength={4}
                                    placeholder="시작 년도"
                                    autoFocus
                                />
                                <Line>~</Line>
                                <NewEducationInput1
                                    type="text"
                                    name="endDate"
                                    value={career.endDate ?? ''}
                                    onChange={(e) => handleCareerChange(index, e)}
                                    maxLength={4}
                                    placeholder="종료 년도"
                                />
                                <NewEducationInput
                                    type="text"
                                    name="title"
                                    value={career.title}
                                    onChange={(e) => handleCareerChange(index, e)}
                                    placeholder="회사명 및 직책"
                                />
                                <NewEducationInput
                                    type="text"
                                    name="description"
                                    value={career.description}
                                    onChange={(e) => handleCareerChange(index, e)}
                                    placeholder="업무 내용"
                                />
                                <DeleteButton onClick={() => handleDelete(index)}>x</DeleteButton>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </RowWrapper>
                ))}
            </ColumnWrapper>
        </Container>
    );
};

export default UserCareerContainer;

const NewEducationInput = styled.input`
    border-radius: 1em;
    background: #f5f5f7;
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
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
    width: 9ch;
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

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    gap: 1em;
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
