import Block from "../../utils/block/block.ts";
import { button } from './index.ts'

export default class Button extends Block {

    constructor(props: Record<string, unknown>) {
        super({...props});
    }

    render(): string {
        return button;
    }

}
