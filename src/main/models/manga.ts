
import Node from './node';
import Download from "./download";

export default class Manga extends Node {
    id: any;
    parent: number;
    children: Node[];
    level: number;
    data: object;

    download: Download

    constructor(id: any, parent: number, children: Node[], level: number, data: object, download: Download) {
        super();
        this.id = id;
        this.parent = parent;
        this.children = children;
        this.level = level;
        this.data = data;
        this.download = download;
    }
}
