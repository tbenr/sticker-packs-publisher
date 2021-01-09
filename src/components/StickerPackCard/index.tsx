import React, { useMemo } from 'react';
import { IconButton, Container, Typography, Box, Card, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IMetadata } from '../Web3/stickerMetadata'
import {useFetchStickerPackSummary, useFetchPaymentData} from '../Web3/hooks'
import Image from '../Image'

import { useHistory } from "react-router-dom";

import useStyles from './styles'
import statusIcon from '../../images/iconStatusLogo.svg'

import bannerExample from '../../images/bannerExample.png'
import thumbnailExample from '../../images/thumbnailExample.png'
const exampleName = "Tozemoon"
const exampleAuthor = "David Lanham"
const examplePrice = 20

// 'https://source.unsplash.com/random/1280x800'

interface SPCProps extends Partial<IMetadata> {
    packId?: number,
    example?: boolean,
    preview?: any
}

export default function (props: SPCProps) {
    const { packId, example, preview } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const {loading: loadingPS, stickerPackSummary, error: errorPS} =  useFetchStickerPackSummary(packId);
    const {loading: loadingPD, paymentData} =  useFetchPaymentData(packId);

    const content = useMemo(() => {

        let banner, thumbnail, name, author, price;

        if(example) {
            banner = bannerExample;
            thumbnail = thumbnailExample;
            name = exampleName;
            author = exampleAuthor;
            price = examplePrice;
        } else if (stickerPackSummary) {
            banner = stickerPackSummary.preview;
            thumbnail = stickerPackSummary.thumbnail;
            name = stickerPackSummary.name;
            author = stickerPackSummary.author;
            price = paymentData;
        } else if(preview) {
            banner = preview.banner  ;
            thumbnail = preview.thumbnail;
            name = preview.name;
            author = preview.author;
            price = preview.price;
        }
    
        let bannerImg, thumbnailImg;
    
        if(example) {
            bannerImg = <Image src={banner} style={{width: '100%', borderRadius: 16, marginBottom: '12px'}}></Image>
            thumbnailImg = <Image src={thumbnail} style={{width: 40, height: 40, borderRadius: 40, marginRight: '14px'}}></Image>
        } else {
            bannerImg = <Image ipfs={banner} style={{width: '100%', borderRadius: 16, marginBottom: '12px'}}></Image>
            thumbnailImg = <Image ipfs={thumbnail} style={{width: 40, height: 40, borderRadius: 40, marginRight: '14px'}}></Image>
        }
        
        let content;
    
        if(loadingPS || loadingPD) content = <>..loading..</>
        else if(errorPS) content = <>invalid pack</>
        else content =
            <><Box onClick={() => history.push(`/edit/${packId}`)}>
                {bannerImg}
            </Box>
            <Box display="flex">
                <Box> 
                    {thumbnailImg}
                </Box>
                <Box flexGrow={1}>
                    <Typography gutterBottom variant="h6">{name}</Typography>
                    <Typography  variant="body2">{author}</Typography>
                </Box>
                <Box>
                    <Box display="flex" justifyContent="center" alignItems="center" className={classes.priceContainer}>
                        <img className={classes.priceIcon} src={statusIcon}/>
                        <Typography variant="subtitle1"color="inherit">{price}</Typography>
                    </Box>
                </Box>
            </Box>
            </>

            return content;

    },[packId,example,preview, loadingPS, loadingPD, errorPS])

    return (
        <Card className={classes.mainCard} elevation={0}>
            {content}
        </Card>
    )
}