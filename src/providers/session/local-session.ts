import { Injectable } from '@angular/core';


@Injectable()
export class LocalSession {
    private fileId: string;
    private newsId: string;
    private profileId: string;

    constructor() {}

    public setFileId(id : string) : void {
        this.fileId = id;
    }
    public setNewsId(id : string) : void {
        this.newsId = id;
    }
    public setProfileId(id : string) : void {
        this.profileId = id;
    }

    public getFileId() : string{
        return this.fileId;
    }
    public getNewsId() : string {
        return this.newsId;
    }
    public getProfileId() : string {
        return this.profileId;
    }
}