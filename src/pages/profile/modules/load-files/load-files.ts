import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { LoadFileWindow } from './index.ts';
import { ProfileApi } from '../../../../service/api/profile-api.ts';

export default class LoadFilesComponent extends Block {
    private _profileApi: ProfileApi = new ProfileApi();

    constructor(events: { clickOnLoad: (file?: File) => void }) {
        super({
            ButtonLoad: new Button({
                label: 'Загрузить новый аватар',
                class: 'window__button-load',
                events: {
                    click: () => {
                        this.getFile();
                        events.clickOnLoad;
                    }
                }
            })
        });
    }

    render(): string {
        return LoadFileWindow;
    }

    getFile(): void {
        const input = document.querySelector('input');
        if (input && input.files && input.files[0]) {
            const file = input.files[0];
            const data = new FormData();
            data.append('avatar', file);
            void this._profileApi.updateAvatar(data).then((response) => {
                if (response.status === 200) {
                    //
                }
            });
        }
    }
}
