export class AppUser{
    Username : string;
    Password : string;
    Email : string;
    Role : string;
    Name : string;
    Lastname : string;
    IsBanned : boolean;

    constructor (username: string, password: string, email : string, role : string, lastName : string, name : string) {
        this.Username = username;
        this.Password = password;
        this.Email = email;
        this.Role = role;
        this.Lastname = lastName;
        this.Name = name;
        this.IsBanned = false;
    }
}