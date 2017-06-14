import { Accommodation } from "app/accommodation/accommodation.model";

export class Comment {
    Id: number;
    Grade: number;
    Text: string;
    AccommodationId: number;
    Accommodation: Accommodation;
    UserId: number;

    constructor (id?: number, grade?: number, text?: string, accommodationId?: number, userId?: number, accommodation?: Accommodation) {
        this.Id = id;
        this.Grade = grade;
        this.Text = text;
        this.AccommodationId = accommodationId;
        this.UserId = userId;
    }
}