import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { LoadFileWindow } from './index.ts';

export default class LoadFilesComponent extends Block {
  constructor(events: { clickOnLoad: () => void }) {
    super({
      ButtonLoad: new Button({
        label: 'Загрузить новый аватар',
        class: 'window__button-load',
        events: {
          click: events.clickOnLoad
        }
      })
    });
  }

  render(): string {
    return LoadFileWindow;
  }
}
