import { makeStyles } from '@material-ui/core/styles';
import background from "../../../src/background.png";

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundImage: `url(${background})`,
        height: "100vh",
    },
    paper: {
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: "5px solid-black", 
      backgroundColor: "white",
      padding: "10px",
      marginTop: "10px"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      justifyContent: 'center',
      alignItems: "center"
    }
  }));

  export default useStyles;
  