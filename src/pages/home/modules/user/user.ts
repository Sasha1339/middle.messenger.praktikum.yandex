import Block from '../../../../utils/block/block.ts';
import { User } from './index.ts';
import { UserModel } from '../../utils/model.ts';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import card from '../../../../assets/svg/card.svg';

export default class UserComponent extends Block {
    constructor(message: UserModel) {
        super({
            DeleteImage: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Закрыть окошко',
                src: card,
                events: {
                    click: () => {
                        //
                    }
                }
            }),
            first_name: message.first_name,
            second_name: message.second_name
        });
    }

    render(): string {
        return User;
    }
}
