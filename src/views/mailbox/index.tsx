'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React, { useEffect, useState } from 'react';
import MailCategoryContainer from './ui/MailCategoryContainer';
import MailList from './ui/MailList';
import FlexWrapper from '../user/ui/FlexWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { useSearchParams, redirect } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import { getCoffee } from './api/getCoffee';
import { CoffechatListItem } from './model/type';

interface MailBoxPageProps {}

const MailBoxPage: React.FC<MailBoxPageProps> = () => {
    const [mailData, setMailData] = useState<CoffechatListItem[]>([]); // Coffechat 타입 지정
    const [loading, setLoading] = useState(true);
    const [selectedButton, setSelectedButton] = useState<'receiveBox' | 'sendBox'>('receiveBox'); // 상태 관리

    const authData = useRecoilValue(authDataState);

    if (!authData?.email) {
        redirect('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCoffee(authData?.email);
                setMailData(data);
                console.log(data);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <PageWrapper>
            <FlexWrapper>
                <MailCategoryContainer selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
                <SizedBox width="40%" />
                {loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <MailList email={authData?.email} mailData={mailData} selected={selectedButton} />
                )}
            </FlexWrapper>
        </PageWrapper>
    );
};

export default MailBoxPage;
