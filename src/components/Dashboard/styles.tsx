import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
    topBarContainer: {
      paddingTop: '8px',
      paddingBottom: '8px',
      backgroundColor: theme.palette.primary.light
    },
    tobBarCard: {
      width: '241px',
      height: '76px'
    },
    stickerCardsContainer: {
      paddingTop: '40px',
    },
  }))


  export default useStyles;