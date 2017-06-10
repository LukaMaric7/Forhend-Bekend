
import { Country } from "app/country/country.model";
import { Place } from "app/place/place.model";

export class Region {
    Id: number;
    Name: string;
    Country: Country;
    CountryId: number;
    Places: Place[];

    constructor (id: number, name: string, countryId: number) {
        this.Id = id;
        this.Name = name;
        this.CountryId = countryId;
    }
}