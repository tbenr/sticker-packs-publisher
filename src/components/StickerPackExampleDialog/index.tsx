import { Box, createStyles, Dialog, IconButton, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconClose } from '../../images/iconClose.svg';
import StickerPackCard from '../StickerPackCard';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });


interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
  }
  
  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <IconClose />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  

  const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);


interface IExampleDialogProps {
    open: boolean;
    onClose: () => void;
}


export default function StickerExampleDialog(props: IExampleDialogProps) {
    const { t } = useTranslation();

    const { onClose, open} = props;
  
    return (
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md'>
          <DialogTitle id="customized-dialog-title" onClose={onClose}>
            {t('example.title')}
          </DialogTitle>
          <DialogContent dividers>
          <Box marginX={10} marginY={5} display="flex" flexDirection="column" alignContent="center" alignItems="center" justifyContent="center">
          <StickerPackCard example={true}/>
          </Box>
          </DialogContent>
        </Dialog>
    );
  }