import { Button, Dialog, Theme, Typography, Box, withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useTranslation } from 'react-i18next';
import DangerButton from '../DangerButton';


const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
}))(MuiDialogContent);


interface IConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}


export default function RemoveConfirmationDialog(props: IConfirmDialogProps) {
  const { t } = useTranslation();

  const { onCancel, onConfirm, open } = props;

  return (
    <Dialog onClose={onCancel} aria-labelledby="customized-dialog-title" open={open} maxWidth='sm'>
      <DialogContent dividers>
        <Typography variant="h6" paragraph>{t('remove.title')}</Typography>
        <Typography variant="subtitle2" color="textSecondary" paragraph>{t('remove.subtitle')}</Typography>
        <Box display="flex" flexDirection="column" width='100%' justifyContent='center' alignItems="center">
          <Box m={1}>
            <DangerButton variant="contained" onClick={onConfirm}>{t('remove.confirm')}</DangerButton>
          </Box>
          <Box m={1}>
            <Button variant="outlined" color="primary" onClick={onCancel}>{t('remove.cancel')}</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}