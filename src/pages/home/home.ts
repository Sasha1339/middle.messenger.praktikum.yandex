import Block from "../../utils/block/block.ts";
import { HomePage } from './index.ts';
import search from '../../assets/svg/search.svg';
import settings from '../../assets/svg/settings.svg';
import add from '../../assets/svg/add.svg';
import arrow from '../../assets/svg/arrow.svg';
import avatar from "../../assets/image/avatar.jpg";
import DialogListComponent from "./modules/dialog-list/dialog-list.ts";


const dialogs = [
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: '1 окт 2021', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: undefined},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4}
]

const dialogs1 = [
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4}
]


export default class HomeComponent extends Block {

    constructor() {
        super({
            DialogList: new DialogListComponent(dialogs),
            settings: settings,
            add: add,
            arrow: arrow,
            search: search,
        });
    }

    render(): string {
        return HomePage;
    }

}
