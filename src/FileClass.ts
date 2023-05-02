export interface FileInterface {
    name: string;
    extention: string;
    id: string;
    parentId?: string;
}

export class FileClass implements FileInterface {
    name: string;
    extention: string;
    id: string;
    parentId?: string;
    constructor(
        name: string,
        extention: string,
        id: string,
        parentId?: string
    ) {
        this.name = name;
        this.extention = extention;
        this.id = id;
        this.parentId = parentId;
    }
}
