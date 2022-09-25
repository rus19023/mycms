export class Contact {
    public id: number;
    public cname: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: number[];

    constructor(id: number, cname: string, email: string, phone: string, imageUrl: string, group: number[]) {
        this.id = id;
        this.cname = cname;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}
