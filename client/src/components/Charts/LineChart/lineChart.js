import {Line} from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { fetchOppProfile } from '../../../actions';
import { useEffect } from 'react';
import { useSelector } from "react-redux";


const LineChart = ({value,reload,playerData}) => {
     const oppProfileDetails = useSelector((state) => state.oppProfile);
  const dispatch = useDispatch();
  console.log(value)

 useEffect(() => {
   dispatch(fetchOppProfile(value[0].opponentEmail));
   console.log(oppProfileDetails);
   console.log(playerData)
 }, [dispatch]);
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Your Stats",
          data: playerData.matches.map((p)=>(p.matchWon)),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Opponent Stats",
          data: oppProfileDetails.matches.map((op) => (op.matchWon)),
          fill: false,
          borderColor: "#742774",
        },
      ],
    };
    return (
      <>
        {console.log(reload)}
        <Line data={data} />
      </>
    );
}

export default LineChart;