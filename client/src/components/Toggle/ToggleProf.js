import React,{useState} from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { FcBarChart, FcLineChart, FcPieChart } from "react-icons/fc";


const ToggleProf = ({tog}) => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    tog(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      size="large"
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      orientation="vertical"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <FcBarChart />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FcLineChart />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FcPieChart />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleProf;