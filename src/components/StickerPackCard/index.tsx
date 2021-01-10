import React, { useMemo, useState } from 'react';
import { IconButton, Container, Typography, Box, Card, Paper, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IMetadata } from '../Web3/stickerMetadata'
import {useFetchStickerPackSummary, useFetchPaymentData} from '../Web3/hooks'
import Image from '../Image'

import { useHistory } from "react-router-dom";

import useStyles from './styles'
import statusIcon from '../../images/iconStatusLogo.svg'
import { ReactComponent as IconEdit } from '../../images/iconEdit.svg'

import bannerExample from '../../images/bannerExample.png'
import thumbnailExample from '../../images/thumbnailExample.png'

const exampleName = "Tozemoon"
const exampleAuthor = "David Lanham"
const examplePrice = 20

// 'https://source.unsplash.com/random/1280x800'

interface SPCProps extends Partial<IMetadata> {
    packId?: number,
    example?: boolean,
    preview?: any,
    pending?: boolean
}

export default function (props: SPCProps) {
    const { packId, example, preview, pending = false} = props;

    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const [showEditIcon, setShowEditIcon] = useState(false);

    const {loading: loadingPS, stickerPackSummary, error: errorPS} =  useFetchStickerPackSummary(packId);
    const {loading: loadingPD, paymentData} =  useFetchPaymentData(packId);

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
    
        if(loadingPS || loadingPD) content = <>..loading..</>
        else if(errorPS) content = <>invalid pack</>
        else content =
            <div style={{ position: 'relative'}}
            onMouseEnter={() => { console.log('asd'); setShowEditIcon(true) }}
            onMouseLeave={() => { setShowEditIcon(false) }}>
            <Box>
                <Image style={{width: '100%', borderRadius: 16, marginBottom: '12px', opacity: showEditIcon ? '0.5' : undefined, filter: showEditIcon ? 'blur(2px)' : undefined}} {...banner}></Image>
            </Box>
            <Box display="flex">
                <Box>
                    {pending &&
                        <div className={classes.pendingContainer}>
                            <CircularProgress style={{width: 18, height: 18}} color='inherit'/>
                        </div>
                    }
                    {!pending &&
                        <Image style={{width: 40, height: 40, borderRadius: 40, marginRight: '14px'}} {...thumbnail}></Image>
                    }
                </Box>
                <Box flexGrow={1}>
                    <Typography gutterBottom variant="h6">{name}</Typography>
                    {pending && 
                        <Typography variant="body2" color="textSecondary">{t('publising')}</Typography>
                    }
                    {!pending &&
                        <Typography variant="body2">{author}</Typography>
                    } 
                </Box>
                <Box>
                    <Box display="flex" justifyContent="center" alignItems="center" className={classes.priceContainer}>
                        <img className={classes.priceIcon} src={statusIcon}/>
                        <Typography variant="subtitle1"color="inherit">{price}</Typography>
                    </Box>
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

    },[packId,example,preview, loadingPS, loadingPD, errorPS, showEditIcon, pending])

    return (
        <Card className={classes.mainCard} elevation={0}>
            {content}
        </Card>
    )
}