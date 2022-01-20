export class Client{
    constructor(firstname: any, lastname: any, user: any, password: any) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.login = user;
      this.password = password;
    };

    id: number;
  firstname: string;
  lastname: string;
  login: string;
  password: string;
}
