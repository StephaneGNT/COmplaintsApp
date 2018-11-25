import { User } from "./user";

export class complaintMessage {
    constructor(
        public content:string,
        public date:string,
        public author:User,
    ){
        this.content=content;
        this.date=date;
        this.author=author;
    }
}