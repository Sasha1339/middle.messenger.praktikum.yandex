import Block from "../../utils/block/block.ts";
import { LoginPage } from './index.ts';
import Button from "../../components/button/buttons.ts";
import Input from "../../components/input/input.ts";

export default class LoginComponent extends Block {

    constructor() {
        super({
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
            })
        });
    }

    render(): string {
        return LoginPage;
    }

}
