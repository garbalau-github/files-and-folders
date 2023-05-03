import './style.css';
import { EnvironmentClass } from './classes/EnvironmentClass';

// * DOM REFERENCES
const buttonAddFile = document.querySelector('#button-add-file');
const buttonAddFolder = document.querySelector('#button-add-folder');
const buttonCancel = document.querySelector('#button-cancel');
const elementsDiv = document.querySelector('#elements');
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

// * GLOBALS
const ENVIRONMENT = new EnvironmentClass();
let CREATION_MODE = 'GLOBAL';
let PARENT_ID = '';

// * INITIAL CODE
ENVIRONMENT.addEntry('folder', 'hooks');
ENVIRONMENT.addEntry('file', 'index', 'html');
ENVIRONMENT.addEntry('file', 'style', 'css');

// * FUNCTIONS
const createNewFile = (fileName: string, extension: string): void => {
    ENVIRONMENT.addEntry('file', fileName, extension);
};

const createNewFolder = (folderName: string): void => {
    ENVIRONMENT.addEntry('folder', folderName);
};

const createNewFileChildren = (name: string, extension: string) => {
    ENVIRONMENT.addChildren('file', PARENT_ID, name, extension);
    PARENT_ID = '';
};

const createNewFolderChildren = (name: string) => {
    ENVIRONMENT.addChildren('folder', PARENT_ID, name);
    PARENT_ID = '';
};

const toggleChildrenForm = (formType: string, parentId: string) => {
    CREATION_MODE = 'CHILDREN';
    PARENT_ID = parentId;
    buttonAddFile?.classList.add('hide');
    buttonAddFolder?.classList.add('hide');
    if (formType === 'file') {
        fileForm?.classList.add('show');
        return;
    }
    if (formType === 'folder') {
        folderForm?.classList.add('show');
        return;
    }
};

const clearState = () => {
    inputFolderName.value = '';
    inputFileName.value = '';
    inputFileExtension.value = '';
    buttonCancel?.classList.remove('show');
    buttonAddFile?.classList.remove('hide');
    buttonAddFolder?.classList.remove('hide');
};

// * EVENTS
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
    clearState();
    folderForm?.classList.remove('show');
});

elementsDiv?.addEventListener('click', (e) => {
    const element = e.target as HTMLDivElement | HTMLButtonElement;
    if (element.classList.contains('button-create-file')) {
        let parentId = element.parentElement?.parentElement?.getAttribute('id');
        toggleChildrenForm('file', `${parentId}`);
    }
    if (element.classList.contains('button-create-folder')) {
        let parentId = element.parentElement?.parentElement?.getAttribute('id');
        toggleChildrenForm('folder', `${parentId}`);
    }
    if (element.classList.contains('button-delete')) {
        let entryId = element.parentElement?.parentElement?.getAttribute('id');
        element.parentElement?.parentElement?.remove();
        ENVIRONMENT.deleteEntry(`${entryId}`);
    }
});
