/**
 * 학번에서 입학 연도를 추출하는 함수
 * @param schoolNumber 학번 (예: 202237792)
 * @returns 입학 연도 (예: 2022)
 */

export const schoolNumberToEnterYear = (schoolNumber: string): number | null => {
    if (schoolNumber.length < 4) {
        console.error('학번의 길이가 너무 짧습니다.');
        return null;
    }

    const enterYear = parseInt(schoolNumber.substring(0, 4), 10);

    const currentYear = new Date().getFullYear();
    if (enterYear < 2000 || enterYear > currentYear) {
        console.error('학번에서 유효하지 않은 연도가 추출되었습니다.');
        return null;
    }

    return enterYear;
};
