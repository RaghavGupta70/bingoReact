import React,{ useEffect } from "react";
import { useHistory,useLocation } from 'react-router-dom'; 
import JoinRoom from "../../components/Buttons/RoomButton/joinRoom.js"
import homeBG from '../../assets/images/homeBG.jpg';
import './homeStyles.css'


function Home({token}) {
    const history = useHistory();
    const location = useLocation();

   useEffect(() => {
       if(!token){
        location.pathname.replace('/error');
        history.push('/error')
       }

       else
       {
        location.pathname.replace("/home");
        history.push("/home");
       }
   },[location.pathname]);
   
   return(
       <div className="image">
      <JoinRoom style={{display: "flex",margin: "auto"}} />
      </div>
   );
}

export default Home;