'use client';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import { fetchSearchResults } from './api/fetchSearchResults';
import { Post } from '@/shared/type/post';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import Input from '@/widgets/input/Input';

export default function SearchPage() {
    const [keyword, setKeyword] = useState<string>(''); // 검색어는 문자열 타입
    const [searchResults, setSearchResults] = useState<number[]>([]); // 검색 결과는 PostDetail 배열 타입
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태는 불리언 타입

    // 디바운싱된 검색 함수
    const debouncedSearch = useCallback(
        debounce(async (searchTerm: string) => {
            if (searchTerm) {
                setLoading(true); // 검색 시작 시 로딩 상태 활성화
                const results = await fetchSearchResults(searchTerm); // API 호출
                setSearchResults(results); // 결과를 상태에 저장
                console.log(results.findByKeywordDtoList!)
                setLoading(false); // 검색 완료 시 로딩 상태 비활성화
            } else {
                setSearchResults([]); // 검색어가 없으면 결과 초기화
            }
        }, 500), // 500ms 지연
        [],
    );

    // 키워드가 변경될 때마다 디바운스된 함수 호출
    useEffect(() => {
        debouncedSearch(keyword);

        // 컴포넌트가 언마운트될 때 디바운스된 함수 취소
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch]);

    // 입력 이벤트 핸들러
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value); // input 값 상태 업데이트
    };

    return (
        <PageWrapper>
            <Input
                type="text"
                value={keyword}
                onChange={(e) => handleInputChange(e)}
                placeholder="검색어를 입력하세요"
            />
            {loading ? (
                <p>검색 중...</p>
            ) : (
                <ul>
                    {searchResults ? (
                        searchResults.map((result) => (
                            <li key={result}>{result}</li> // PostDetail 타입에 맞춰 수정 필요
                        ))
                    ) : (
                        <p>결과없음</p>
                    )}
                </ul>
            )}
        </PageWrapper>
    );
}
