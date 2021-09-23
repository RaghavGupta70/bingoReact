import {PROF} from '../constants/actionTypes';

const profile = (prof={},action) => {
    switch (action.type) {
      case PROF:
        return action.payload;

        default:
            return prof;
    }
} 

export default profile;