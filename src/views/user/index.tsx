'use client';
import React, { useEffect, useState } from 'react';
import FlexWrapper from './ui/FlexWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import UserSummaryContainer from './ui/UserSummaryContainer';
import UserSchoolContainer from './ui/UserSchoolContainer';
import UserCareerContainer from './ui/UserCareerContainer';
import UserPostContainer from './ui/UserPostContainer';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { useSearchParams } from 'next/navigation';
import { getUserInfo } from './api/getUserInfo';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import { UserInfo } from '@/shared/type/user';

const UserPage: React.FC = () => {
    const searchParams = useSearchParams();
    const paramsEmail = searchParams.get('email');
    const authData = useRecoilValue(authDataState);
    const visitorEmail = authData?.email.toString();

    // Base64로 인코딩된 이메일을 디코딩합니다.
    const hostEmail = paramsEmail ? Buffer.from(paramsEmail, 'base64').toString('utf-8') : '';
    // userData를 상태로 관리
    const [userData, setUserData] = useState<UserInfo>();

    useEffect(() => {
        const fetchData = async () => {
            if (hostEmail && visitorEmail) {
                try {
                    const data = await getUserInfo(hostEmail, visitorEmail);
                    console.log('유저데이터기본', data);
                    setUserData(data);
                } catch (error) {
                    console.error('유저 데이터를 가져오는 중 오류가 발생했습니다:', error);
                }
            }
        };

        fetchData();
    }, [hostEmail, visitorEmail]);
    return (
        <PageWrapper padding="5%">
            {hostEmail}
            <FlexWrapper>
                {userData && (
                    <>
                        <UserSummaryContainer
                            name={userData.userName}
                            majorName={userData.majorName}
                            studentNumber={userData.studentNumber}
                            introduce={userData.oneLiner}
                            profileUrl={userData.profileUrl}
                            followerCount={userData.followerCount}
                        />
                        <SizedBox width="70%" />
                        <ColumnWrapper gap="1em">
                            <UserSchoolContainer
                            // ducationList={userData.educationList}
                            />
                            <UserCareerContainer
                            // careerList={userData.careerIdList}
                            />
                            <UserPostContainer
                            // postList={userData.postIdList}
                            />
                        </ColumnWrapper>
                    </>
                )}
            </FlexWrapper>
        </PageWrapper>
    );
};

export default UserPage;
