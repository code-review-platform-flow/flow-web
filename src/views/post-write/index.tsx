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

    const [loading, setLoading] = useState(false); // 초기 상태 false
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
            let response;
            if (postId) {
                response = await postPost(Number(postId), post);
            } else {
                response = await postPost(undefined, post);
            }

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
        if (!postId) {
            // postId가 없으면 초기 상태를 리셋하고 리턴
            resetCategory();
            resetTags();
            resetTitle();
            resetContent();
            return;
        }

        const fetchPostData = async () => {
            try {
                setError(null);
                setLoading(true);

                const postData = await getPostDetail(Number(postId), email);

                if (!postData.own) {
                    setError('수정 권한이 없습니다.');
                    router.replace('/'); // 권한 없으면 메인 페이지로 리다이렉트
                    return;
                }

                setCategory(postData.categoryName);
                setTags(postData.tags);
                setTitle(postData.title);
                setContent(postData.content);
            } catch (err) {
                setError('게시물을 불러오는 데 실패했습니다.');
                router.replace('/error'); // 에러 시 에러 페이지로 리다이렉트
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [
        postId,
        email,
        setCategory,
        setTags,
        setTitle,
        setContent,
        router,
        resetCategory,
        resetTags,
        resetTitle,
        resetContent,
    ]);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 메시지 출력
    }

    return (
        <PageWrapper gap="0.875em">
            <PostCategoryContainer />
            <PostTagContainer />
            <PostTitleContainer />
            <MarkDownContainer />
            <SubmitButton postId={postId ? Number(postId) : undefined} onClick={handleSubmit} />
        </PageWrapper>
    );
};

export default PostWritePage;
