import Block from "../../utils/block/block.ts";
import Input from "../input/input.ts";

export default class FormComponent extends Block {

    constructor(props: Record<string, unknown>) {
        super({...props});
    }

    render(): string {
        return `<form class="{{class}}__form" id="formData">
                    <div class="{{class}}__inputs">
                        ${this.buildTemplateInputs()}
                    </div>
                    <div class="{{class}}__inputs">
                        ${this.buildTemplateOther()}
                    </div>
                </form>`;
    }

    buildTemplateInputs(): string {
        let result = '';
        for (let i = 0; i < Object.keys(this._children).length; i++) {
            if (this._children[Object.keys(this._children)[i]] instanceof Input) {
                result += `{{{ ${Object.keys(this._children)[i]} }}}\n`
            }
        }
        return result;
    }

    buildTemplateOther(): string {
        let result = '';
        for (let i = 0; i < Object.keys(this._children).length; i++) {
            if (!(this._children[Object.keys(this._children)[i]] instanceof Input)) {
                result += `{{{ ${Object.keys(this._children)[i]} }}}\n`
            }
        }
        return result;
    }

}
