import { Country } from "app/country/country.model";
import { Region } from "app/region/region.model";
import { Accommodation } from "app/accommodation/accommodation.model";

export class Place {
    Id: number;
    Name: string;
    Region: Region;
    RegionId: number;
    Accommodations : Accommodation[];

    constructor (id?: number, name?: string, regionId?: number) {
        this.Id = id;
        this.Name = name;
        this.RegionId = regionId;
    }
}