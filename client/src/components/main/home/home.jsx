import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom';
import BingoGrid from '../../BingoGame/bingoGrid'; 

function Home({token}) {
    const history = useHistory();
   useEffect(() => {
       if(!token)
        history.push('SignIn');
   });
   
   return(
       <>
      {token && <BingoGrid />}
      </>
   );
}

export default Home;