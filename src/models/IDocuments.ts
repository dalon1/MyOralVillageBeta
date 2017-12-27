import { IUser } from "./IUser";
import { ICountry } from "./ICountry";
import { IComment } from './IComment';

export interface IDocument {
    id: string,
    file: File;
    name: string; // actual name of the file
    size: number;
    type: string;
    title: string; // given name by user 
    createdAt: Date;
    modifiedAt:Date;
    description:string;
    extension:string;
    country:ICountry;
    owner:IUser;
    // this is just temporal
    userId: string; 
    visibility:string;
    url:string;
    categories:string[];
    tags: string[];
    comments: IComment[];
}