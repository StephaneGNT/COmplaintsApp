import { User } from "./user";
import { complaintMessage } from "./complaintMessage";

export class Complaint {
    constructor(
        public theme:string,
        public title:string,
        public author:User,
        public recipients:[User],
        public messages:[complaintMessage],
        public id:number,
        public status:string,
    ){
        this.theme=theme;
        this.title=title;
        this.author=author;
        this.recipients=recipients;
        this.messages=messages;
        this.id=id;
        this.status=status;
    }
}