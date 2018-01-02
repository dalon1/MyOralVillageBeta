import { ICountry } from "./ICountry";
import { Role } from "./Role";

export interface IUser {
    id: string;
    name: string, 
    email:string,  
    avatarUrl?:string, 
    description:string,
    country?: ICountry;
    role:Role;
}