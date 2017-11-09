import { IUser } from "./IUser";
import { ICountry } from "./ICountry";

export interface IDocument {
    id: string,
    title: string;
    createdAt: string;
    modifiedAt:string;
    description:string;
    extension:string;
    country:ICountry;
    owner:IUser; 
    visibility:string;
    url:string;
    // categories:ICategory[];
    // tags: ITag[];
    categories:string;
    tags: string;
}