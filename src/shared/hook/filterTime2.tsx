export default function filterTime2(dateString:string) {
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 월과 일을 추출
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();

    // 월과 일을 '9.5' 형식으로 결합하여 반환
    return `${month}.${day}`;
}
