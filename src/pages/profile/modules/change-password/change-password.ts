import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { PasswordChangeWindow } from './index.ts';
import Input from '../../../../components/input/input.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
import FormComponent from '../../../../components/form/form.ts';
import { FormContainer } from '../../../../utils/form/form-container.ts';

export default class ChangePasswordComponent extends Block {
    constructor(events: { clickOnAccept: () => void; clickOnCancel: () => void }) {
        super({
            Form: new FormComponent({
                class: 'window',
                id: 'changePasswordFormFormData',
                OldPasswordInput: new Input({
                    placeholder: 'Старый пароль',
                    class: 'window__input',
                    name: 'oldPassword'
                }),
                NewPasswordInput: new Input({
                    placeholder: 'Новый пароль',
                    class: 'window__input',
                    name: 'newPassword',
                    pattern: '^(?=.*[A-Z])(?=.*\\d).+$',
                    title: 'Должна быть хотя бы одна цифра и заглавная латинская буква, не менее 8 символов',
                    min: 8,
                    max: 40
                }),
                ButtonAccept: new Button({
                    label: 'Изменить',
                    class: 'window__button-edit-password'
                }),
                TextCancel: new ClickableText({
                    class: 'window__button-cancel',
                    text: 'Отмена',
                    events: {
                        click: events.clickOnCancel
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
    }

    render(): string {
        return PasswordChangeWindow;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        console.log(container);
    }
}
