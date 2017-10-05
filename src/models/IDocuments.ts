import { IUser } from "./IUser";
import { ICountry } from "./ICountry";

export interface IDocument {
    createdAt: string;
    modifiedAt:string;
    description:string;
    extension:string;
    country:ICountry;
    owner:IUser; 
    visibility:string;
    url:string;
}