import { UserTypes } from "./@types/user";

let currentUser: UserTypes; 

export const setCurrentUser = (new_user: UserTypes) => {
    currentUser = new_user
}

export const getCuurentUser = () => {
    return currentUser;
}