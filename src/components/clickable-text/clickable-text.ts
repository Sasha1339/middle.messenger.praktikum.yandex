import Block from '../../utils/block/block.ts';
import { clickableText } from './index.ts';

export default class ClickableText extends Block {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render(): string {
    return clickableText;
  }
}
