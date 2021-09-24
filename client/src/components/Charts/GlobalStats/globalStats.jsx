import react,{useState} from 'react';
import PieChart from '../PieChart/pieChart'; 
import LineChart from '../LineChart/lineChart';
import BarChart from '../BarChart/barChart';
import gbStyles from './globalStats.module.css';
import ToggleProf from '../../Toggle/ToggleProf';

const GlobalStats = () => {
  const [graph, setGraph] = useState("left");

    return (
      <>
        <div className={gbStyles.toggle}>
          <ToggleProf tog={setGraph} />
        </div>
        {graph === "left" ? (
          <>
            <div className={gbStyles.barChart}>
              <BarChart />
            </div>
          </>
        ) : graph === "center" ? (
          <div className={gbStyles.lineChart}>
            <LineChart />
          </div>
        ) : (
          <div className={gbStyles.pieChart}>
            <PieChart />
          </div>
        )}
      </>
    );
}

export default GlobalStats;