import './style.css';
import ProfileComponent from './pages/profile/profile.ts';
import LoginComponent from './pages/login/login.ts';
import RegisterComponent from './pages/register/register.ts';
import HomeComponent from './pages/home/home.ts';
import { Router } from './utils/routing/router.ts';

// type PageKey = keyof typeof pages;
//
// const pages: Record<string, () => Block> = {
//     login: () => {
//         return new LoginComponent();
//     },
//     register: () => {
//         return new RegisterComponent();
//     },
//     home: () => {
//         return new HomeComponent();
//     },
//     error4xx: () => {
//         return new ErrorComponent('4xx');
//     },
//     error5xx: () => {
//         return new ErrorComponent('5xx');
//     },
//     profile: () => {
//         return new ProfileComponent();
//     }
// };

// function render(element: HTMLElement, block: Block) {
//     element.childNodes.forEach((e) => e.remove());
//
//     element.appendChild(block.getContent());
//
//     block.dispatchComponentDidMount();
// }
//
// function navigate(page: PageKey) {
//     const source = pages[page];
//     const container = document.querySelector('#app') as HTMLElement;
//
//     render(container, source());
// }

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');
    router
        .use('/', LoginComponent)
        .use('/sign-up', RegisterComponent)
        .use('/settings', ProfileComponent)
        .use('/messenger', HomeComponent)
        .start();
});

// document.addEventListener('click', (event) => {
//     const { target } = event;
//     if (target instanceof HTMLElement) {
//         const page = target.getAttribute('page');
//         if (page && page in pages) {
//             navigate(page);
//             event.preventDefault();
//             event.stopImmediatePropagation();
//         }
//     }
// });
