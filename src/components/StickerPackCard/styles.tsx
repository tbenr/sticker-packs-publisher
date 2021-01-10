import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  mainCard: {
    height: '224px',
    width: '241px',
    borderRadius: '16px',
    padding: '0px',
    backgroundColor: theme.palette.background.default
  },
  banner: {
    display: 'block',
    width: '100%',
    objectFit: 'contain',
    borderRadius: '16px',
    marginBottom: '12px'
  },
  thumbnail: {
    height: '40px',
    width: '40px',
    objectFit: 'contain',
    borderRadius: '40px',
    marginRight: '12px'
  },
  priceContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '27px',
    borderRadius: '14px',
    textAlign: "center",
    color: theme.palette.common.white,
    paddingLeft: '8px',
    paddingRight: '8px'
    },
    priceIcon: {
      marginRight: '8px'
    },
  pendingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    marginRight: '14px',
    color: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[200]
  }
  }))

  export default useStyles;