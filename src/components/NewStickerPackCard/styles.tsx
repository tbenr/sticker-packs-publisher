import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  frameSize: {
    height: '160px',
    width: '241px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    backgroundColor: theme.palette.primary.light
  }
  }))

  export default useStyles;