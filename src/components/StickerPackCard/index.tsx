import React from 'react';
import { IconButton, Container, Typography, Box, Card, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IMetadata } from '../Web3/stickerMetadata'
import {useFetchStickerPackSummary, useFetchPaymentData} from '../Web3/hooks'

import { useHistory } from "react-router-dom";

import useStyles from './styles'
import statusIcon from '../../images/iconStatusLogo.svg'

import bannerExample from '../../images/bannerExample.png'
import thumbnailExample from '../../images/thumbnailExample.png'
const exampleName = "Tozemoon"
const exampleAuthor = "David Lanham"
const exampleprice = 20

// 'https://source.unsplash.com/random/1280x800'

interface SPCProps extends Partial<IMetadata> {
    packId?: number,
    example?: boolean
}

export default function (props: SPCProps) {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const {loading: loadingPS, stickerPackSummary, error: errorPS} =  useFetchStickerPackSummary(props.example ? undefined : props.packId);


    const {loading: loadingPD, paymentData} =  useFetchPaymentData(props.example ? undefined : props.packId);
    
    let content;

    if(loadingPS || loadingPD) content = <>..loading..</>
    else if(errorPS) content = <>invalid pack</>
    else content =
        <><Box onClick={() => history.push(`/edit/${props.packId}`)}>
            <img className={classes.banner} src={(props.example ? bannerExample : `https://ipfs.io/ipfs/${stickerPackSummary?.preview}`)} />
        </Box>
        <Box display="flex">
            <Box> 
            <img className={classes.thumbnail} src={(props.example ? thumbnailExample : `https://ipfs.io/ipfs/${stickerPackSummary?.thumbnail}`)} />
            </Box>
            <Box flexGrow={1}>
                <Typography gutterBottom variant="h6">{(props.example ? exampleName : stickerPackSummary?.name) }</Typography>
                <Typography  variant="body2">{(props.example ? exampleAuthor : stickerPackSummary?.author) }</Typography>
            </Box>
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" className={classes.priceContainer}>
                    <img className={classes.priceIcon} src={statusIcon}/>
                    <Typography variant="subtitle1"color="inherit">{(props.example ? exampleprice : paymentData)}</Typography>
                </Box>
            </Box>
        </Box>
        </>

    //console.log(`${props.packId} ${stickerPackSummary?.preview} ${stickerPackSummary?.thumbnail}`)
    
    return (
        <Card className={classes.mainCard} elevation={0}>
            {content}
        </Card>
    )
}