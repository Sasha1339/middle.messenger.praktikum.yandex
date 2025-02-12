import Block from "../../../../utils/block/block.ts";
import Button from "../../../../components/button/buttons.ts";
import {ProfileEditWindow} from "./index.ts";
import Input from "../../../../components/input/input.ts";
import ClickableText from "../../../../components/clickable-text/clickable-text.ts";
import FormComponent from "../../../../components/form/form.ts";
import {FormContainer} from "../../../../utils/form/form-container.ts";

export default class EditProfileComponent extends Block {

    constructor(events: { clickOnAccept: () => void, clickOnCancel: () => void }) {
        super({
            Form: new FormComponent({
                class: 'window',
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
                    class: 'window__button-edit',
                }),
                TextCancel: new ClickableText({
                    class: 'window__button-cancel',
                    text: 'Отмена',
                    events: {
                        'click': events.clickOnCancel
                    }
                }),
                events: {
                    'submit': (event: SubmitEvent) => { event.preventDefault(); this.outputData(event) }
                }
            })
        });
    }

    render(): string {
        return ProfileEditWindow;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        console.log(container);
    }

}
