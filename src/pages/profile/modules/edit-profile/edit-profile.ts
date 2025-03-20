import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { ProfileEditWindow } from './index.ts';
import Input from '../../../../components/input/input.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
import FormComponent from '../../../../components/form/form.ts';
import { FormContainer } from '../../../../utils/form/form-container.ts';
import { ProfileApi } from '../../../../service/api/profile-api.ts';

export default class EditProfileComponent extends Block {
    private _profileApi: ProfileApi = new ProfileApi();

    constructor(events: { clickOnAccept: () => void; clickOnCancel: () => void }) {
        super({
            Form: new FormComponent({
                class: 'window',
                id: 'editFormData',
                FirstNameInput: new Input({
                    placeholder: 'Имя',
                    class: 'window__input',
                    textType: 'text',
                    name: 'first_name',
                    pattern: '^[A-ZА-Я][a-zа-яA-ZА-Я\\-]*$',
                    title: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис',
                    min: 0,
                    max: 100
                }),
                SecondNameInput: new Input({
                    placeholder: 'Фамилия',
                    class: 'window__input',
                    textType: 'text',
                    name: 'second_name',
                    pattern: '^[A-ZА-Я][a-zа-яA-ZА-Я\\-]*$',
                    title: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис',
                    min: 0,
                    max: 100
                }),
                DisplayNameInput: new Input({
                    placeholder: 'Отображаемое имя',
                    class: 'window__input',
                    textType: 'text',
                    name: 'display_name',
                    pattern: '^[A-ZА-Я][a-zа-яA-ZА-Я\\-]*$',
                    title: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис',
                    min: 0,
                    max: 100
                }),
                LoginInput: new Input({
                    placeholder: 'Логин',
                    class: 'window__input',
                    textType: 'text',
                    name: 'login',
                    pattern: '^(?!\\d+$)[a-zA-Z0-9]+$',
                    title: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры, не менее 3 символов',
                    min: 3,
                    max: 20
                }),
                EmailInput: new Input({
                    placeholder: 'Email',
                    class: 'window__input',
                    textType: 'text',
                    name: 'email',
                    pattern: '^[A-Za-z0-9\\-_]+@[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+$',
                    title: 'Используйте латинские буквы и цифры, также дефис и нижнее подчеркивание, обязательно должны быть @ и точка',
                    min: 0,
                    max: 100
                }),
                PhoneInput: new Input({
                    placeholder: 'Телефон',
                    class: 'window__input',
                    textType: 'text',
                    name: 'phone',
                    pattern: '^\\+?\\d+$',
                    title: 'Используйте любые цифры, может быть + в начале, от 10 до 15 символов',
                    min: 10,
                    max: 11
                }),
                ButtonAccept: new Button({
                    label: 'Редактировать',
                    class: 'window__button-edit'
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
                        this.outputData(event, events.clickOnAccept);
                    }
                }
            })
        });
    }

    render(): string {
        return ProfileEditWindow;
    }

    outputData(event: SubmitEvent, clickOnAccept: () => void): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        if (!this._profileApi) {
            this._profileApi = new ProfileApi();
        }
        void this._profileApi.updateProfile(container.fields).then((response) => {
            if (response.status === 200) {
                clickOnAccept();
            }
        });
    }
}
