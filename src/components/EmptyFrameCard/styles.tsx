import { createStyles, Theme } from '@material-ui/core/styles'

const styles = createStyles((theme: Theme) => ({
  cardStyle: {
    borderRadius: '16px',
    padding: '8px',
    backgroundColor: theme.palette.primary.light
  },
  innerFrame: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed ' + theme.palette.primary.main,
    borderRadius: '16px'
  }
  }))

  export default styles;