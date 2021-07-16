import { FETCH,CHECK,SIGNUP } from "../constants/actionTypes";

const auth = (users=[],action) => {
    switch(action.type) {
        case FETCH: 
        return action.payload;

        case SIGNUP: 
        return [...users,action.payload];

        case CHECK: 
         return action.payload;

         default:
             return users;

    }
}

export default auth;