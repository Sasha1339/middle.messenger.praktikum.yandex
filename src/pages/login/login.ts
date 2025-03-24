import Block from '../../utils/block/block.ts';
import { LoginPage } from './index.ts';
import Button from '../../components/button/buttons.ts';
import Input from '../../components/input/input.ts';
import ClickableText from '../../components/clickable-text/clickable-text.ts';
import FormComponent from '../../components/form/form.ts';
import { FormContainer } from '../../utils/form/form-container.ts';
import { Router } from '../../utils/routing/router.ts';
import { LoginApi } from '../../service/api/login-api.ts';

export default class LoginComponent extends Block {
    router: Router;
    private _serviceApi: LoginApi = new LoginApi();

    constructor() {
        super({
            Form: new FormComponent({
                class: 'login',
                LoginInput: new Input({
                    placeholder: 'Логин',
                    class: 'login__input',
                    textType: 'text',
                    name: 'login',
                    pattern: '^(?!\\d+$)[a-zA-Z0-9]+$',
                    title: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры, не менее 3 символов',
                    min: 3,
                    max: 20
                }),
                PasswordInput: new Input({
                    placeholder: 'Пароль',
                    name: 'password',
                    pattern: '^(?=.*[A-Z])(?=.*\\d).+$',
                    title: 'Должна быть хотя бы одна цифра и заглавная латинская буква, не менее 8 символов',
                    min: 8,
                    max: 40
                }),
                ButtonAuth: new Button({
                    label: 'Авторизироваться',
                    class: 'login__button'
                }),
                TextRegister: new ClickableText({
                    class: 'login__register',
                    text: 'Нет аккаунта?',
                    events: {
                        click: () => {
                            this.router.go('/sign-up');
                        }
                    }
                }),
                events: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();
                        this.outputData(event);
                    }
                }
            })
        });
        this.router = new Router('#app');
    }

    render(): string {
        return LoginPage;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        void this._serviceApi
            .create(container.fields)
            .then((response) => {
                if (response.status === 200) {
                    this.router.go('/messenger');
                } else if (response.status === 400) {
                    this.router.go('/messenger');
                } else if (response.status === 401) {
                    this.router.go('/401');
                } else if (response.status === 500) {
                    this.router.go('/500');
                } else if (response.status === 404) {
                    this.router.go('/404');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
