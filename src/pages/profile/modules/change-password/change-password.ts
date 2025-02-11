import Block from "../../../../utils/block/block.ts";
import Button from "../../../../components/button/buttons.ts";
import {PasswordChangeWindow} from "./index.ts";
import Input from "../../../../components/input/input.ts";

export default class ChangePasswordComponent extends Block {

    constructor() {
        super({
            OldPasswordInput: new Input({
                placeholder: 'Старый пароль',
                class: 'window__input',
                name: 'oldPassword'
            }),
            NewPasswordInput: new Input({
                placeholder: 'Новый пароль',
                class: 'window__input',
                name: 'newPassword'
            }),
            ButtonAccept: new Button({
                label: 'Изменить',
                class: 'window__button-edit-password'
            })
        });
    }

    render(): string {
        return PasswordChangeWindow;
    }

}
