import { FETCH,CHECK,AUTH } from "../constants/actionTypes";

const auth = (users={authData:null},action) => {
    switch(action.type) {
        case FETCH: 
        return action.payload;

        case AUTH:
            localStorage.setItem("user",JSON.stringify({...action?.payload})) 
            return {...users,authData:action?.payload};
        case CHECK: 
         return localStorage.getItem("user");

         default:
             return users;

    }
}

export default auth;