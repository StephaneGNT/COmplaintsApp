import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../CLASSES/user';

/* Pipes is used to display only the complaints loggedUser can see (i.e when he is sender or recipient), 
  or the chosen one (only the one sent, or only the one received) */
@Pipe({
name: 'usersFilter',
pure: true
})
export class UsersFilterPipe implements PipeTransform {
transform(usersArray: [User], loggedUser: User): Object[] {
    return usersArray.filter(user => user.email!=loggedUser.email);
    //return usersArray;
    }
}