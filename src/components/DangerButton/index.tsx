import { Button, Theme, withStyles } from '@material-ui/core';

const RemoveButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.light,
      '&:hover': {
        color: theme.palette.error.contrastText,
        backgroundColor: theme.palette.error.main,
      },
    },
  }))(Button);

  export default RemoveButton