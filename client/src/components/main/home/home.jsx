import react from "react";

function Home({token}) {
console.log(token)
   if(token)
   {
       return(<h1>Hello</h1>)
   }

   else
   return(<h1>SignIn</h1>)
}

export default Home;