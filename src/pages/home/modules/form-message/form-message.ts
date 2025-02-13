import Block from '../../../../utils/block/block.ts';
import { FormMessage } from './index.ts';
import add from '../../../../assets/svg/add.svg';
import arrow from '../../../../assets/svg/arrow.svg';

export default class FormMessageComponent extends Block {
  constructor(props: Record<string, unknown>) {
    super({ ...props, add: add, arrow: arrow });
  }
  render(): string {
    return FormMessage;
  }
}
