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
import { ChatListModel, ChatModel, UserModel } from './utils/model.ts';
import { Router } from '../../utils/routing/router.ts';
import ButtonImage from '../../components/button-image/button-image.ts';
import { HomeApi } from '../../service/api/home-api.ts';
import CreateChat from './modules/create-chat/create-chat.ts';
import DeleteChat from './modules/delete-chat/delete-chat.ts';
import UsersChat from './modules/users-chat/users-chat.ts';
import { ChatApi } from '../../service/api/chat-api.ts';
import { WSTransport } from '../../service/ws/WSTransport.ts';
import { UserApi } from '../../service/api/user-api.ts';

let dialogs: ChatModel[] = [];

const currentChat: ChatListModel[] = [];

export default class HomeComponent extends Block {
    router: Router;
    private _serviceHomeApi?: HomeApi;
    private _serviceChatApi?: ChatApi = new ChatApi();
    private _deletedChat?: { chatID: number };
    private _userApi?: UserApi = new UserApi();
    private _userId?: number;
    private _isConnectedWS: boolean = false;
    private _ws?: WSTransport;

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
                (element: HTMLElement, chatId: number) => {
                    this.getUsers(chatId.toString(), true, element);
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
                    this.setProps({ isSelected: false });
                    this.loadDialogs();
                },
                clickOnCancel: () => {
                    this.closeWindow('window__create-chat');
                }
            }),
            UsersChatWindow: new UsersChat(
                [],
                () => {
                    this.closeWindow('window__users-chat');
                },
                (chatID: number, userId: number) => {
                    this.addUsers(chatID, userId);
                },
                (chatID: number, userId: number) => {
                    this.deleteUsers(chatID, userId);
                },
                0
            ),
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
            ChatList: new ChatListComponent(currentChat, new Map(), 0),
            add: add,
            arrow: arrow,
            search: search
        });
        this.router = new Router('#app');

        this.getUserId();

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

    getUserId(): void {
        void this._userApi?.request().then((response) => {
            if (response.status === 200) {
                const user = JSON.parse(response.response);
                this._userId = user.id;
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    render(): string {
        return HomePage;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        const input = ((event.target as HTMLFormElement).querySelector('[name="message"]') as HTMLInputElement).value;
        if (input !== '' && input.replaceAll(' ', '').length > 0 && this._isConnectedWS) {
            this._ws?.send({
                type: 'message',
                content: container.fields['message']
            });
            ((event.target as HTMLFormElement).querySelector('[name="message"]') as HTMLInputElement).value = '';
        }
    }

    scrollChatToDown(): void {
        const container = document.querySelector('.home__chat-messages') as HTMLElement;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    openDialog(element: HTMLElement, chatId: number, users: Map<number, string>): void {
        this.getTokenByChat(element, chatId, users);
    }

    getTokenByChat(element: HTMLElement, chatID: number, users: Map<number, string>): void {
        void this._serviceChatApi?.getToken(chatID).then((response) => {
            if (response.status === 200) {
                const tokenMessage = JSON.parse(response.response);
                this.openWS(element, tokenMessage.token, chatID, users);
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    openWS(element: HTMLElement, token: string, chatId: number, users: Map<number, string>): void {
        this._ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${this._userId}/${chatId}/${token}`);
        this._ws.close();
        this._isConnectedWS = false;
        void this._ws.connect();
        this._ws.on('message', (data: ChatListModel[]) => {
            if (data.length > 0) {
                this.setChildren({
                    ChatList: new ChatListComponent(data.reverse(), users, this._userId!)
                });
                (this._children['DialogList'] as DialogListComponent).updateCountMessage(chatId);
                setTimeout(() => {
                    this.scrollChatToDown();
                });
            } else {
                this._ws?.send({
                    content: '0',
                    type: 'get old'
                });
            }
        });
        this._ws.on(WSTransport.WSTransportEvent.CONNECTED, () => {
            this._isConnectedWS = true;
            this.resetAndEditStyleDialogPanel(element);
            this._ws?.send({
                content: '0',
                type: 'get old'
            });
        });
        this._ws.on(WSTransport.WSTransportEvent.ERROR, () => {
            console.log('Возникла ошибка соединения, перезагрузите страницу')
        });
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
                this.setProps({ isSelected: false });
                this.loadDialogs();
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
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
                        (element: HTMLElement, chatId: number) => {
                            this.getUsers(chatId.toString(), true, element);
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
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    openWindowCreateChat(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('home__windows_disabled');
        window?.classList.add('home__windows_enabled');
    }

    getUsers(chatId: string, isLoadChat?: boolean, element?: HTMLElement): void {
        void this._serviceChatApi?.getUsers(chatId).then((response) => {
            if (response.status === 200) {
                const users = JSON.parse(response.response) as UserModel[];
                if (isLoadChat) {
                    const mappedUsers = new Map<number, string>();
                    users.forEach((user) => {
                        mappedUsers.set(user.id, user.first_name);
                    });
                    this.openDialog(element!, Number.parseInt(chatId), mappedUsers);
                } else {
                    this.setChildren({
                        UsersChatWindow: new UsersChat(
                            users,
                            () => {
                                this.closeWindow('window__users-chat');
                            },
                            (chatID: number, userId: number) => {
                                this.addUsers(chatID, userId);
                            },
                            (chatID: number, userId: number) => {
                                this.deleteUsers(chatID, userId);
                            },
                            Number.parseInt(chatId)
                        )
                    });
                }
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    openWindowUserChat(cssClass: string, chatId: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('home__windows_disabled');
        window?.classList.add('home__windows_enabled');
        this.getUsers(chatId);
    }

    addUsers(chatID: number, userId: number): void {
        void this._serviceChatApi?.addUsers(chatID, userId).then((response) => {
            if (response.status === 200) {
                this.getUsers(chatID.toString());
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    deleteUsers(chatID: number, userId: number): void {
        void this._serviceChatApi?.deleteUsers(chatID, userId).then((response) => {
            if (response.status === 200) {
                this.getUsers(chatID.toString());
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
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
        this.setProps({ isSelected: false });
        this.loadDialogs();
    }
}
