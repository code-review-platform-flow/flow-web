export interface AlarmListItem {
    alarmId: number;
    alarmType: 'COMMENT' | 'REPLY' | 'LIKE' | 'FOLLOW';
    messege: string;
    createDate: string;
}
