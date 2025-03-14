import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { CreateChatWindow } from './index.ts';
import Input from '../../../../components/input/input.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
import FormComponent from '../../../../components/form/form.ts';
import { FormContainer } from '../../../../utils/form/form-container.ts';
import { ChatApi } from '../../../../service/api/chat-api.ts';
export default class CreateChat extends Block {
    private _serviceChatApi: ChatApi = new ChatApi();

    constructor(events: { clickOnAccept: () => void; clickOnCancel: () => void }) {
        super({
            Form: new FormComponent({
                class: 'window',
                id: 'changePasswordFormFormData',
                WriteTitle: new Input({
                    placeholder: 'Название чата',
                    class: 'window__input',
                    textType: 'text',
                    name: 'title',
                    pattern: '^(?!\\s*$).+',
                    title: 'Название чата не должно быть пустым',
                    min: 1,
                    max: 40
                }),
                ButtonAccept: new Button({
                    label: 'Создать чат',
                    class: 'window__button-edit-password'
                }),
                TextCancel: new ClickableText({
                    class: 'window__button-cancel',
                    text: 'Отмена',
                    events: {
                        click: events.clickOnCancel
                    }
                }),
                events: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();
                        this.outputData(event, events.clickOnAccept);
                    }
                }
            })
        });
    }

    outputData(event: SubmitEvent, handler: () => void): void {
        const container = new FormContainer(event.target as HTMLFormElement);
        void this._serviceChatApi.create(container.fields).then((response) => {
            if (response.status === 200) {
                handler();
            }
        });
    }

    render(): string {
        return CreateChatWindow;
    }
}
