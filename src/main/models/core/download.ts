import {Type} from '../meta';

export default class Download {

	data: object;
	// type: Type;
	url: string;

	// TODO: this is related to the object being downloaded
	// name: string;
	// number: number;
	completion: number;

	/**
	 * Download
	 * @param {object} data
	 * @param {string} url
	 * @param {number} completion
	 */
	// constructor(type: Type, url: string, name: string, number: number, completion: number, downloaded: boolean) {
	// constructor(type: Type, url: string, completion: number = 0.0) {
	constructor(data: object, url: string, completion: number = 0.0) {
		// this.type = type;
		this.data = data;
		this.url = url;
		// this.name = name;
		// this.number = number;
		this.completion = completion;
	}

	get downloaded(): boolean {
		return this.completion === 1.0;
	}

	toString(): string {
		// return `[${this.type}] #${this.number} - ${this.name} > ${(this.downloaded ? 'COMPLETE' : this.completion + '%')}`;
		return `[${this.data}] ${this.url} > ${(this.downloaded ? 'COMPLETE' : this.completion + '%')}`;
	}
}
