import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        background:'radial-gradient(circle,rgb(33, 7, 176),rgb(4,0,90))', 
        paddingTop:'2.5rem',
        paddingBottom:'1rem',
        height:'120vh'
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
    logo: {
      margin: theme.spacing(1),
      height: '10%',
      width: '20%',
      border: '3px solid yellow',
      borderRadius: '50%'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      color:'rgb(4,0,90)'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      borderRadius:'6px',
      backgroundColor:'rgb(33, 7, 176)',
      color:'white',
      '&:hover':{
        backgroundColor:'rgb(4,0,90)'
      }
    },
    link: {
      color:'#f50057',
      marginBottom:'4px',
      '&:hover':{
         color:'#673ab7',
         textDecoration:'none'
      },
      // fontFamily:'lithospro_black',
      fontSize:'75%'
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
  