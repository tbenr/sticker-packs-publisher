import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  toolbarLogo: {
    pointerEvents: 'none',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '40px'
  },
  toolbarLogoContainer: {
  },
  toolbarWalletStatusContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  toolbarNavButtonContainer: {
  },
  toolbarGrid: {
    paddingRight: '24px',
    paddingLeft: '24px',
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}))


export default useStyles;