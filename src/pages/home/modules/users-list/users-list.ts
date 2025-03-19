import Block from '../../../../utils/block/block.ts';
import { UserModel } from '../../utils/model.ts';
import UserComponent from '../user/user.ts';

export default class UserListComponent extends Block {
    constructor(users: UserModel[], deleteUsers: (userId: number) => void) {
        super(
            Object.fromEntries(
                users.map((item, index) => [
                    `User${index}`,
                    new UserComponent(item, (userId: number) => {
                        deleteUsers(userId);
                    })
                ])
            )
        );
    }

    render(): string {
        return `<section class="home__user-list">${this.buildTemplate()}</section>`;
    }

    buildTemplate(): string {
        let result = '';
        for (let i = 0; i < Object.keys(this._children).length; i++) {
            result += `{{{ User${i} }}}\n`;
        }
        return result;
    }
}
