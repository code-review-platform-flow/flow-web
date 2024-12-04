'use client';
import React, { useEffect, useState } from 'react';
import FlexWrapper from './ui/FlexWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import UserSummaryContainer from './ui/UserSummaryContainer';
import UserSchoolContainer from './ui/UserSchoolContainer';
import UserCareerContainer from './ui/UserCareerContainer';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { useSearchParams } from 'next/navigation';
import { getUserInfo } from './api/getUserInfo';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import { UserInfo } from '@/shared/type/user';
import UserPostList from './ui/UserPostList';
import styled from 'styled-components';

const UserPage: React.FC = () => {
    const searchParams = useSearchParams();
    const paramsEmail = searchParams.get('email');
    const authData = useRecoilValue(authDataState);
    const visitorEmail = authData?.email.toString();

    const hostEmail = paramsEmail ? Buffer.from(paramsEmail, 'base64').toString('utf-8') : '';

    const [userData, setUserData] = useState<UserInfo>();

    useEffect(() => {
        const fetchData = async () => {
            console.log();
            if (hostEmail && visitorEmail) {
                try {
                    const data = await getUserInfo(hostEmail, visitorEmail);
                    setUserData(data);
                } catch (error) {
                    console.error('유저 데이터를 가져오는 중 오류가 발생했습니다:', error);
                }
            } else if (!hostEmail) {
            }
        };

        fetchData();
    }, [hostEmail, visitorEmail]);
    return (
        <PageWrapper padding="5%">
            <FlexWrapper>
                {userData && (
                    <>
                        <UserSummaryContainer
                            email={hostEmail}
                            name={userData.userName}
                            majorName={userData.majorName}
                            studentNumber={userData.studentNumber}
                            oneLiner={userData.oneLiner}
                            profileUrl={userData.profileUrl}
                            followerCount={userData.followerCount}
                            own={userData.own}
                        />
                        <SizedBox width="50%" />
                        <StyledColumnWrapper width="60%" gap="1em">
                            <UserSchoolContainer
                                email={hostEmail}
                                educationList={userData.educationIdList}
                                own={userData.own}
                            />
                            <UserCareerContainer
                                email={hostEmail}
                                careerList={userData.careerIdList}
                                own={userData.own}
                            />
                            <UserPostList postList={userData.postIdList} own={userData.own} />
                        </StyledColumnWrapper>
                    </>
                )}
            </FlexWrapper>
        </PageWrapper>
    );
};

export default UserPage;

const StyledColumnWrapper = styled(ColumnWrapper)`
    @media (max-width: 768px) {
        width: 100%;
    }
`;
