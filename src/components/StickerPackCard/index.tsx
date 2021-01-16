import { Box, Card, CircularProgress, Typography } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import bannerExample from '../../images/bannerExample.png';
import { ReactComponent as IconEdit } from '../../images/iconEdit.svg';
import statusIcon from '../../images/iconStatusLogo.svg';
import thumbnailExample from '../../images/thumbnailExample.png';
import Image from '../Image';
import { useFetchPaymentData, useFetchStickerPackSummary } from '../Web3/hooks';
import { IMetadata } from '../Web3/stickerMetadata';
import useStyles from './styles';
import theme from '../../theme';

const exampleName = "Tozemoon"
const exampleAuthor = "David Lanham"
const examplePrice = 20

// 'https://source.unsplash.com/random/1280x800'

interface SPCProps extends Partial<IMetadata> {
    packId?: number,
    example?: boolean,
    preview?: any,
    skeleton?: boolean, // render a skeleton card instead
    txPending?: boolean,
    edit?: boolean // show edit button?
}

export default function StickerPackCard(props: SPCProps) {
    const { packId, example, preview, txPending = false, skeleton = false, edit = true} = props;

    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const [showEditIcon, setShowEditIcon] = useState(false);

    const {loading: loadingPS, stickerPackSummary, error: errorPS} =  useFetchStickerPackSummary(packId);
    const {loading: loadingPD, paymentData} =  useFetchPaymentData(packId);

    const loading = !txPending && (loadingPS || loadingPD || skeleton)

    const content = useMemo(() => {

        let banner, thumbnail, name, author, price;

        if(example) {
            banner = {src: bannerExample};
            thumbnail = {src: thumbnailExample};
            name = exampleName;
            author = exampleAuthor;
            price = examplePrice;
        } else if (stickerPackSummary) {
            banner = {ipfs: stickerPackSummary.preview};
            thumbnail = {ipfs: stickerPackSummary.thumbnail};
            name = stickerPackSummary.name;
            author = stickerPackSummary.author;
            price = paymentData;
        } else if(preview) {
            banner = {ipfs: preview.banner};
            thumbnail = {ipfs: preview.thumbnail};
            name = preview.name;
            author = preview.author;
            price = preview.price;
        }
        
        let content;
    
        if (errorPS) content = <Box display="flex" style={{
            width: '241px',
            height: '160px',
            borderRadius: 16,
            color: theme.palette.grey[700],
            backgroundColor: theme.palette.grey[300]
        }}>
            <Box m="auto" marginX={6}>
            <Typography align='center' variant="subtitle2" color="inherit">{t('error-loading-pack')}</Typography>
            </Box>
        </Box>
        else content =
            <div style={{ position: 'relative'}}
            onMouseEnter={() => { setShowEditIcon(!txPending && edit) }} // show edit only if the card is not associated to a pending tx and edit is active
            onMouseLeave={() => { setShowEditIcon(false) }}>
            <Box>
                {loading &&
                    <Skeleton variant="rect" animation="wave" style={{width: '100%', height: '160px', borderRadius: 16, marginBottom: '12px'}}/>
                }
                {!loading &&
                    <Image loadingStyle='skeleton' style={{width: '100%', height: '160px', borderRadius: 16, marginBottom: '12px', opacity: showEditIcon ? '0.5' : undefined, filter: showEditIcon ? 'blur(2px)' : undefined}} {...banner}></Image>
                }
            </Box>
            <Box display="flex">
                <Box>
                    {txPending &&
                        <div className={classes.pendingContainer}>
                            <CircularProgress style={{width: 18, height: 18}} color='inherit'/>
                        </div>
                    }
                    {!txPending &&
                        <Image loadingStyle='skeleton' style={{width: 40, height: 40, borderRadius: 40, marginRight: '14px'}} {...thumbnail}></Image>
                    }
                </Box>
                <Box flexGrow={1}>
                    {loading && <>
                        <Skeleton variant="text" animation="wave" width="100%"><Typography gutterBottom variant="h6">lorem</Typography></Skeleton>
                        <Skeleton variant="text" animation="wave" width="100%"><Typography gutterBottom variant="body2">lorem</Typography></Skeleton>
                        </>
                    }
                    {!loading && <>
                        <Typography gutterBottom variant="h6">{name}</Typography>
                        {txPending && 
                            <Typography variant="body2" color="textSecondary">{t('publising')}</Typography>
                        }
                        {!txPending &&
                            <Typography variant="body2">{author}</Typography>
                        }
                        </>}
                </Box>
                <Box>
                    {!txPending && !loading &&
                        <Box display="flex" justifyContent="center" alignItems="center" className={classes.priceContainer}>
                            <img className={classes.priceIcon} src={statusIcon} alt='price'/>
                            <Typography variant="subtitle1"color="inherit">{price}</Typography>
                        </Box>
                    }
                    {loading &&
                        <Skeleton variant="rect" animation="wave" style={{width: '50px', height: '27px', borderRadius: 14, marginLeft: 8}}/>
                    }
                </Box>
            </Box>
            {showEditIcon &&
                <IconEdit
                onClick={() => {history.push(`/edit/${packId}`)}}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}/>
            }
            </div>

            return content;

    },[packId,example,preview, loading, errorPS, showEditIcon, txPending, paymentData, stickerPackSummary, history, t, classes, edit])

    return (
        <Card className={classes.mainCard} elevation={0}>
            {content}
        </Card>
    )
}