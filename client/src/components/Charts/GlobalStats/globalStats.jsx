import react,{useState,useEffect} from 'react';
import PieChart from '../PieChart/pieChart'; 
import LineChart from '../LineChart/lineChart';
import { useSelector } from "react-redux";
import BarChart from '../BarChart/barChart';
import gbStyles from './globalStats.module.css';
import { useDispatch } from "react-redux";
import { fetchOppProfile } from "../../../actions/index";
import ToggleProf from '../../Toggle/ToggleProf';
import ReactSelect from '../../ReactSelect/ReactSelect';
import defaultStat from "../../../assets/images/defaultStat.gif";


const GlobalStats = ({playerData}) => {
  const [graph, setGraph] = useState("left");
    let [reloadLine, setReloadLine] = useState(0);
    const [lineValue, setLineValue] = useState(null);
    const [show, setShow] = useState(false);
  const oppProfileDetails = useSelector((state) => state.oppProfile);
  const dispatch = useDispatch();
console.log(oppProfileDetails);


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
                    dispatch(
                      fetchOppProfile(
                        playerData.opponentsData.filter(
                          (dt) => dt.value === e.value
                        )[0].opponentEmail
                      )
                    );
                    setLineValue(
                      oppProfileDetails
                    );
                  }

                  setReloadLine(++reloadLine);
                }}
                backgroundColor={"rgb(103, 58, 183)"}
              />
            </div>
            {show ? (
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