import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";

@Injectable()
export class CountryListService {

    countries : Country[];

    constructor(){
        this.countries = [];
     }

    getAll(){
        return this.countries;
    }

    getById(id : number){
        return this.countries.find(c => c.Id == id);
    }

    add(country : Country){
        this.countries.push(country);
    }
}