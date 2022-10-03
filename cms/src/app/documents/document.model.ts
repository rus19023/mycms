export class Document {
    constructor(
        public id: number, 
        public dname: string, 
        public description: string, 
        public url: string, 
        public children: []
        ) {}
}
