export class AppUser{
    Username : string;
    Password : string;
    Email : string;
    Role : string;

    constructor (username: string, password: string, email : string, role : string) {
        this.Username = username;
        this.Password = password;
        this.Email = email;
        this.Role = role;
    }
}