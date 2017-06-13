import { Accommodation } from "app/accommodation/accommodation.model";

export class Room {
    Id: number;
    RoomNumber: number;
    BadCount: number;
    Descriptio: string;
    PricePerNight: number;
    AccommodationId: number;
    Accommodation: Accommodation;

    constructor (id?: number, roomNumber?: number, badCount?: number, description?: string, pricePerNight?: number, accommodationId?: number, accommodation?: Accommodation) {
        this.Id = id;
        this.RoomNumber = roomNumber;
        this.BadCount = badCount;
        this.Descriptio = description;
        this.PricePerNight = pricePerNight;
        this.AccommodationId = accommodationId;
        this.Accommodation = accommodation;
    }
}