import { Pipe } from '@angular/core';
import { UserManager } from '../../providers/data-service/user-service';

@Pipe({
    name: 'userIdPipe'
})
export class UserIdPipe {

    constructor(private userManager: UserManager) {

    }

    /**
     * TODO: Important! Check if this pipe affects speed and performance!!!!!!!!!??????????
     * @param userId 
     */
    transform(userId:string) {
        return this.userManager.getProfileById(userId);
    }
}