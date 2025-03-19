export interface ChatModel {
    message: string;
    file: string;
    side: 'me' | 'companion';
    time: string;
    date: string;
    id: number;
    title?: string;
    avatar?: string;
    unread_count?: number;
    last_message: LastMessageModel;
}

export interface LastMessageModel {
    user: UserModel;
    time: string;
    content: string;
}

export interface UserModel {
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    login: string;
    phone: string;
    display_name: string;
}
