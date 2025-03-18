import Block from '../../../../utils/block/block.ts';
import { UsersChatWindow } from './index.ts';
import { FormContainer } from '../../../../utils/form/form-container.ts';
import { ChatApi } from '../../../../service/api/chat-api.ts';
import UserListComponent from '../users-list/users-list.ts';
import { UserModel } from '../../utils/model.ts';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import cross from '../../../../assets/svg/cross.svg';
export default class UsersChat extends Block {
    private _serviceChatApi: ChatApi = new ChatApi();

    constructor(users: UserModel[], closeWindow: () => void) {
        super({
            UsersList: new UserListComponent(users),
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
            })
        });
    }

    outputData(event: SubmitEvent, handler: () => void): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        void this._serviceChatApi.create(container.fields).then((response) => {
            if (response.status === 200) {
                handler();
            }
        });
    }

    render(): string {
        return UsersChatWindow;
    }
}
