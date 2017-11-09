import { ICountry } from "./ICountry";
import { Role } from "./Role";

export interface IUser {
    name: string, 
    email:string,
    description:string,
    country?: ICountry;
    role:Role;
}