import React, { useState } from "react";
import ProfileBox from "../../components/ProfileBox/profileBox";
import DonutChart from "../../components/DonutChart/donutChart";
import PrStyles from "./Profile.module.css";
import BarChart from "../../components/BarChart/barChart";
import ToggleProf from "../../components/Toggle/ToggleProf";
import LineChart from "../../components/LineChart/lineChart";

const Profile = () => {
  const [graph, setGraph] = useState("left");
  return (
    <div className={PrStyles.main_container}>
      <div className={PrStyles.section1}>
        <div className={PrStyles.profileBox}>
          <ProfileBox />
        </div>
        <div className={PrStyles.playerStats}>
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
          <div className={PrStyles.pieChart}>hello</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
