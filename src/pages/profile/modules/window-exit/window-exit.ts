import Block from "../../../../utils/block/block.ts";
import { WindowExit } from './index.ts';
import Button from "../../../../components/button/buttons.ts";

export default class WindowExitComponent extends Block {

    constructor() {
        super({
            ButtonExit: new Button({
                label: 'Выйти',
                class: 'window__button-fixed-size window__button-exit'
            }),
            ButtonCancel: new Button({
                label: 'Отмена',
                class: 'window__button-fixed-size window__button-exit'
            }),
        });
    }

    render(): string {
        return WindowExit;
    }

}
