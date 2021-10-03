import react,{useState,useEffect} from 'react';
import PieChart from '../PieChart/pieChart'; 
import LineChart from '../LineChart/lineChart';
import BarChart from '../BarChart/barChart';
import gbStyles from './globalStats.module.css';
import ToggleProf from '../../Toggle/ToggleProf';
import ReactSelect from '../../ReactSelect/ReactSelect';
import defaultStat from "../../../assets/images/defaultStat.gif";


const GlobalStats = ({playerData,oppData}) => {
  const [graph, setGraph] = useState("left");
  let emailOpp;
    let [reloadLine, setReloadLine] = useState(0);
    const [lineValue,setLineValue] = useState(null);
    const [show, setShow] = useState(false);

console.log(oppData);

useEffect(() => {
  console.log(lineValue)
}, [lineValue])

    return (
      <>
        <div className={gbStyles.toggle}>
          <ToggleProf tog={setGraph} />
        </div>
        {graph === "left" ? (
          <>
            <div className={gbStyles.barChart}>
              <BarChart graph={graph} playerData={playerData} />
            </div>
          </>
        ) : graph === "center" ? (
          <>
            <div className={gbStyles.dropdown}>
              <ReactSelect
                placeholder={"Select Opponent"}
                height={"5vh"}
                width={"15vw"}
                data={playerData.opponents}
                onChange={(e) => {
                  console.log(e);
                  if (e === null) {
                    setShow(false);
                  } else {
                    setShow(true);
                    emailOpp = playerData.opponentsData.filter((opp)=> opp.value===e.value?opp.opponentEmail:null);
                    console.log(emailOpp)
                    setLineValue(oppData.filter((opp,index)=>(opp.oppoEmail === emailOpp[0].opponentEmail)))
                    
                  }

                  setReloadLine(++reloadLine);
                }}
                backgroundColor={"rgb(103, 58, 183)"}
              />
            </div>
            {show && lineValue.length !==0 ? (
              <div className={gbStyles.lineChart}>
                <LineChart
                  value={lineValue}
                  reload={reloadLine}
                  playerData={playerData}
                />
              </div>
            ) : (
              <div className={gbStyles.default}>
                <h3>Select Opponent to see stats</h3>
                <img src={defaultStat} />
              </div>
            )}
          </>
        ) : (
          <div className={gbStyles.pieChart}>
            <PieChart playerData={playerData} />
          </div>
        )}
      </>
    );
}

export default GlobalStats;