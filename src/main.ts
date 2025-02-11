import './style.css'
import avatar from './assets/image/avatar.jpg';
import search from './assets/svg/search.svg';
import settings from './assets/svg/settings.svg';
import add from './assets/svg/add.svg';
import arrow from './assets/svg/arrow.svg';
import ProfileComponent from './pages/profile/profile.ts';
import * as Pages from './pages'
import Handlebars from "handlebars";
import LoginComponent from "./pages/login/login.ts";
import Block from "./utils/block/block.ts";
import Button from "./components/button/buttons.ts";
import RegisterComponent from "./pages/register/register.ts";

const dialogs = [
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: '1 окт 2021', countMessages: 4},
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
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4},
    {image: avatar, name: 'Artur Pirazhkov', message: 'Hi zyabl!', lastUpdate: 'Пт', countMessages: 4}
]

type PageKey = keyof typeof pages;

const pages: Record<string, Block> = {
    'login': new LoginComponent(),
    'register': new RegisterComponent(),
    'profile': new ProfileComponent()
}

const setupPage = (page: PageKey) => {
    // switch (page) {
    //     case 'profile':
    //         setupProfile();
    //         break;
    // }
}

function render(element: HTMLElement, block: Block) {

    element.childNodes.forEach((e) => e.remove());

    element.appendChild(block.getContent());

    block.dispatchComponentDidMount()

}

function navigate(page: PageKey) {
    const source = pages[page];
    const container = document.querySelector('#app')! as HTMLElement;

    render(container, source);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#app')! as HTMLElement;

    const templateFun = Handlebars.compile(Pages.NavigationPage);
    container.innerHTML = templateFun({});
})

document.addEventListener('click', event => {
    const {target} = event;
    if (target instanceof HTMLElement) {
        const page = target.getAttribute('page')
        if (page && page in pages) {
            navigate(page as PageKey);
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
});
