import Block from '../../utils/block/block.ts';
import { HomePage } from './index.ts';
import search from '../../assets/svg/search.svg';
import settings from '../../assets/svg/settings.svg';
import add from '../../assets/svg/add.svg';
import arrow from '../../assets/svg/arrow.svg';
import avatar from '../../assets/image/avatar.jpg';
import DialogListComponent from './modules/dialog-list/dialog-list.ts';
import FormMessageComponent from './modules/form-message/form-message.ts';
import InputMessageComponent from './modules/input-message/input-message.ts';
import { FormContainer } from '../../utils/form/form-container.ts';
import ChatListComponent from './modules/chat-list/chat-list.ts';
import { MessageModel } from './utils/message-model.ts';
import { Router } from '../../utils/routing/router.ts';
import ButtonImage from '../../components/button-image/button-image.ts';

const dialogs = [
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: '1 окт 2021',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: undefined
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    },
    {
        image: avatar,
        name: 'Artur Pirazhkov',
        message: 'Hi zyabl!',
        lastUpdate: 'Пт',
        countMessages: 4
    }
];

const currentChat: MessageModel[] = [
    {
        message: 'Привет как дела?',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Привет, я отдыхаю на море, извини что не мог ответить по смс, у меня роуминг',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'через неделю планирую вернуться, не скучай',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'О супер, как раз приезжаешь на мой день рождение!',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Я пригласил порядка 15 человек, будет небольшая туса)',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Будет купаться в бассейне и жарить шашлык',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Ого! круто, тогда обязательно приеду!',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'Давай жду!',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Привет как дела?',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Привет, я отдыхаю на море, извини что не мог ответить по смс, у меня роуминг',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'через неделю планирую вернуться, не скучай',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'О супер, как раз приезжаешь на мой день рождение!',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Я пригласил порядка 15 человек, будет небольшая туса)',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Будет купаться в бассейне и жарить шашлык',
        file: '',
        side: 'me',
        time: '',
        date: ''
    },
    {
        message: 'Ого! круто, тогда обязательно приеду!',
        file: '',
        side: 'companion',
        time: '',
        date: ''
    },
    {
        message: 'Давай жду!',
        file: '',
        side: 'me',
        time: '',
        date: ''
    }
];

export default class HomeComponent extends Block {
    router: Router;

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
            ChatList: new ChatListComponent(currentChat),
            add: add,
            arrow: arrow,
            search: search
        });
        this.router = new Router('#app');
        const buttonSettings = document.querySelector('.home__title-settings');
        buttonSettings?.addEventListener('click', () => {
            this.router.go('/settings');
        });
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
}
