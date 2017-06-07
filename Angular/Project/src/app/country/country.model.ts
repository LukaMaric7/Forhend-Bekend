export class Country {
    Id: number;
    Name: string;
    Code: string;

    constructor (id: number, name: string, code: string) {
        this.Id = id;
        this.Name = name;
        this.Code = code;
    }
}