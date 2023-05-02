import { FileClass } from './FileClass';
import { generateId } from './utils';

export interface FolderInterface {
    name: string;
    id: string;
    parentId?: string;
    children: FileClass[] | FolderClass[];
    appendElementToFolder(
        type: string,
        name: string,
        parentId: string,
        extension?: string
    ): void;
}

export class FolderClass implements FolderInterface {
    name: string;
    id: string;
    children: any[];
    parentId?: string;
    list: any;
    constructor(name: string, id: string, parentId?: string) {
        this.name = name;
        this.id = id;
        this.children = [];
        this.parentId = parentId;
        this.list = document.createElement('ul') as HTMLUListElement;
    }
    appendElementToFolder(
        type: string,
        name: string,
        parentId: string,
        extension?: string
    ) {
        if (type === 'file') {
            let id = generateId();
            let newFile = new FileClass(name, extension ?? '', id, parentId);
            this.children.push(newFile);

            // Create File UI
            let newFileElement = document.createElement('li');
            newFileElement.setAttribute('id', newFile.id);
            newFileElement.classList.add('entry');
            newFileElement.classList.add('file-element');
            let newFileText = document.createTextNode(
                `📄 ${newFile.name}.${newFile.extention}`
            );
            newFileElement.append(newFileText);

            // Add to List
            this.list.appendChild(newFileElement);
            this.renderElements(parentId);
        }

        if (type === 'folder') {
            let id = generateId();
            let newFolder = new FolderClass(name, id, parentId);
            this.children.push(newFolder);

            // Create Folder UI
            let newFolderElement = document.createElement('li');
            newFolderElement.setAttribute('id', newFolder.id);
            newFolderElement.classList.add('entry');
            newFolderElement.classList.add('folder-element');
            let newFolderText = document.createTextNode(`🗂️ ${newFolder.name}`);
            newFolderElement.append(newFolderText);

            // Add to List
            this.list.appendChild(newFolderElement);
            this.renderElements(parentId);
        }
    }
    renderElements(parentId: string) {
        console.log(this.children);
        console.log(this.list);
        let parentFolder = document.querySelector(`[id=${parentId}]`)!;
        parentFolder?.appendChild(this.list);
    }
}
