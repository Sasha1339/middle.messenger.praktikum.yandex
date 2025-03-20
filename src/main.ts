import './style.css';
import ProfileComponent from './pages/profile/profile.ts';
import LoginComponent from './pages/login/login.ts';
import RegisterComponent from './pages/register/register.ts';
import HomeComponent from './pages/home/home.ts';
import { Router } from './utils/routing/router.ts';
import ErrorComponent from './pages/error/error.ts';

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');
    router
        .use('/', LoginComponent)
        .use('/sign-up', RegisterComponent)
        .use('/settings', ProfileComponent)
        .use('/messenger', HomeComponent)
        .use('/404', ErrorComponent, { type: '4xx', code: '404' })
        .use('/401', ErrorComponent, { type: '4xx', code: '401' })
        .use('/500', ErrorComponent, { type: '5xx', code: '500' })
        .start();
});
