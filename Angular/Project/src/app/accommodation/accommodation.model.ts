import { Place } from "app/place/place.model";
import { AccommodationType } from "app/accommodation-type/accommodation-type.model";

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
    Accommodation       : AccommodationType;
    AccommodationTypeId : number;
    Place               : Place;
    PlaceId             : number;
    UserId              : number;

    constructor () {
    }
}