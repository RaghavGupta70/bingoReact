import { OPP_PROF } from "../constants/actionTypes";

const oppProfile = (oppProf = [], action) => {
  switch (action.type) {
    case OPP_PROF:
      return action.payload;

    default:
      return oppProf;
  }
};

export default oppProfile;
