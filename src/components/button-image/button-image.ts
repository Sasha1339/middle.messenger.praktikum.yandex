import Block from '../../utils/block/block.ts';
import { button_image } from '../button-image';

export default class ButtonImage extends Block {
    constructor(props: Record<string, unknown>) {
        super({ ...props });
    }

    render(): string {
        return button_image;
    }
}
