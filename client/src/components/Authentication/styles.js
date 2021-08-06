import { makeStyles } from '@material-ui/core/styles';
import background from "../../../src/images/background_login.gif";

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundImage: `url(${background})`,
        backgroundRepeat:'no-repeat',
        paddingTop:'2.5rem',
        paddingBottom:'1rem'
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: "white",
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
      padding: "22px",
      borderRadius:'6px',
    },
    error:{
      color:'red',
      fontWeight:'700'
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
      borderRadius:'6px',
      backgroundColor:'#673ab7',
      color:'white',
      '&:hover':{
        backgroundColor:'#ec407a'
      }
    },
    link: {
      color:'#f50057',
      marginBottom:'4px',
      '&:hover':{
         color:'#673ab7',
         textDecoration:'none'
      }
    },
    google:{
      backgroundColor:'red',
      color:'white',
      borderRadius:'6px',
      border:'2px solid black',
      '&:hover':{
        backgroundColor:'#d50000'
      }
    }
  }));

  export default useStyles;
  