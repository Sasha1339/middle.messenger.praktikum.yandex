import Block from '../../utils/block/block.ts';
import Button from '../../components/button/buttons.ts';
import { ProfilePage } from './index.ts';
import arrow from '../../assets/svg/arrow.svg';
import avatar from '../../assets/image/default.png';
import LoadFilesComponent from './modules/load-files/load-files.ts';
import WindowExitComponent from './modules/window-exit/window-exit.ts';
import EditProfileComponent from './modules/edit-profile/edit-profile.ts';
import ChangePasswordComponent from './modules/change-password/change-password.ts';
import { Router } from '../../utils/routing/router.ts';
import ButtonImage from '../../components/button-image/button-image.ts';
import { UserModel } from '../home/utils/model.ts';
import { UserApi } from '../../service/api/user-api.ts';
import { LoginApi } from '../../service/api/login-api.ts';
import { ProfileApi } from '../../service/api/profile-api.ts';

export default class ProfileComponent extends Block {
    router: Router;
    private _user?: UserModel;
    private userApi: UserApi = new UserApi();
    private loginApi: LoginApi = new LoginApi();
    private profileApi: ProfileApi = new ProfileApi();

    constructor() {
        super({
            LoadFileWindow: new LoadFilesComponent({
                clickOnLoad: (data: FormData) => {
                    this.updateAvatar(data);
                    this.closeWindow('window__load-files');
                },
                closeWindow: () => {
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

    updateAvatar(data: FormData): void {
        void this.profileApi.updateAvatar(data).then((response) => {
            if (response.status === 200) {
                this.setProps({
                    avatar: JSON.parse(response.response).avatar
                        ? 'https://ya-praktikum.tech/api/v2/resources' + JSON.parse(response.response).avatar
                        : avatar
                });
            }
        });
    }

    loadProfileData(): void {
        if (!this.userApi) {
            this.userApi = new UserApi();
        }
        void this.userApi
            .request()
            .then((response) => {
                if (response.status === 200) {
                    this._user = JSON.parse(response.response);
                    this.setProps({
                        login: this._user!.login,
                        first_name: this._user!.first_name,
                        second_name: this._user!.second_name,
                        display_name: this._user!.display_name,
                        phone: this._user!.phone,
                        email: this._user!.email,
                        avatar: JSON.parse(response.response).avatar
                            ? 'https://ya-praktikum.tech/api/v2/resources' + JSON.parse(response.response).avatar
                            : avatar
                    });
                    (document.querySelector('[name="login"].profile__input') as HTMLInputElement).value =
                        this._user!.login;
                    (document.querySelector('[name="first_name"].profile__input') as HTMLInputElement).value =
                        this._user!.first_name;
                    (document.querySelector('[name="second_name"].profile__input') as HTMLInputElement).value =
                        this._user!.second_name;
                    (document.querySelector('[name="display_name"].profile__input') as HTMLInputElement).value =
                        this._user!.display_name;
                    (document.querySelector('[name="phone"].profile__input') as HTMLInputElement).value =
                        this._user!.phone;
                    (document.querySelector('[name="email"].profile__input') as HTMLInputElement).value =
                        this._user!.email;
                } else if (response.status === 401) {
                    this.router.go('/401');
                } else if (response.status === 500) {
                    this.router.go('/500');
                } else if (response.status === 404) {
                    this.router.go('/404');
                }
            })
            .catch((error) => {
                console.log(error);
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
