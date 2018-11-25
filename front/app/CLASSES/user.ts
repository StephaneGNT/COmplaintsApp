export class User {
    constructor(
        public firstName:string,
        public lastName:string,
        public role:string,
        public password:string,
        public email:string,
        public id:number
    ){
        this.firstName=firstName;
        this.lastName=lastName;
        this.role=role;
        this.password=password;
        this.email=email;
        this.id=id;
    }
    
}