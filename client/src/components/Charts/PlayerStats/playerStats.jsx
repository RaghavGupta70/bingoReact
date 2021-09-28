import react, { useState } from "react";
import ReactSelect from "../../ReactSelect/ReactSelect";
import DonutChart from "../DonutChart/donutChart";
import PlStyles from "./playerStats.module.css";
import defaultStat from '../../../assets/images/defaultStat.gif';

const PlayerStats = ({ data }) => {
  let [reloadDonut, setReloadDonut] = useState(0);
  const [donutValue, setDonutValue] = useState([]);
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={PlStyles.dropdown}>
        <ReactSelect
          placeholder={"Select Opponent"}
          height={"5vh"}
          width={"15vw"}
          data={data.opponents}
          onChange={(e) => {
            console.log(e);
            if (e === null) {
              setShow(false);
            } else {
              setShow(true);
              setDonutValue(
                data.opponentsData.filter((dt) => dt.value === e.value)
              );
            }

            setReloadDonut(++reloadDonut);
          }}
          backgroundColor={"rgb(103, 58, 183)"}
        />
      </div>
      {show ? (
        <div className={PlStyles.donutChart}>
          <DonutChart
            value={donutValue}
            reload={reloadDonut}
            donutData={data}
          />
        </div>
      ) : (
        <div className={PlStyles.default}>
          <h3>Select Opponent to see stats</h3>
          <img src={defaultStat} />
        </div>
      )}
    </>
  );
};

export default PlayerStats;
