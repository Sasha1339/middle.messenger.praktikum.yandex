import Block from '../../utils/block/block.ts';
import Button from '../../components/button/buttons.ts';
import { ProfilePage } from './index.ts';
import arrow from '../../assets/svg/arrow.svg';
import avatar from '../../assets/image/avatar.jpg';
import LoadFilesComponent from './modules/load-files/load-files.ts';
import WindowExitComponent from './modules/window-exit/window-exit.ts';
import EditProfileComponent from './modules/edit-profile/edit-profile.ts';
import ChangePasswordComponent from './modules/change-password/change-password.ts';
import { Router } from '../../utils/routing/router.ts';
import ButtonImage from '../../components/button-image/button-image.ts';
import { UserModel } from '../home/utils/model.ts';
import { UserApi } from '../../service/api/user-api.ts';
import { LoginApi } from '../../service/api/login-api.ts';

export default class ProfileComponent extends Block {
    router: Router;
    private _user?: UserModel;
    private userApi: UserApi = new UserApi();
    private loginApi: LoginApi = new LoginApi();

    constructor() {
        super({
            LoadFileWindow: new LoadFilesComponent({
                clickOnLoad: () => {
                    this.closeWindow('window__load-files');
                }
            }),
            WindowExit: new WindowExitComponent({
                clickOnExit: () => {
                    this.closeWindow('window__exit');
                    this.logoutFromApp();
                },
                clickOnCancel: () => {
                    this.closeWindow('window__exit');
                }
            }),
            ProfileEditWindow: new EditProfileComponent({
                clickOnAccept: () => {
                    this.closeWindow('window__edit');
                    this.loadProfileData();
                },
                clickOnCancel: () => {
                    this.closeWindow('window__edit');
                }
            }),
            PasswordChangeWindow: new ChangePasswordComponent({
                clickOnAccept: () => {
                    this.closeWindow('window__edit-password');
                },
                clickOnCancel: () => {
                    this.closeWindow('window__edit-password');
                }
            }),
            ButtonEditProfile: new Button({
                label: 'Изменить данные',
                class: 'profile__edit',
                events: {
                    click: () => {
                        this.openWindow('window__edit');
                    }
                }
            }),
            ButtonEditPassword: new Button({
                label: 'Изменить пароль',
                class: 'profile__edit-password',
                events: {
                    click: () => {
                        this.openWindow('window__edit-password');
                    }
                }
            }),
            ButtonExit: new Button({
                label: 'Выйти',
                class: 'profile__exit',
                events: {
                    click: () => {
                        this.openWindow('window__exit');
                    }
                }
            }),
            ButtonImage: new ButtonImage({
                class: 'profile__back',
                class_svg: 'svg__arrow',
                alt: 'Вернуться на страницу чатов',
                src: arrow,
                events: {
                    click: () => {
                        this.router.back();
                    }
                }
            }),
            events: {
                click: (event: MouseEvent) => {
                    this.findImageElement(event);
                }
            },
            avatar: avatar
        });

        this.router = new Router('#app');
    }

    isLoaded() {
        this.loadProfileData();
    }

    render(): string {
        return ProfilePage;
    }

    logoutFromApp(): void {
        void this.loginApi.logout().then((response) => {
            if (response.status === 200) {
                this.router.go('/');
            }
        });
    }

    loadProfileData(): void {
        if (!this.userApi) {
            this.userApi = new UserApi();
        }
        void this.userApi.request().then((response) => {
            if (response.status === 200) {
                this._user = JSON.parse(response.response);
                this.setProps({
                    login: this._user!.login,
                    first_name: this._user!.first_name,
                    second_name: this._user!.second_name,
                    display_name: this._user!.display_name,
                    phone: this._user!.phone,
                    email: this._user!.email
                });
            } else if (response.status === 401) {
                this.router.go('/401');
            } else if (response.status === 500) {
                this.router.go('/500');
            } else if (response.status === 404) {
                this.router.go('/404');
            }
        });
    }

    findImageElement(event: MouseEvent): void {
        const img = document.querySelector('.profile__avatar-img');

        if (event.target === img) {
            this.openWindow('window__load-files');
        }
    }

    openWindow(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.remove('profile__windows_disabled');
        window?.classList.add('profile__windows_enabled');
    }

    closeWindow(cssClass: string): void {
        const window = document.querySelector(`.${cssClass}`) as HTMLElement;
        window?.classList.add('profile__windows_disabled');
        window?.classList.remove('profile__windows_enabled');
    }
}
