import { Place } from "app/place/place.model";

export class Accommodation {
    Id                  : number;
    Name                : string; 
    Description         : string;
    Address             : string;
    AverageGrade        : number;
    Latitude            : number;
    Longitude           : number;
    ImageURL            : string;
    Approved            : boolean;
    AccommodationTypeId : number;
    Place               : Place;
    PlaceId             : number;
    UserId              : number;

    constructor () {
    }
}