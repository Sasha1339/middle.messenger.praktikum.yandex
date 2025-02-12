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
                    name: 'login'
                }),
                PasswordInput: new Input({
                    placeholder: 'Пароль',
                    name: 'password'
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
