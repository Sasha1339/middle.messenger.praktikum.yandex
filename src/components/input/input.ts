import Block from "../../utils/block/block.ts";
import { input } from './index.ts';

export default class Input extends Block {

    constructor(props: Record<string, unknown>) {
        super({...props});
    }

    render(): string {
        return input;
    }

}
