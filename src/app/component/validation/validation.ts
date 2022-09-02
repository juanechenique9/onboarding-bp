import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { UsersService } from "src/app/services/users/users.service";

export class validationCustom {
    static validateUserExist( userService: UsersService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return userService.getUserExist(value)
            .pipe(
                map( response => {
                    return !response.exists ? null : {existUser: true}
                } )
            )
        }
    }

    static validateNoExistUser( userService: UsersService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return userService.getUserExist(value)
            .pipe(
                map( response => {
                    return response.exists ? null : {existUser: true}
                } )
            )
        }
    }
}