import React, {useEffect } from "react";
import ProfileBox from "../../components/ProfileBox/profileBox";
import { useSelector } from 'react-redux';
import PrStyles from "./Profile.module.css";
import {useDispatch} from 'react-redux';
import {fetchProfile} from '../../actions/index';
import {getUserEmail} from '../../utils/commonData/common';
import GlobalStats from "../../components/Charts/GlobalStats/globalStats";
import PlayerStats from "../../components/Charts/PlayerStats/playerStats";

const Profile = () => {
    const profileDetails = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProfile(getUserEmail()));
    },[dispatch]);

  return (
    <div className={PrStyles.main_container}>
      <div className={PrStyles.section1}>
        <div className={PrStyles.profileBox}>
          <ProfileBox data={profileDetails} />
        </div>
        <div className={PrStyles.playerStats}>
          <PlayerStats data={profileDetails} />
        </div>
      </div>
      <div className={PrStyles.globalStats}>
        <div className={PrStyles.globalSt}>
          <GlobalStats playerData={profileDetails} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
