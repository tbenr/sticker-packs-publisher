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

  footerContainer: {
    position: 'fixed',
    left: '1vmin',
    bottom: '1vmin',
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  homeLogo: {
    pointerEvents: 'none',
    marginBottom: '20px'
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
  },
  toolbarLogo: {
      margin: 'auto',
      textAlign: 'center',
      height: '40px',
      pointerEvents: 'none',
      marginBottom: '20px'
  },
  toolbarLogoContainer: {
      position: 'absolute', 
      left: '50%', 
      top: '50%',
      transform: 'translate(-50%, -30%)'
  },
  toolbarWalletStatusContainer: {
    marginLeft: 'auto'
  },
  toolbarNavButtonContainer: {
  }
}))


  export default useStyles;