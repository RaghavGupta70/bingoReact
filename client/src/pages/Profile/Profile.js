import React from "react";
import ProfileBox from "../../components/ProfileBox/profileBox";
import DonutChart from "../../components/DonutChart/donutChart";




const Profile = () => {
  return (
    <div>
      <div>
        <ProfileBox />
      </div>
      <div>
        <DonutChart />
      </div>
    </div>
  );
};

export default Profile;
