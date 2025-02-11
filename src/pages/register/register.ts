import Block from "../../utils/block/block.ts";
import { RegisterPage } from './index.ts';
import Button from "../../components/button/buttons.ts";
import Input from "../../components/input/input.ts";

export default class RegisterComponent extends Block {

    constructor() {
        super({
            FirstNameInput: new Input({
                placeholder: 'Имя',
                class: 'register__input',
                textType: 'text',
                name: 'first_name'
            }),
            SecondNameInput: new Input({
                placeholder: 'Фамилия',
                class: 'register__input',
                textType: 'text',
                name: 'second_name'
            }),
            LoginInput: new Input({
                placeholder: 'Логин',
                class: 'register__input',
                textType: 'text',
                name: 'login'
            }),
            EmailInput: new Input({
                placeholder: 'Email',
                class: 'register__input',
                textType: 'text',
                name: 'email'
            }),
            PhoneInput: new Input({
                placeholder: 'Телефон',
                class: 'register__input',
                textType: 'text',
                name: 'phone'
            }),
            PasswordOneInput: new Input({
                placeholder: 'Пароль',
                class: 'register__input',
                textType: 'text',
                name: 'password'
            }),
            PasswordTwoInput: new Input({
                placeholder: 'Пароль (еще раз)',
                class: 'register__input',
                textType: 'text',
            }),
            ButtonRegister: new Button({
                label: 'Зарегестироваться',
                class: 'register__button'
            })
        });
    }

    render(): string {
        return RegisterPage;
    }

}
