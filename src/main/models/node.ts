
export default abstract class Node {

	abstract id: any;
	abstract parent: number;
	abstract children: Node[];
	abstract level: number;
	abstract data: object;

	toString():string {
		return `${this.id}`;
	}
}
