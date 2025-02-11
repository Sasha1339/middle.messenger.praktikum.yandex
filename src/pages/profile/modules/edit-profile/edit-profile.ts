import Block from "../../../../utils/block/block.ts";
import Button from "../../../../components/button/buttons.ts";
import {ProfileEditWindow} from "./index.ts";
import Input from "../../../../components/input/input.ts";

export default class EditProfileComponent extends Block {

    constructor() {
        super({
            FirstNameInput: new Input({
                placeholder: 'Имя',
                class: 'window__input',
                textType: 'text',
                name: 'first_name'
            }),
            SecondNameInput: new Input({
                placeholder: 'Фамилия',
                class: 'window__input',
                textType: 'text',
                name: 'second_name'
            }),
            DisplayNameInput: new Input({
                placeholder: 'Отображаемое имя',
                class: 'window__input',
                textType: 'text',
                name: 'display_name'
            }),
            LoginInput: new Input({
                placeholder: 'Логин',
                class: 'window__input',
                textType: 'text',
                name: 'login'
            }),
            EmailInput: new Input({
                placeholder: 'Email',
                class: 'window__input',
                textType: 'text',
                name: 'email'
            }),
            PhoneInput: new Input({
                placeholder: 'Телефон',
                class: 'window__input',
                textType: 'text',
                name: 'phone'
            }),
            ButtonAccept: new Button({
                label: 'Редактировать',
                class: 'window__button-edit'
            })
        });
    }

    render(): string {
        return ProfileEditWindow;
    }

}
