import { CREATE_ROOM, JOIN_ROOM, FETCH_ROOM } from '../constants/actionTypes';

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
            break;

        default:
            return player;
    }
}

export default game;