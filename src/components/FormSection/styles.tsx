import { createStyles, Theme } from '@material-ui/core/styles'

const styles = createStyles((theme: Theme) => ({
  cardStyle: {
    borderRadius: '16px',
    padding: '8px',
    backgroundColor: theme.palette.primary.light
  },
  cardHeadingSticker: {
    width: '32px',
    height: '32px',
    marginRight: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    border: '2px solid ' + theme.palette.common.white,
    color: theme.palette.primary.contrastText,
    borderRadius: '32px',
    boxShadow: '0px 1px 1px rgba(23, 33, 77, 0.15)'
  },
  formSectionContainer: {
    marginTop: '24px',
    padding: '24px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid ' + theme.palette.grey[100],
    borderRadius: '8px'
  }
  }))

  export default styles;