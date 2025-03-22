import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { LoadFileWindow } from './index.ts';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import cross from '../../../../assets/svg/cross.svg';

export default class LoadFilesComponent extends Block {
    constructor(events: { clickOnLoad: (data: FormData) => void; closeWindow: () => void }) {
        super({
            CloseWindow: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Закрыть окошко',
                src: cross,
                events: {
                    click: () => {
                        events.closeWindow();
                    }
                }
            }),
            ButtonLoad: new Button({
                label: 'Загрузить новый аватар',
                class: 'window__button-load',
                events: {
                    click: () => {
                        const data = this.getFile();
                        events.clickOnLoad(data);
                    }
                }
            })
        });
    }

    render(): string {
        return LoadFileWindow;
    }

    getFile(): FormData {
        const input = document.querySelector('input');
        if (input && input.files && input.files[0]) {
            const file = input.files[0];
            const data = new FormData();
            data.append('avatar', file);
            return data;
        }
        return new FormData();
    }
}
