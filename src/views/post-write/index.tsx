'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import PostCategoryContainer from './ui/PostCategoryContainer';
import PostTitleContainer from './ui/PostTitleContainer';
import PostTagContainer from './ui/PostTagContainer';
import MarkDownContainer from './ui/MarkDownContainer';
import SubmitButton from './ui/SubmitButton';
import { postPost } from './api/postPost';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { categoryState, tagsState, titleState, contentState } from './model/postAtoms';
import { authDataState } from '@/entities/auth/model';
import { useRouter } from 'next/navigation';

const PostWritePage: React.FC = () => {
    const router = useRouter();
    const category = useRecoilValue(categoryState);
    const tags = useRecoilValue(tagsState);
    const title = useRecoilValue(titleState);
    const content = useRecoilValue(contentState);
    const authData = useRecoilValue(authDataState);
    const email = authData?.email;

    const resetCategory = useResetRecoilState(categoryState);
    const resetTags = useResetRecoilState(tagsState);
    const resetTitle = useResetRecoilState(titleState);
    const resetContent = useResetRecoilState(contentState);

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

            resetCategory();
            resetTags();
            resetTitle();
            resetContent();
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
