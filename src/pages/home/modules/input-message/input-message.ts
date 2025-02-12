import Block from "../../../../utils/block/block.ts";

export default class InputMessageComponent extends Block {

    constructor(props: Record<string, unknown>) {
        super({...props});
    }

    render(): string {
        return `<input type="text" name="message" class="home__input-message" placeholder="Сообщение">`;
    }

}
