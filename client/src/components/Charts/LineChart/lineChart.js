import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { fetchOppProfile } from "../../../actions/index";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

const LineChart = ({ value, reload, playerData }) => {
  const oppProfileDetails = useSelector((state) => state.oppProfile);

  const [oppData,setOppData] = useState({matches:[{matchWon: 2}]});

  const dispatch = useDispatch();
  console.log(value);
    console.log(oppProfileDetails);

  useEffect(() => {
    dispatch(fetchOppProfile(value[0].opponentEmail));
    // setOppData(oppProfileDetails);
    console.log(oppProfileDetails)
    console.log(oppData)
    console.log(playerData);
  }, [dispatch,value[0]]);

  const data = (oppData) => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Stats",
        data: playerData.matches.map((p) => p.matchWon),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Opponent Stats",
        data:
          oppData !== null
            ? oppData.matches.map((op) => op.matchWon)
            : [1, 2, 3],
        fill: false,
        borderColor: "#742774",
      },
    ],
  });
  return (
    <>
      {console.log(reload)}
      <Line data={data(oppData)} />
    </>
  );
};

export default LineChart;
