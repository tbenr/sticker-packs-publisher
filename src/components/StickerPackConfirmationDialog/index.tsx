import { createStyles, Dialog, IconButton, Theme, Typography, withStyles, WithStyles,Button ,Box,Grid,Card, Divider } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import StickerPackCard from '../StickerPackCard'
import Image from '../Image';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconClose } from '../../images/iconClose.svg';
import { AvailableCategories } from '../Web3/stickerMetadata';

import theme from '../../theme';


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
  
  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
      justifyContent: 'center',
    },
  }))(MuiDialogActions);


interface IConfirmDialogProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;

    editMode: boolean;
    name: string;
    stickers: string[];
    address: string;
    author: string;
    categories: string[];
    installations: number;
    contribution: number;
    thumbnail: string;
    banner: string;
    price: number;
}



export default function StickerConfirmationDialog(props: IConfirmDialogProps) {
    const { t } = useTranslation();

    const { onCancel, onConfirm, open, author, name, categories, price, address, contribution,installations,thumbnail,banner, stickers } = props;

    const handleCancel = () => {
      onCancel();
    };
  
    return (
        <Dialog onClose={handleCancel} aria-labelledby="customized-dialog-title" open={open} maxWidth='md'>
          <DialogTitle id="customized-dialog-title" onClose={handleCancel}>
            {t('review.title')}
          </DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                    <Box flexGrow={1} borderRight={1} color={theme.palette.divider} paddingRight={2}>
                        <Grid container direction="row" justify="space-between" alignItems="stretch" spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.artist-name')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{author}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.sticker-pack-name')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.category')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{categories.map(v=>AvailableCategories[v]).join(', ')}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.price')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{price}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.contribution')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{`${contribution/100}%`}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.limited-edition')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{installations === -1 ? t('review.unlimited') : installations}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="textSecondary">{t('review.address-receiving')}</Typography>
                                <Typography variant="subtitle2" color="textPrimary">{address}</Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}}/>
                        <Typography variant='subtitle2' color="textSecondary" paragraph>{t('review.stickers')}</Typography>
                        <Box display="flex" flexWrap="wrap" alignContent="center" alignItems="center" flexDirection="row">
                            {stickers.map(hash => 
                                <Card style={{backgroundColor: theme.palette.primary.light, borderRadius: 8, padding: 4, margin: 4}} elevation={0}><Image ipfs={hash} style={{position: "relative", textAlign: "center", width: 64, height: 64, borderRadius: 6}}/></Card>
                            )}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" alignContent="center" alignItems="center" justifyContent="center" paddingLeft={2}>
                        <Typography variant='subtitle2' color="textSecondary" paragraph>{t('review.text1')}</Typography>
                        <StickerPackCard preview={{price:price,author:author,name:name,thumbnail:thumbnail,banner:banner}} edit={false}/>
                    </Box>
                </Box>
            </Box>
          </DialogContent>
          <DialogActions >
            <Box flexGrow={1} marginX={4}>
            <Typography align="center" variant='subtitle2' color="textSecondary">{t('review.text2')}</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              {(t('review.publish'))}
            </Button>
          </DialogActions>
        </Dialog>
    );
  }