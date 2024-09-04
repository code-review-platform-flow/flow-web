export default function filterTime(dateString:string) {
    const postDate = new Date(dateString); // 게시물의 생성 날짜
    const now = new Date(); // 현재 시간

    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000); // 두 시간의 차이를 초 단위로 계산

    if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes}분 전`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours}시간 전`;
    } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays}일 전`;
    }
}

