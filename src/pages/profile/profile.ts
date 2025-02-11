import Block from "../../utils/block/block.ts";
import Button from "../../components/button/buttons.ts";
import {ProfilePage} from "./index.ts";
import arrow from '../../assets/svg/arrow.svg';
import avatar from '../../assets/image/avatar.jpg';
import LoadFilesComponent from "./modules/load-files/load-files.ts";
import WindowExitComponent from "./modules/window-exit/window-exit.ts";
import EditProfileComponent from "./modules/edit-profile/edit-profile.ts";
import ChangePasswordComponent from "./modules/change-password/change-password.ts";


export default class ProfileComponent extends Block {

    constructor() {
        super({
            LoadFileWindow: new LoadFilesComponent(),
            WindowExit: new WindowExitComponent(),
            ProfileEditWindow: new EditProfileComponent(),
            PasswordChangeWindow: new ChangePasswordComponent(),
            ButtonEditProfile: new Button({
                label: 'Изменить данные',
                class: 'profile__edit'
            }),
            ButtonEditPassword: new Button({
                label: 'Изменить пароль',
                class: 'profile__edit-password'
            }),
            ButtonExit: new Button({
                label: 'Выйти',
                class: 'profile__exit'
            }),
            arrow: arrow,
            avatar: avatar,
        });
    }

    render(): string {
        return ProfilePage;
    }

}
