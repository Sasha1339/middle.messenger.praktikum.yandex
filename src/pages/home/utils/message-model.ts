export interface MessageModel {
    message: string;
    file: string;
    side: 'me' | 'companion';
    time: string;
    date: string;
}
