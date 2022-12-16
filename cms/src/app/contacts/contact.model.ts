export class Contact {
    constructor(
        public id: string, 
        public cname: string, 
        public email: string, 
        public phone: string, 
        public imageUrl: string, 
        public group: Contact[]
        ) {}
}
