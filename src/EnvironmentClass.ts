import { FileClass } from './FileClass';
import { FolderClass } from './FolderClass';

import { generateId } from './utils/index';

const elementsDiv = document.querySelector('#elements');

type FileType = FileClass | FileClass[];
type FolderType = FolderClass | FolderClass[];

export interface EnvironmentInterface {
    entries: FileType | FolderType;
    addEntry(type: string, name: string, extension?: string): void;
}

export class EnvironmentClass implements EnvironmentInterface {
    entries: FileClass[] | FolderClass[];
    constructor() {
        this.entries = [];
    }
    addEntry(type: string, name: string, extension?: string) {
        if (type === 'file') {
            let id = generateId();
            let newFile = new FileClass(name, extension ? extension : '', id);
            this.entries.push(newFile);
            let newFileElement = document.createElement('div');

            // Controls
            let controlElements = document.createElement('div');
            controlElements.classList.add('controls');
            let deleteButton = document.createElement('button');
            let deleteButtonText = document.createTextNode('Delete');
            deleteButton.classList.add('button-delete');
            deleteButton.append(deleteButtonText);
            controlElements.append(deleteButton);

            newFileElement.setAttribute('id', id);
            newFileElement.classList.add('entry');
            newFileElement.classList.add('file-element');
            let newFileText = document.createTextNode(
                `📄 ${newFile.name}.${newFile.extention}`
            );
            newFileElement.append(newFileText);
            newFileElement.appendChild(controlElements);
            elementsDiv?.appendChild(newFileElement);
        }
        if (type === 'folder') {
            let id = generateId();
            let newFolder = new FolderClass(name, id);
            this.entries.push(newFolder);
            let newFolderElement = document.createElement('div');

            // Controls
            let controlElements = document.createElement('div');
            controlElements.classList.add('controls');

            let createButtonFile = document.createElement('button');
            let createButtonFileText = document.createTextNode('+ File');
            createButtonFile.classList.add('button-create-file');
            createButtonFile.append(createButtonFileText);

            let createButtonFolder = document.createElement('button');
            let createButtonFolderText = document.createTextNode('+ Folder');
            createButtonFolder.classList.add('button-create-folder');
            createButtonFolder.append(createButtonFolderText);

            let deleteButton = document.createElement('button');
            let deleteButtonText = document.createTextNode('Delete');
            deleteButton.classList.add('button-delete');
            deleteButton.append(deleteButtonText);
            controlElements.appendChild(createButtonFile);
            controlElements.appendChild(createButtonFolder);
            controlElements.append(deleteButton);

            newFolderElement.setAttribute('id', id);
            newFolderElement.classList.add('entry');
            newFolderElement.classList.add('folder-element');
            let newFolderText = document.createTextNode(`🗂️ ${newFolder.name}`);
            newFolderElement.append(newFolderText);
            newFolderElement.appendChild(controlElements);
            elementsDiv?.appendChild(newFolderElement);
        }
    }
    addChildren(
        type: string,
        parentId: string,
        name: string,
        extension?: string
    ) {
        console.log(parentId);
        if (type === 'file') {
            this.entries.forEach((entry) => {
                if (entry.id === parentId && entry instanceof FolderClass) {
                    entry.appendElementToFolder(
                        'file',
                        name,
                        parentId,
                        extension ? extension : ''
                    );
                }
            });
        }
        if (type === 'folder') {
            this.entries.forEach((entry) => {
                if (entry.id === parentId && entry instanceof FolderClass) {
                    entry.appendElementToFolder('folder', name, parentId);
                }
            });
        }
    }
    deleteEntry(id: string) {
        const filteredEntries = this.entries.filter((entry) => {
            return entry.id !== id;
        });
        this.entries = filteredEntries;
    }
}
