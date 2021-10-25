import React, {useState,useEffect } from "react";
import ProfileBox from "../../components/ProfileBox/profileBox";
import { useSelector } from 'react-redux';
import PrStyles from "./Profile.module.css";
import {useDispatch} from 'react-redux';
import {fetchProfile,fetchOppProfile} from '../../actions/index';
import {getUserEmail} from '../../utils/commonData/common';
import GlobalStats from "../../components/Charts/GlobalStats/globalStats";
import PlayerStats from "../../components/Charts/PlayerStats/playerStats";

const Profile = () => {
    const profileDetails = useSelector((state) => state.profile);
    const oppDetails = useSelector((state) => state.oppProfile);
    const [playerD,setPlayerD] = useState(profileDetails);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProfile(getUserEmail()));
      dispatch(fetchOppProfile(getUserEmail()));
    },[dispatch]);

    useEffect(() => {
      setPlayerD(profileDetails)
    }, [profileDetails])

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
     { playerD && <div className={PrStyles.globalStats}>
        <div className={PrStyles.globalSt}>
          <GlobalStats playerData={playerD} oppData={oppDetails} />
        </div>
      </div>}
    </div>
  );
};

export default Profile;
