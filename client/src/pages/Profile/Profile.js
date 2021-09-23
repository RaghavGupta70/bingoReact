import React, { useState,useEffect } from "react";
import ProfileBox from "../../components/ProfileBox/profileBox";
import DonutChart from "../../components/Charts/DonutChart/donutChart";
import PrStyles from "./Profile.module.css";
import BarChart from "../../components/Charts/BarChart/barChart";
import ToggleProf from "../../components/Toggle/ToggleProf";
import LineChart from "../../components/Charts/LineChart/lineChart";
import PieChart from "../../components/Charts/PieChart/pieChart";
import ReactSelect from "../../components/ReactSelect/ReactSelect";
import { opponentData } from "../../utils/constantData/constantData";

const Profile = () => {
  const [graph, setGraph] = useState("left");

  return (
    <div className={PrStyles.main_container}>
      <div className={PrStyles.section1}>
        <div className={PrStyles.profileBox}>
          <ProfileBox />
        </div>
        <div className={PrStyles.playerStats}>
          <div className={PrStyles.dropdown}>
            <ReactSelect
              placeholder={"Select Opponent"}
              height={"5vh"}
              width={"15vw"}
              data={opponentData}
              onChange={(e) => {console.log(e);}}
              backgroundColor={"#03f8fc"}
            />
          </div>
          <div className={PrStyles.donutChart}>
            <DonutChart />
          </div>
        </div>
      </div>
      <div className={PrStyles.globalStats}>
        <div className={PrStyles.toggle}>
          <ToggleProf tog={setGraph} />
        </div>
        {graph === "left" ? (
          <>
            <div className={PrStyles.barChart}>
              <BarChart />
            </div>
          </>
        ) : graph === "center" ? (
          <div className={PrStyles.lineChart}>
            <LineChart />
          </div>
        ) : (
          <div className={PrStyles.pieChart}>
            <PieChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
