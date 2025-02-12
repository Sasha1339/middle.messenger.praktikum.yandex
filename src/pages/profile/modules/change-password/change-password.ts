import Block from "../../../../utils/block/block.ts";
import Button from "../../../../components/button/buttons.ts";
import {PasswordChangeWindow} from "./index.ts";
import Input from "../../../../components/input/input.ts";
import ClickableText from "../../../../components/clickable-text/clickable-text.ts";
import FormComponent from "../../../../components/form/form.ts";

export default class ChangePasswordComponent extends Block {

    constructor(events: { clickOnAccept: () => void, clickOnCancel: () => void }) {
        super({
            Form: new FormComponent({
                class: 'window',
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
                    class: 'window__button-edit-password',
                    events: {
                        'click': events.clickOnAccept
                    }
                }),
                TextCancel: new ClickableText({
                    class: 'window__button-cancel',
                    text: 'Отмена',
                    events: {
                        'click': events.clickOnCancel
                    }
                })
            })
        });
    }

    render(): string {
        return PasswordChangeWindow;
    }

}
