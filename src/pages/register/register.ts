import Block from '../../utils/block/block.ts';
import { RegisterPage } from './index.ts';
import Button from '../../components/button/buttons.ts';
import Input from '../../components/input/input.ts';
import ClickableText from '../../components/clickable-text/clickable-text.ts';
import FormComponent from '../../components/form/form.ts';
import { FormContainer } from '../../utils/form/form-container.ts';

export default class RegisterComponent extends Block {
    constructor() {
        super({
            Form: new FormComponent({
                class: 'register',
                FirstNameInput: new Input({
                    placeholder: 'Имя',
                    class: 'register__input',
                    textType: 'text',
                    name: 'first_name',
                    pattern: '^[A-ZА-Я][a-zа-яA-ZА-Я\\-]*$',
                    title: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис',
                    min: 0,
                    max: 100
                }),
                SecondNameInput: new Input({
                    placeholder: 'Фамилия',
                    class: 'register__input',
                    textType: 'text',
                    name: 'second_name',
                    pattern: '^[A-ZА-Я][a-zа-яA-ZА-Я\\-]*$',
                    title: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис',
                    min: 0,
                    max: 100
                }),
                LoginInput: new Input({
                    placeholder: 'Логин',
                    class: 'register__input',
                    textType: 'text',
                    name: 'login',
                    pattern: '^(?!\\d+$)[a-zA-Z0-9]+$',
                    title: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры, не менее 3 символов',
                    min: 3,
                    max: 20
                }),
                EmailInput: new Input({
                    placeholder: 'Email',
                    class: 'register__input',
                    textType: 'text',
                    name: 'email',
                    pattern: '^[A-Za-z0-9\\-_]+@[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+$',
                    title: 'Используйте латинские буквы и цифры, также дефис и нижнее подчеркивание, обязательно должны быть @ и точка',
                    min: 0,
                    max: 100
                }),
                PhoneInput: new Input({
                    placeholder: 'Телефон',
                    class: 'register__input',
                    textType: 'text',
                    name: 'phone',
                    pattern: '^\\+?\\d+$',
                    title: 'Используйте любые цифры, может быть + в начале, от 10 до 15 символов',
                    min: 10,
                    max: 15
                }),
                PasswordOneInput: new Input({
                    placeholder: 'Пароль',
                    class: 'register__input',
                    name: 'password',
                    pattern: '^(?=.*[A-Z])(?=.*\\d).+$',
                    title: 'Должна быть хотя бы одна цифра и заглавная латинская буква, не менее 8 символов',
                    min: 8,
                    max: 40
                }),
                PasswordTwoInput: new Input({
                    placeholder: 'Пароль (еще раз)',
                    class: 'register__input',
                    name: 'password_two',
                    events: {
                        blur: () => {
                            this.onValidate();
                        }
                    }
                }),
                ButtonRegister: new Button({
                    label: 'Зарегестироваться',
                    class: 'register__button'
                }),
                TextLogin: new ClickableText({
                    class: 'register__auth',
                    text: 'Войти'
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
        return RegisterPage;
    }

    outputData(event: SubmitEvent): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        console.log(container);
    }

    onValidate(): void {
        const password = document.querySelector('[name="password"]') as HTMLInputElement;
        const confirmPassword = document.querySelector('[name="password_two"]') as HTMLInputElement;

        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity('Пароли не совпадают!');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
}
