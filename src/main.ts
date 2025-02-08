import './style.css'
import avatar from './assets/image/avatar.jpg';
import search from './assets/svg/search.svg';
import settings from './assets/svg/settings.svg';
import add from './assets/svg/add.svg';
import arrow from './assets/svg/arrow.svg';
import {setup as setupProfile} from './pages/profile/profile.ts';
import * as Pages from './pages'
import Handlebars from "handlebars";
import * as Components from "./components";

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

const pages = {
    'profile': [Pages.ProfilePage, { avatar: avatar, arrow: arrow}],
    'nav': [Pages.NavigationPage],
    'home': [Pages.HomePage, {
        partialName: 'home',
        dialogs: dialogs,
        search: search,
        arrow: arrow,
        add: add,
        settings: settings
    }],
    'login': [Pages.LoginPage],
    'register': [Pages.RegisterPage],
    'error4xx': [Pages.ErrorPage, {errorType: 'Page4xx'}],
    'error5xx': [Pages.ErrorPage, {errorType: 'Page5xx'}],
}

const setupPage = (page: PageKey) => {
    switch (page) {
        case 'profile':
            setupProfile();
            break;
    }
}

Object.entries(Components).forEach(([name, template]) => {
    Handlebars.registerPartial(name, template);
})

function navigate(page: PageKey) {
    const [source, context] = pages[page];
    const container = document.querySelector('#app')!;

    const templateFun = Handlebars.compile(source);
    container.innerHTML = templateFun(context);
    setupPage(page);
}

document.addEventListener('DOMContentLoaded', () => {navigate('nav')})

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
