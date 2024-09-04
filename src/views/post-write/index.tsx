'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import PostCategoryContainer from './ui/PostCategoryContainer';
import PostTitleContainer from './ui/PostTitleContainer';
import PostTagContainer from './ui/PostTagContainer';
import MarkDownContainer from './ui/MarkDownContainer';
import SubmitButton from './ui/SubmitButton';
import { postPost } from './api/postPost';
import { useRecoilValue } from 'recoil';
import { categoryState, tagsState, titleState, contentState } from './model/postAtoms';
import { authDataState } from '@/entities/auth/model';
import { useRouter } from 'next/navigation';

const PostWritePage: React.FC = () => {
    const router = useRouter();
    const category = useRecoilValue(categoryState);
    const tags = useRecoilValue(tagsState);
    const title = useRecoilValue(titleState);
    const content = useRecoilValue(contentState);
    //유저 정보 불러오기
    const authData = useRecoilValue(authDataState);
    const email = authData?.email;

    const handleSubmit = async () => {
        try {
            if (!email) {
                console.error('유효한 이메일이 없습니다.');
                return;
            }
            const post = {
                email,
                category,
                tags,
                title,
                content,
            };

            const response = await postPost(post);
            router.push(`/post-detail/${response.postId}`);
            
            // 성공 시 상태 초기화
            // 이 부분에 리셋 로직 추가 필요
        } catch (error) {
            console.error('게시물 전송 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <PageWrapper gap="0.875em">
            <PostCategoryContainer />
            <PostTagContainer />
            <PostTitleContainer />
            <MarkDownContainer />
            <SubmitButton onClick={handleSubmit} />
        </PageWrapper>
    );
};

export default PostWritePage;
