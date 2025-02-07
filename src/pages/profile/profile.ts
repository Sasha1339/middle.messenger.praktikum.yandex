import './profile.css'
import * as Modules from './modules'
import Handlebars from 'handlebars';

Object.entries(Modules).forEach(([name, template]) => {
    Handlebars.registerPartial(name, template);
})

function openWindowEdit() {
    const avatarElement = document.querySelector('.profile__edit');

    if (avatarElement) {
        avatarElement.addEventListener('click', () => {
            const windowLoadFiles = document.querySelector('.window__edit');
            windowLoadFiles?.classList.remove('profile__windows_disabled');
            windowLoadFiles?.classList.add('profile__windows_enabled');
        })
    }
}

function openWindowEditPassword() {
    const avatarElement = document.querySelector('.profile__edit-password');

    if (avatarElement) {
        avatarElement.addEventListener('click', () => {
            const windowLoadFiles = document.querySelector('.window__edit-password');
            windowLoadFiles?.classList.remove('profile__windows_disabled');
            windowLoadFiles?.classList.add('profile__windows_enabled');
        })
    }
}

function editProfile() {
    const editElement = document.querySelector('.window__button-edit');

    if (editElement) {
        editElement.addEventListener('click', () => {
            const windowEnabled = document.querySelector('.profile__windows_enabled');
            windowEnabled?.classList.add('profile__windows_disabled');
            windowEnabled?.classList.remove('profile__windows_enabled');
        })
    }
}

function editPasswordFun() {
    const editPasswordElement = document.querySelector('.window__button-edit-password');

    if (editPasswordElement) {
        editPasswordElement.addEventListener('click', () => {
            const windowEnabled = document.querySelector('.profile__windows_enabled');
            windowEnabled?.classList.add('profile__windows_disabled');
            windowEnabled?.classList.remove('profile__windows_enabled');
        })
    }
}

function loadNewAvatar() {
    const avatarElement = document.querySelector('.profile__avatar-img');

    if (avatarElement) {
        avatarElement.addEventListener('click', () => {
            const windowLoadFiles = document.querySelector('.window__load-files');
            windowLoadFiles?.classList.remove('profile__windows_disabled');
            windowLoadFiles?.classList.add('profile__windows_enabled');
        })
    }
}

function exitFromAcc() {
    const exitElement = document.querySelector('.profile__exit');

    if (exitElement) {
        exitElement.addEventListener('click', () => {
            const windowLoadFiles = document.querySelector('.window__exit');
            windowLoadFiles?.classList.remove('profile__windows_disabled');
            windowLoadFiles?.classList.add('profile__windows_enabled');
        })
    }
}

function cancel() {
    const cancelButtons = document.querySelectorAll('.window__button-cancel');

    if (cancelButtons) {
        cancelButtons.forEach((e) => {
            e.addEventListener('click', () => {
                const windowEnabled = document.querySelector('.profile__windows_enabled');
                windowEnabled?.classList.add('profile__windows_disabled');
                windowEnabled?.classList.remove('profile__windows_enabled');
            })
        })
    }
}

function avatarIsLoaded() {
    const loadButton = document.querySelector('.window__button-load');

    if (loadButton) {
        loadButton.addEventListener('click', () => {
            const windowEnabled = document.querySelector('.profile__windows_enabled');
            windowEnabled?.classList.add('profile__windows_disabled');
            windowEnabled?.classList.remove('profile__windows_enabled');
        })
    }
}

export function setup() {
    loadNewAvatar();
    avatarIsLoaded();
    exitFromAcc();
    cancel();
    editProfile();
    openWindowEdit();
    openWindowEditPassword();
    editPasswordFun();
}
