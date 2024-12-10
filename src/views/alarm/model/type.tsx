export interface AlarmListItem {
    alarmId: number;
    alarmType: 'COMMENT' | 'REPLY' | 'LIKE' | 'FOLLOW';
    message: string;
    createDate: string;
    userId: number;
    isRead: boolean;
}
