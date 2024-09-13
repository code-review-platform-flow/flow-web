'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import FlexWrapper from './ui/FlexWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import UserSummaryContainer from './ui/UserSummaryContainer';
import UserSchoolContainer from './ui/UserSchoolContainer';
import UserCareerContainer from './ui/UserCareerContainer';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { authDataState } from '@/features/auth/model';
import UserPostList from './ui/UserPostList';
import { getUserInfo } from './api/getUserInfo';
import { sharedEmailState } from '@/features/user/model';

const UserPage: React.FC = () => {
    const searchParams = useSearchParams();
    const paramsEmail = searchParams.get('email');
    const authData = useRecoilValue(authDataState);
    const setSharedEmailState = useSetRecoilState(sharedEmailState);
    const { hostEmail, visitorEmail } = useRecoilValue(sharedEmailState);

    useEffect(() => {
        const decodedHostEmail = paramsEmail ? Buffer.from(paramsEmail, 'base64').toString('utf-8') : undefined;
        const visitorEmail = authData?.email?.toString();
        setSharedEmailState({ hostEmail: decodedHostEmail, visitorEmail });
    }, [paramsEmail, authData, setSharedEmailState]);

    const {
        data: userData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['userInfo', hostEmail, visitorEmail],
        queryFn: () => getUserInfo(hostEmail, visitorEmail),
        enabled: !!hostEmail && !!visitorEmail,
    });

    if (!hostEmail) return <div>호스트 이메일이 제공되지 않았습니다</div>;
    if (!visitorEmail) return <div>인증되지 않았습니다</div>;
    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>오류가 발생했습니다: {(error as Error).message}</div>;
    if (!userData) return <div>사용자 데이터를 사용할 수 없습니다</div>;

    return (
        <PageWrapper padding="5%">
            <FlexWrapper>
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
                    <UserSchoolContainer email={hostEmail} educationList={userData.educationList} own={userData.own} />
                    <UserCareerContainer email={hostEmail} careerList={userData.careerIdList} own={userData.own} />
                    <UserPostList postList={userData.postIdList} own={userData.own} />
                </StyledColumnWrapper>
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
