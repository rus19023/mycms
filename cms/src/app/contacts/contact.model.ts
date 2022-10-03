export class Contact {
    constructor(
        public id: number, 
        public cname: string, 
        public email: string, 
        public phone: string, 
        public imageUrl: string, 
        public group: number[]
        ) {}
}
