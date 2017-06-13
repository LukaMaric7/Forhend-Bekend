import { Place } from "app/place/place.model";
import { AccommodationType } from "app/accommodation-type/accommodation-type.model";
import { Room } from "app/room/room.model";

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
    AccommodationType   : AccommodationType;
    AccommodationTypeId : number;
    Place               : Place;
    PlaceId             : number;
    UserId              : number;
    Rooms               : Room[];


    constructor (id? : number, name? : string, description? : string, latitude? : number, longitude? : number,
                 typeId? : number, address? : string, placeId? : number, userId? : number) {
        this.Name = name;
        this.Description = description;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.AccommodationTypeId = typeId;
        this.Address = address;
        this.PlaceId = placeId;
        this.UserId = userId;
        this.Rooms = [];
        this.AccommodationType = new AccommodationType();
        this.Place = new Place();
    }
}