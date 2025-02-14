import Block from '../../utils/block/block.ts';
import Button from '../../components/button/buttons.ts';
import { ProfilePage } from './index.ts';
import arrow from '../../assets/svg/arrow.svg';
import avatar from '../../assets/image/avatar.jpg';
import LoadFilesComponent from './modules/load-files/load-files.ts';
import WindowExitComponent from './modules/window-exit/window-exit.ts';
import EditProfileComponent from './modules/edit-profile/edit-profile.ts';
import ChangePasswordComponent from './modules/change-password/change-password.ts';

export default class ProfileComponent extends Block {
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
                },
                clickOnCancel: () => {
                    this.closeWindow('window__exit');
                }
            }),
            ProfileEditWindow: new EditProfileComponent({
                clickOnAccept: () => {
                    this.closeWindow('window__edit');
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
            events: {
                click: (event: MouseEvent) => {
                    this.findImageElement(event);
                }
            },
            arrow: arrow,
            avatar: avatar
        });
    }

    render(): string {
        return ProfilePage;
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
