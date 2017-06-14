import { Accommodation } from "app/accommodation/accommodation.model";
import { AppUser } from 'app/register-manager/appUser.model';

export class Comment {
    Id: number;
    Grade: number;
    Text: string;
    AccommodationId: number;
    Accommodation: Accommodation;
    UserId: number;
    User: AppUser;

    constructor (id?: number, grade?: number, text?: string, accommodationId?: number, userId?: number,
     accommodation?: Accommodation, user?: AppUser) {
        this.Id = id;
        this.Grade = grade;
        this.Text = text;
        this.AccommodationId = accommodationId;
        this.UserId = userId;
        this.Accommodation = accommodation;
        this.User = user;
    }
}