import { CREATE_ROOM, JOIN_ROOM, FETCH_ROOM, CUT_NUM } from '../constants/actionTypes';

const game = (player = [], action) => {
    switch (action.type) {
        case CREATE_ROOM:
            sessionStorage.setItem('usersRoom', JSON.stringify([action.payload]));
            return [action.payload];

        case JOIN_ROOM:
            sessionStorage.setItem('usersRoom', JSON.stringify([action.payload]));
            return [action.payload];

        case FETCH_ROOM:
            const allData = action.payload;
            sessionStorage.setItem('usersRoom', JSON.stringify(allData));
            return action.payload;
        
        case CUT_NUM:
            const oldData = player;
            for(var i=0;i<oldData.length;i++){
                oldData[i].numbers.push(action.payload);
            }
            console.log(oldData)
            return oldData;   

        default:
            return player;
    }
}

export default game;