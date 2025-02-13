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

export default class HomeComponent extends Block {
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
      settings: settings,
      add: add,
      arrow: arrow,
      search: search
    });
  }

  render(): string {
    return HomePage;
  }

  outputData(event: SubmitEvent): void {
    const container = new FormContainer(event.target as HTMLFormElement);
    const input = ((event.target as HTMLFormElement).querySelector('[name="message"]') as HTMLInputElement).value;
    if (input !== '' && input.replaceAll(' ', '').length > 0) {
      console.log(container);
    }
  }

  openDialog(element: HTMLElement): void {
    this.resetAndEditStyleDialogPanel(element);
  }

  resetAndEditStyleDialogPanel(element: HTMLElement): void {
    const dialogs = this._element.querySelectorAll(`.dialog`);
    dialogs.forEach((e) => e.classList.remove('dialog_selected'));
    element.classList.add('dialog_selected');
  }

}
