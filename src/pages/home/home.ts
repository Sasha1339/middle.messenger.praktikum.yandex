import Block from '../../utils/block/block.ts';
import { HomePage } from './index.ts';
import search from '../../assets/svg/search.svg';
import settings from '../../assets/svg/settings.svg';
import newChat from '../../assets/svg/new_chat.svg';
import add from '../../assets/svg/add.svg';
import arrow from '../../assets/svg/arrow.svg';
import DialogListComponent from './modules/dialog-list/dialog-list.ts';
import FormMessageComponent from './modules/form-message/form-message.ts';
import InputMessageComponent from './modules/input-message/input-message.ts';
import { FormContainer } from '../../utils/form/form-container.ts';
import ChatListComponent from './modules/chat-list/chat-list.ts';
import { ChatModel } from './utils/model.ts';
import { Router } from '../../utils/routing/router.ts';
import ButtonImage from '../../components/button-image/button-image.ts';
import { HomeApi } from '../../service/api/home-api.ts';
import CreateChat from './modules/create-chat/create-chat.ts';
import DeleteChat from './modules/delete-chat/delete-chat.ts';
import UsersChat from './modules/users-chat/users-chat.ts';
import { ChatApi } from '../../service/api/chat-api.ts';

let dialogs: ChatModel[] = [];

const currentChat: ChatModel[] = [];

export default class HomeComponent extends Block {
    router: Router;
    private _serviceHomeApi?: HomeApi;
    private _serviceChatApi?: ChatApi = new ChatApi();
    private _deletedChat?: { chatID: number };

    constructor() {
        super({
            FormMessage: new FormMessageComponent({
                InputMessage: new InputMessageComponent({}),
                events: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();
                        this.outputData(event);
                    }
                }
            }),
            DialogList: new DialogListComponent(
                dialogs,
                (element: HTMLElement) => {
                    this.openDialog(element);
                },
                (chatID: number) => {
                    this.deleteDialog(chatID);
                },
                (chatID: number) => {
                    this.openWindowUserChat('window__users-chat', chatID.toString());
                }
            ),
            ButtonCreateChat: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Создать чат',
                src: newChat,
                events: {
                    click: () => {
                        this.openWindowCreateChat('window__create-chat');
                    }
                }
            }),
            ButtonSettings: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Открыть настройки',
                src: settings,
                events: {
                    click: () => {
                        this.router.go('/settings');
                    }
                }
            }),
            CreateChatWindow: new CreateChat({
                clickOnAccept: () => {
                    this.closeWindow('window__create-chat');
                    this.loadDialogs();
                },
                clickOnCancel: () => {
                    this.closeWindow('window__create-chat');
                }
            }),
            UsersChatWindow: new UsersChat([], () => {}),
            DeleteChatWindow: new DeleteChat({
                clickOnAccept: () => {
                    this.closeWindow('window__delete-chat');
                    if (this._deletedChat) {
                        this.deleteDialogRequest(this._deletedChat.chatID);
                    }
                },
                clickOnCancel: () => {
                    this.closeWindow('window__delete-chat');
                    this._deletedChat = undefined;
                }
            }),
            ChatList: new ChatListComponent(currentChat),
            add: add,
            arrow: arrow,
            search: search
        });
        this.router = new Router('#app');

        if (!this._serviceHomeApi) {
            this._serviceHomeApi = new HomeApi();
        }

        const buttonSettings = document.querySelector('.home__title-settings');
        buttonSettings?.addEventListener('click', () => {
            this.router.go('/settings');
        });
    }

    override isLoaded() {
        this.loadDialogs();
    }

    render(): string {
        setTimeout(() => {
            this.scrollChatToDown();
        }, 1000);
        return HomePage;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        const input = ((event.target as HTMLFormElement).querySelector('[name="message"]') as HTMLInputElement).value;
        if (input !== '' && input.replaceAll(' ', '').length > 0) {
            console.log(container);
        }
    }

    scrollChatToDown(): void {
        const container = document.querySelector('.home__chat-messages') as HTMLElement;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    openDialog(element: HTMLElement): void {
        this.resetAndEditStyleDialogPanel(element);
    }

    deleteDialog(chatID: number): void {
        this.openWindowDeleteChat('window__delete-chat');
        this._deletedChat = { chatID };
    }

    resetAndEditStyleDialogPanel(element: HTMLElement): void {
        const dialogs = this._element.querySelectorAll(`.dialog`);
        dialogs.forEach((e) => e.classList.remove('dialog_selected'));
        element.classList.add('dialog_selected');
        this.setProps({ isSelected: true });
    }

    deleteDialogRequest(chatID: number): void {
        void this._serviceHomeApi?.delete({ chatId: chatID.toString() }).then((response) => {
            if (response.status === 200) {
                this.loadDialogs();
            } else if (response.status === 401) {
                this.router.go('/');
            }
        });
    }

    loadDialogs() {
        if (!this._serviceHomeApi) {
            this._serviceHomeApi = new HomeApi();
        }
        void this._serviceHomeApi.request().then((response) => {
            if (response.status === 200) {
                dialogs = JSON.parse(response.response);
                this.setChildren({
                    DialogList: new DialogListComponent(
                        dialogs,
                        (element: HTMLElement) => {
                            this.openDialog(element);
                        },
                        (chatID: number) => {
                            this.deleteDialog(chatID);
                        },
                        (chatID: number) => {
                            this.openWindowUserChat('window__users-chat', chatID.toString());
                        }
                    )
                });
            } else if (response.status === 401) {
                this.router.go('/');
            }
        });
    }

    openWindowCreateChat(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('home__windows_disabled');
        window?.classList.add('home__windows_enabled');
    }

    openWindowUserChat(cssClass: string, chatId: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('home__windows_disabled');
        window?.classList.add('home__windows_enabled');
        void this._serviceChatApi?.getUsers(chatId).then((response) => {
            if (response.status === 200) {
                const users = JSON.parse(response.response);
                this.setChildren({
                    UsersChatWindow: new UsersChat(users, () => {})
                });
            } else if (response.status === 401) {
                this.router.go('/');
            }
        });
    }

    openWindowDeleteChat(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('home__windows_disabled');
        window?.classList.add('home__windows_enabled');
    }

    closeWindow(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.add('home__windows_disabled');
        window?.classList.remove('home__windows_enabled');
    }

    show() {
        super.show();
        this.loadDialogs();
    }
}
