import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import ProfileImage2 from '../../../../public/images/profileImageExample2.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/shared/type/type';

interface HallofFameListProps {
    hallOfFameData?: User[];
}

// userName: string;
// profileUrl: string;
// majorName: string;
// studentNumber: number;


const HallofFameList: React.FC<HallofFameListProps> = ({ hallOfFameData = [] }) => {
    const router = useRouter();

    return (
        <ColumnWrapper gap="0.75em">
            <Medium>🏆 명예의 전당</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="0.75em">
                    {hallOfFameData &&
                        hallOfFameData.map((item, index) => (
                            <UserInfo key={index}>
                                <Rank>{index + 1}</Rank>
                                <ProfileImage
                                    src={item.profileUrl}
                                    alt={`Profile image of ${item.userName}`}
                                    width={50}
                                    height={50}
                                />
                                <Username>{item.userName}</Username>
                            </UserInfo>
                        ))}
                </ColumnWrapper>
                <Link href={'/hall-of-fame'}>
                    <Button tertiary label="더보기" size="wide" />
                </Link>
            </Container>
        </ColumnWrapper>
    );
};

export default HallofFameList;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;

    &:last-child {
        margin-bottom: 1.5em;
    }
`;

const Rank = styled.div`
    font-size: 0.875em;
    color: #8e8e8e;
    width: 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 10px;
    margin-right: 0.5em;
    width: 2em;
    height: 2em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;
