import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
    walletStatusButton: {
      borderRadius: '21px'
    },
    walletDot: {
      margin: '6px',
      width: '6px',
      height: '6px',
      borderRadius: '6px'
    },
    walletDotOK: {
      backgroundColor: '#4EBC60'
    },
    walletDotWarning: {
      backgroundColor: '#FFA218'
    },
    walletDotError: {
      backgroundColor: '#FF2D55'
    },
    walletContainer: {
      marginTop: '16px',
      marginBottom: '16px',
      marginLeft: '24px',
      marginRight: '24px'
    },
    iconlogoutContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '24px',
      height: '24px',
      borderRadius: '24px',
      marginRight: '12px',
      backgroundColor: theme.palette.error.light
    }
  }))


  export default useStyles;