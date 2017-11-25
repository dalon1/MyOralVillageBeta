import { IUser } from "./IUser";
import { ICountry } from "./ICountry";
import { IComment } from './IComment';

export interface IDocument {
    id: string,
    title: string;
    createdAt: string;
    modifiedAt:string;
    description:string;
    extension:string;
    country:ICountry;
    owner:IUser;
    // this is just temporal
    userId: string; 
    visibility:string;
    url:string;
    // categories:ICategory[];
    // tags: ITag[];
    categories:string[];
    tags: string[];
    comments: IComment[];
}