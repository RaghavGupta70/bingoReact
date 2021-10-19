import {PROF,UPDATE_IMG} from '../constants/actionTypes';

const profile = (prof=[],action) => {
    switch (action.type) {
      case PROF:
        return action.payload;
      case UPDATE_IMG:
        return action.payload;

        default:
            return prof;
    }
} 

export default profile;