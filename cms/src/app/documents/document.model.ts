export class Document {
    constructor(
        public id: string, 
        public dname: string, 
        public description: string, 
        public url: string, 
        public children: []
        ) {}
}
