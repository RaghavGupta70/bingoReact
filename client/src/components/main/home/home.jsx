import React,{ useEffect } from "react";
import { useHistory } from 'react-router-dom';

function Home({token}) {
    const history = useHistory();
   useEffect(() => {
       if(!token)
        history.push('SignIn');
   });
   
   return(
       <>
      {token && <h1>Hello</h1>}
      </>
   );
}

export default Home;