import react,{useState} from 'react';
import ReactSelect from '../../ReactSelect/ReactSelect';
import DonutChart from '../DonutChart/donutChart';
import PlStyles from './playerStats.module.css';
import { opponentData } from '../../../utils/constantData/constantData';

const PlayerStats = () => {
  const [reloadDonut, setReloadDonut] = useState(0);

    return (
      <>
        <div className={PlStyles.dropdown}>
          <ReactSelect
            placeholder={"Select Opponent"}
            height={"5vh"}
            width={"15vw"}
            data={opponentData}
            onChange={(e) => {
              console.log(e);
              setReloadDonut(e.value);
            }}
            backgroundColor={"#03f8fc"}
          />
        </div>
        <div className={PlStyles.donutChart}>
          <DonutChart reload={reloadDonut} />
        </div>
      </>
    );
}

export default PlayerStats;