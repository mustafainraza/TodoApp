export class User {
    private userId: number;
    private userName: string;
    private email: string;
    private age: number;
    private userImg: string;


constructor(userId:number,userName: string,email: string,age:number,userImg: string) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.age = age;
    this.userImg = userImg;
   }

   public get userId():number{
        return this.userId;
   }

}