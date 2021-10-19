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
    const [playerD,setPlayerD] = useState(playerData)
    const [lineValue,setLineValue] = useState(null);
    const [oppLabel,setOppLabel] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
      setPlayerD(playerData);
    }, [playerData])

    console.log(playerD)

    return (
   <> {playerData.matchesPlayed !==0 ? <>
      <div className={gbStyles.toggle}>
        <ToggleProf tog={setGraph} />
      </div>
      {graph === "left" ? (
        <>
          <div className={gbStyles.barChart}>
            <BarChart graph={graph} playerData={playerD} />
          </div>
        </>
      ) : graph === "center" ? (
        <>
          <div className={gbStyles.dropdown}>
            <ReactSelect
              placeholder={"Select Opponent"}
              height={"5vh"}
              width={"15vw"}
              data={playerD.opponents}
              onChange={(e) => {
                if (e === null) {
                  setShow(false);
                } else {
                  setShow(true);
                  setOppLabel(e.label);
                  emailOpp = playerD.opponentsData.filter((opp) => opp.value === e.value ? opp.opponentEmail : null);
                  setLineValue(oppData.filter((opp, index) => (opp.oppoEmail === emailOpp[0].opponentEmail)))

                }

                setReloadLine(++reloadLine);
              }}
              backgroundColor={"rgb(103, 58, 183)"}
            />
          </div>
          {show && lineValue.length !== 0 ? (
            <div className={gbStyles.lineChart}>
              <LineChart
                value={lineValue}
                reload={reloadLine}
                playerData={playerD}
                oppLabel={oppLabel}
              />
            </div>
          ) : (
            <div className={gbStyles.default}>
              <h3>Select Opponent to compare stats</h3>
              <img src={defaultStat} />
            </div>
          )}
        </>
      ) : (<>
        <div className={gbStyles.pieChart}>
          <PieChart playerData={playerD} />
        </div>
        <div className={gbStyles.pieInfo}>
          <h1>All Time Stats</h1>
        </div>
      </>
      )}
    </>: <h3 style={{margin: 'auto'}}>No data available</h3>
}
   </>  
    );
}

export default GlobalStats;