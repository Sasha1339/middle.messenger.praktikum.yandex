import { Dialog } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import { ChatModel } from '../../utils/model.ts';
import avatar from '../../../../assets/image/avatar.jpg';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import deleteChat from '../../../../assets/svg/card.svg';
import usersChat from '../../../../assets/svg/user.svg';
import { ChatApi } from '../../../../service/api/chat-api.ts';

export default class DialogComponent extends Block {
    private _chatId: number;
    private _chatApi: ChatApi = new ChatApi();

    constructor(
        dialog: ChatModel,
        clickEvent: (element: HTMLElement, chatId: number) => void,
        deleteEvent: (chatID: number) => void,
        usersEvent: (chatID: number) => void
    ) {
        super({
            ButtonDelete: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Удалить чат',
                src: deleteChat,
                events: {
                    click: () => {
                        deleteEvent(dialog.id);
                    }
                }
            }),
            ButtonUsers: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Пользователи чата',
                src: usersChat,
                events: {
                    click: () => {
                        usersEvent(dialog.id);
                    }
                }
            }),
            avatar: dialog.avatar ?? avatar,
            title: dialog.title,
            lastMessage: dialog.last_message ? dialog.last_message.content : '',
            lastUpdate: dialog.last_message
                ? new Date(dialog.last_message.time).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit'
                  })
                : '',
            unreadCount: dialog.unread_count,
            events: {
                click: () => {
                    clickEvent(this._element, dialog.id);
                }
            }
        });
        this._chatId = dialog.id;
    }

    updateCount(): void {
        void this._chatApi
            .request()
            .then((response) => {
                if (response.status === 200) {
                    const message = JSON.parse(response.response) as ChatModel[];
                    const chat = message.find((e) => e.id === this._chatId);
                    if (chat) {
                        this.setProps({
                            lastMessage: chat.last_message ? chat.last_message.content : '',
                            lastUpdate: chat.last_message
                                ? new Date(chat.last_message.time).toLocaleDateString('ru-RU', {
                                      day: '2-digit',
                                      month: '2-digit'
                                  })
                                : '',
                            unreadCount: chat.unread_count
                        });
                        this.selectElement();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getChatId(): number {
        return this._chatId;
    }

    render(): string {
        return Dialog;
    }

    selectElement(): void {
        this._element.classList.add('dialog_selected');
    }
}
