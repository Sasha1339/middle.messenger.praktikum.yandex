import Block from '../../../../utils/block/block.ts';
import { UsersChatWindow } from './index.ts';
import UserListComponent from '../users-list/users-list.ts';
import { UserModel } from '../../utils/model.ts';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import cross from '../../../../assets/svg/cross.svg';
import add_users from '../../../../assets/svg/add_users.svg';
import Input from '../../../../components/input/input.ts';
export default class UsersChat extends Block {
    private _chatId: number;

    constructor(
        users: UserModel[],
        closeWindow: () => void,
        addUsers: (chatID: number, userId: number) => void,
        deleteUsers: (chatID: number, userId: number) => void,
        chatId: number
    ) {
        super({
            UsersList: new UserListComponent(users, (userId: number) => {
                deleteUsers(chatId, userId);
            }),
            CloseWindow: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Закрыть окошко',
                src: cross,
                events: {
                    click: () => {
                        closeWindow();
                    }
                }
            }),
            InputUserId: new Input({
                placeholder: 'Введите ID пользоввателя',
                class: 'user__input',
                textType: 'text',
                name: 'user'
            }),
            AddUsers: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__user',
                alt: 'Добавить пользователя',
                src: add_users,
                events: {
                    click: () => {
                        this.getUserIdFromInput(addUsers, this._chatId);
                    }
                }
            })
        });
        this._chatId = chatId;
    }

    getUserIdFromInput(addUsers: (chatID: number, userId: number) => void, chatId: number): void {
        const input = document.querySelector('.user__input') as HTMLInputElement;
        if (input.value && !isNaN(Number(input.value))) {
            addUsers(chatId, Number.parseInt(input.value));
        }
    }

    render(): string {
        return UsersChatWindow;
    }
}
