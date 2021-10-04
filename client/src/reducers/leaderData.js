import { LEAD_DATA } from "../constants/actionTypes";

const leaderBoardDataSet = (globalLeader = [], action) => {
  switch (action.type) {
    case LEAD_DATA:
      return action.payload;

    default:
      return globalLeader;
  }
};

export default leaderBoardDataSet;
