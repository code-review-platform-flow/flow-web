'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React, { useEffect, useState } from 'react';
import PostCategoryContainer from './ui/PostCategoryContainer';
import PostTitleContainer from './ui/PostTitleContainer';
import PostTagContainer from './ui/PostTagContainer';
import MarkDownContainer from './ui/MarkDownContainer';
import SubmitButton from './ui/SubmitButton';
import { postPost } from './api/postPost';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { categoryState, tagsState, titleState, contentState } from './model/postAtoms';
import { authDataState } from '@/entities/auth/model';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPostDetail } from '@/shared/api/post/getPostDetail';

const PostWritePage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');

    const [category, setCategory] = useRecoilState(categoryState);
    const [tags, setTags] = useRecoilState(tagsState);
    const [title, setTitle] = useRecoilState(titleState);
    const [content, setContent] = useRecoilState(contentState);

    const authData = useRecoilValue(authDataState);
    const email = authData?.email;

    const resetCategory = useResetRecoilState(categoryState);
    const resetTags = useResetRecoilState(tagsState);
    const resetTitle = useResetRecoilState(titleState);
    const resetContent = useResetRecoilState(contentState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (!postId) return;

        const fetchPostData = async () => {
            try {
                setLoading(true);
                setError(null);

                const postData = await getPostDetail(Number(postId));

                setCategory(postData.categoryName);
                setTags(postData.tags);
                setTitle(postData.title);
                setContent(postData.content);
            } catch (err) {
                console.error('게시물 데이터 로드 중 오류:', err);
                setError('게시물을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId, setCategory, setTags, setTitle, setContent]);

    return (
        <PageWrapper gap="0.875em">
            <PostCategoryContainer currentCategory={category} />
            <PostTagContainer currentTag={tags} />
            <PostTitleContainer currentTitle={title} />
            <MarkDownContainer currentContent={content} />
            <SubmitButton postId={Number(postId)} onClick={handleSubmit} />
        </PageWrapper>
    );
};

export default PostWritePage;
