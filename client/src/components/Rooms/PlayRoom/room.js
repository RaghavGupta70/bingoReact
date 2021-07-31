
import queryString from "query-string";
import react from "react"
import {useLocation} from "react-router-dom"

const Room = () => {

    const location = useLocation();
    const {roomID} = queryString.parse(location.search,{
    ignoreQueryPrefix: true
  });
    console.log(location)
    return <h1>{roomID}</h1>
}

export default Room;