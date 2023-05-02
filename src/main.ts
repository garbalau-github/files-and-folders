/**
 * Folder and File Structure
 * We start from empty environment
 * We can create folders and files and give them names
 * Folders and files have different icons
 * Folders can contain over folders and files
 * We can delete files and folders (if top level folder is deleted, everythin it contaned is deleted as well)
 */

const buttonAddFile = document.querySelector('#button-add-file');
const buttonAddFolder = document.querySelector('#button-add-folder');
const buttonCancel = document.querySelector('#button-cancel');
const elementsDiv = document.querySelector('#elements');

import { EnvironmentClass } from './EnvironmentClass';

// Inputs
const inputFolderName = document.querySelector(
    '#input-folder-name'
) as HTMLInputElement;
const inputFileName = document.querySelector(
    '#input-file-name'
) as HTMLInputElement;
const inputFileExtension = document.querySelector(
    '#input-file-extension'
) as HTMLInputElement;

const fileForm = document.querySelector('#file-form');
const folderForm = document.querySelector('#folder-form');

import './style.css';

const ENVIRONMENT = new EnvironmentClass();

let CREATION_MODE = 'GLOBAL';
let PARENT_ID = '';

// File example
ENVIRONMENT.addEntry('folder', 'hooks');
ENVIRONMENT.addEntry('file', 'index', 'html');

// Functions
const createNewFile = (fileName: string, extension: string): void => {
    ENVIRONMENT.addEntry('file', fileName, extension);
};

const createNewFolder = (folderName: string): void => {
    ENVIRONMENT.addEntry('folder', folderName);
};

const createNewFileChildren = (name: string, extension: string) => {
    console.log(PARENT_ID);
    ENVIRONMENT.addChildren('file', PARENT_ID, name, extension);
    PARENT_ID = '';
};

const createNewFolderChildren = (name: string) => {
    console.log(PARENT_ID);
    ENVIRONMENT.addChildren('folder', PARENT_ID, name);
    PARENT_ID = '';
};

const toggleChildrenFileMode = (parentId: string) => {
    CREATION_MODE = 'CHILDREN';
    PARENT_ID = parentId;
    buttonAddFile?.classList.add('hide');
    buttonAddFolder?.classList.add('hide');
    fileForm?.classList.add('show');
};

const toggleChildrenFolderMode = (parentId: string) => {
    CREATION_MODE = 'CHILDREN';
    PARENT_ID = parentId;
    buttonAddFile?.classList.add('hide');
    buttonAddFolder?.classList.add('hide');
    folderForm?.classList.add('show');
};

const clearState = () => {
    inputFolderName.value = '';
    inputFileName.value = '';
    inputFileExtension.value = '';
};

// Events
buttonAddFile?.addEventListener('click', () => {
    CREATION_MODE = 'GLOBAL';
    buttonCancel?.classList.add('show');
    folderForm?.classList.remove('show');
    fileForm?.classList.add('show');
});

buttonAddFolder?.addEventListener('click', () => {
    CREATION_MODE = 'GLOBAL';
    buttonCancel?.classList.add('show');
    fileForm?.classList.remove('show');
    folderForm?.classList.add('show');
});

buttonCancel?.addEventListener('click', () => {
    fileForm?.classList.remove('show');
    folderForm?.classList.remove('show');
    buttonCancel?.classList.remove('show');
    clearState();
});

fileForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputFileName?.value !== '' && inputFileExtension?.value !== '') {
        if (CREATION_MODE === 'GLOBAL') {
            createNewFile(inputFileName?.value, inputFileExtension?.value);
        }
        if (CREATION_MODE === 'CHILDREN') {
            createNewFileChildren(
                inputFileName?.value,
                inputFileExtension?.value
            );
        }
    }
    clearState();
    fileForm?.classList.remove('show');
    buttonCancel?.classList.remove('show');
    buttonAddFile?.classList.remove('hide');
    buttonAddFolder?.classList.remove('hide');
});

folderForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputFolderName?.value !== '') {
        if (CREATION_MODE === 'GLOBAL') {
            createNewFolder(inputFolderName?.value);
        }
        if (CREATION_MODE === 'CHILDREN') {
            createNewFolderChildren(inputFolderName?.value);
        }
    }
    inputFolderName.value = '';
    folderForm?.classList.remove('show');
    buttonCancel?.classList.remove('show');
    buttonAddFile?.classList.remove('hide');
    buttonAddFolder?.classList.remove('hide');
});

elementsDiv?.addEventListener('click', (e) => {
    const element = e.target as HTMLDivElement | HTMLButtonElement;
    if (element.classList.contains('button-create-file')) {
        let parentId = element.parentElement?.parentElement?.getAttribute('id');
        toggleChildrenFileMode(`${parentId}`);
    }
    if (element.classList.contains('button-create-folder')) {
        let parentId = element.parentElement?.parentElement?.getAttribute('id');
        toggleChildrenFolderMode(`${parentId}`);
    }
    if (element.classList.contains('button-delete')) {
        let entryId = element.parentElement?.parentElement?.getAttribute('id');
        element.parentElement?.parentElement?.remove();
        ENVIRONMENT.deleteEntry(`${entryId}`);
    }
});
