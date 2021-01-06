import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  gridDividerHorizontal: {
    position: 'absolute',
    height: 1,
    width: '100%',
    borderTop: '1px dashed ' + theme.palette.primary.main
  },
  gridDividerVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    borderLeft: '1px dashed ' + theme.palette.primary.main
  }
  }))

  export default useStyles;