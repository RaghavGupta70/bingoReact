import { FETCH,CHECK,SIGNUP } from "../constants/actionTypes";

const auth = (users={authData:null},action) => {
    switch(action.type) {
        case FETCH: 
        return action.payload;

        case AUTH:
            localStorage.setItem("user",JSON.stringify({...action?.data})) 
            return {...users,authData:action?.data};
        case CHECK: 
         return localStorage.getItem("user");

         default:
             return users;

    }
}

export default auth;