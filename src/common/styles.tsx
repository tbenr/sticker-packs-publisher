import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  frameSize: {
    height: '160px',
    width: '478px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    backgroundColor: theme.palette.primary.light
  },
  dropover: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 10,
    backgroundColor: theme.palette.primary.light,
    opacity : 0.8,
    borderRadius: '16px'
  }
  }))

  export default useStyles;