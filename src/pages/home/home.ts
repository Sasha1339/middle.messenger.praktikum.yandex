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

let dialogs: ChatModel[] = [];

let chats: { dialogs: ChatModel[] } = { dialogs: [] };

const currentChat: ChatModel[] = [];

export default class HomeComponent extends Block {
    router: Router;
    private _serviceHomeApi?: HomeApi;

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
            DialogList: new DialogListComponent(dialogs, (element: HTMLElement) => {
                this.openDialog(element);
            }),
            ButtonCreateChat: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Создать чат',
                src: newChat,
                events: {
                    click: () => {
                        this.openWindow('window__create-chat');
                    }
                }
            }),
            ButtonImage: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Вернуться на страницу чатов',
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
                },
                clickOnCancel: () => {
                    this.closeWindow('window__create-chat');
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

    resetAndEditStyleDialogPanel(element: HTMLElement): void {
        const dialogs = this._element.querySelectorAll(`.dialog`);
        dialogs.forEach((e) => e.classList.remove('dialog_selected'));
        element.classList.add('dialog_selected');
        this.setProps({ isSelected: true });
    }

    loadDialogs() {
        if (!this._serviceHomeApi) {
            this._serviceHomeApi = new HomeApi();
        }
        void this._serviceHomeApi.request().then((response) => {
            if (response.status === 200) {
                dialogs = JSON.parse(response.response);
                this.setChildren({
                    DialogList: new DialogListComponent(dialogs, (element: HTMLElement) => {
                        this.openDialog(element);
                    })
                });
            } else if (response.status === 401) {
                this.router.go('/');
            }
        });
    }

    openWindow(cssClass: string): void {
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
