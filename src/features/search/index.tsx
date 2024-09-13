'use client';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import { fetchSearchResults } from './api/fetchSearchResults';
import { Post, PostDetail } from '@/shared/type/post';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { useSearchParams } from 'next/navigation';
import { getPostDetail } from '@/shared/api/post/getPostDetail';
import SmallPostContainer from '@/widgets/postContainer/SmallPostContainer';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('query');
    const [postData, setPostData] = useState<PostDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태는 불리언 타입

    // 디바운싱된 검색 함수
    const debouncedSearch = useCallback(
        debounce(async (searchTerm: string) => {
            if (searchTerm) {
                setLoading(true); // 검색 시작 시 로딩 상태 활성화
                const postList = await fetchSearchResults(searchTerm); // API 호출
                const data = await Promise.all(postList.map((post: any) => getPostDetail(post)));
                setPostData(data);
                setLoading(false); // 검색 완료 시 로딩 상태 비활성화
            } else {
                setPostData([]); // 검색어가 없으면 결과 초기화
            }
        }, 500), // 500ms 지연
        [],
    );

    // 키워드가 변경될 때마다 디바운스된 함수 호출
    useEffect(() => {
        debouncedSearch(keyword!);

        // 컴포넌트가 언마운트될 때 디바운스된 함수 취소
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch]);

    return (
        <PageWrapper padding="25%">
            {loading ? (
                <></>
            ) : (
                <ColumnWrapper gap="2em">
                    {postData ? (
                        postData.map((post, index) => (
                            <SmallPostContainer postData={post} key={index} /> // PostDetail 타입에 맞춰 수정 필요
                        ))
                    ) : (
                        <p>결과없음</p>
                    )}
                </ColumnWrapper>
            )}
        </PageWrapper>
    );
}
