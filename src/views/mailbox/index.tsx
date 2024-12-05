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
    const searchParams = useSearchParams();
    const paramsEmail = searchParams.get('email');
    const [mailData, setMailData] = useState<CoffechatListItem[]>([]); // Coffechat 타입 지정
    const [loading, setLoading] = useState(true);
    const [selectedButton, setSelectedButton] = useState<'receiveBox' | 'sendBox'>('receiveBox'); // 상태 관리

    // 이메일이 없을 경우 리다이렉트
    if (!paramsEmail) {
        redirect('/');
    }

    const authData = useRecoilValue(authDataState);
    const decodedEmail = Buffer.from(paramsEmail, 'base64').toString('utf-8');

    if (authData?.email !== decodedEmail) {
        redirect('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCoffee(decodedEmail);
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
                    <MailList email={decodedEmail} mailData={mailData} selected={selectedButton} />
                )}
            </FlexWrapper>
        </PageWrapper>
    );
};

export default MailBoxPage;
