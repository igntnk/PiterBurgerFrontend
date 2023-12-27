export class CreateUser{
  fio: string;
  role: string;
  password: string;
  email: string;

  constructor(fio:string,email:string,password:string,role:string){
    this.fio = fio;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
