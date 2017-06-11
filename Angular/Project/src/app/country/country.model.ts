import { Region } from "app/region/region.model"

export class Country {
    Id: number;
    Name: string;
    Code: string;
    Regions : Region[];

    constructor (id?: number, name?: string, code?: string, regions? : Region[]) {
        this.Id = id;
        this.Name = name;
        this.Code = code;
        this.Regions = regions;
    }
}