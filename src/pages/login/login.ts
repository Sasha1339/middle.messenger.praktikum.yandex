import Block from "../../utils/block/block.ts";
import { LoginPage } from './index.ts';
import Button from "../../components/button/buttons.ts";
import Input from "../../components/input/input.ts";
import ClickableText from "../../components/clickable-text/clickable-text.ts";
import FormComponent from "../../components/form/form.ts";
import {FormContainer} from "../../utils/form/form-container.ts";

export default class LoginComponent extends Block {

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
                    text: 'Нет аккаунта?'
                }),
                events: {
                    'submit': (event: SubmitEvent) => { event.preventDefault(); this.outputData(event) }
                }
            })
        });
    }

    render(): string {
        return LoginPage;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        console.log(container);
    }

}
